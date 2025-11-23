use axum::{extract::State, http::StatusCode, Json};
use validator::Validate;
use std::time::{SystemTime, UNIX_EPOCH};

use crate::models::{ContactMessage, ContactRequest, ContactResponse};
use crate::AppState;

pub async fn handle_contact(
    State(state): State<AppState>,
    Json(payload): Json<ContactRequest>,
) -> Result<Json<ContactResponse>, (StatusCode, Json<ContactResponse>)> {
    // Anti-spam: Validate timestamp
    if let Some(frontend_timestamp) = payload.timestamp {
        let current_time = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_millis() as i64;

        let time_diff = current_time - frontend_timestamp;

        // Check if form was filled too quickly (less than 3 seconds)
        if time_diff < 3000 {
            tracing::warn!("Spam detected: form filled too quickly ({} ms)", time_diff);
            return Err((
                StatusCode::BAD_REQUEST,
                Json(ContactResponse {
                    success: false,
                    message: "Por favor, tómate un momento para completar el formulario correctamente.".to_string(),
                }),
            ));
        }

        // Check if timestamp is too old (more than 1 hour)
        if time_diff > 3600000 {
            tracing::warn!("Form submission with stale timestamp: {} ms old", time_diff);
            return Err((
                StatusCode::BAD_REQUEST,
                Json(ContactResponse {
                    success: false,
                    message: "El formulario ha expirado. Por favor, recarga la página e inténtalo nuevamente.".to_string(),
                }),
            ));
        }
    }

    // Validate input
    if let Err(errors) = payload.validate() {
        tracing::warn!("Validation failed: {:?}", errors);
        return Err((
            StatusCode::BAD_REQUEST,
            Json(ContactResponse {
                success: false,
                message: format!("Error de validación: {}", errors),
            }),
        ));
    }

    // Convert to ContactMessage
    let message: ContactMessage = payload.clone().into();

    // Save to MongoDB
    let collection = state.db.get_contact_collection();
    match collection.insert_one(&message).await {
        Ok(result) => {
            tracing::info!("Contact message saved with ID: {:?}", result.inserted_id);
        }
        Err(e) => {
            tracing::error!("Failed to save contact message to database: {}", e);
            // Continue anyway - we'll still try to send the email
        }
    }

    // Send email notification to admin
    let admin_email = "contacto@territorio-digital.cl";
    if let Err(e) = state
        .email_service
        .send_contact_notification(&payload, admin_email)
        .await
    {
        tracing::warn!(
            "Failed to send notification email (will continue anyway): {}",
            e
        );
        // In development, we can continue without email
        // In production, you might want to return an error here
    }

    // Send confirmation email to user
    if let Err(e) = state.email_service.send_confirmation_email(&payload).await {
        tracing::warn!("Failed to send confirmation email to user: {}", e);
        // Don't fail the request if confirmation email fails
    }

    Ok(Json(ContactResponse {
        success: true,
        message: "Mensaje enviado exitosamente. Te responderemos pronto.".to_string(),
    }))
}
