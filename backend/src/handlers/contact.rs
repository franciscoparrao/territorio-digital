use axum::{extract::State, http::StatusCode, Json};
use validator::Validate;

use crate::models::{ContactMessage, ContactRequest, ContactResponse};
use crate::AppState;

pub async fn handle_contact(
    State(state): State<AppState>,
    Json(payload): Json<ContactRequest>,
) -> Result<Json<ContactResponse>, (StatusCode, Json<ContactResponse>)> {
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
    let admin_email = "francisco.parra.o@usach.cl";
    if let Err(e) = state
        .email_service
        .send_contact_notification(&payload, admin_email)
    {
        tracing::warn!(
            "Failed to send notification email (will continue anyway): {}",
            e
        );
        // In development, we can continue without email
        // In production, you might want to return an error here
    }

    // Send confirmation email to user
    if let Err(e) = state.email_service.send_confirmation_email(&payload) {
        tracing::warn!("Failed to send confirmation email to user: {}", e);
        // Don't fail the request if confirmation email fails
    }

    Ok(Json(ContactResponse {
        success: true,
        message: "Mensaje enviado exitosamente. Te responderemos pronto.".to_string(),
    }))
}
