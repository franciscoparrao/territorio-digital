use serde::Serialize;
use crate::config::Config;
use crate::models::ContactRequest;

#[derive(Clone)]
pub struct EmailService {
    api_key: String,
    from: String,
    client: reqwest::Client,
}

#[derive(Serialize)]
struct BrevoSender {
    email: String,
    name: String,
}

#[derive(Serialize)]
struct BrevoRecipient {
    email: String,
}

#[derive(Serialize)]
struct BrevoEmailRequest {
    sender: BrevoSender,
    to: Vec<BrevoRecipient>,
    subject: String,
    #[serde(rename = "htmlContent")]
    html_content: String,
}

impl EmailService {
    pub fn new(config: &Config) -> Result<Self, Box<dyn std::error::Error>> {
        Ok(EmailService {
            api_key: config.smtp_password.clone(), // Using SMTP_PASSWORD for Brevo API key
            from: config.email_from.clone(),
            client: reqwest::Client::new(),
        })
    }

    async fn send_email(
        &self,
        to: &str,
        subject: &str,
        body: &str,
    ) -> Result<(), Box<dyn std::error::Error>> {
        tracing::info!("Attempting to send email to: {}, subject: {}", to, subject);

        let request = BrevoEmailRequest {
            sender: BrevoSender {
                email: self.from.clone(),
                name: "Territorio Digital".to_string(),
            },
            to: vec![BrevoRecipient {
                email: to.to_string(),
            }],
            subject: subject.to_string(),
            html_content: body.to_string(),
        };

        tracing::debug!("Sending request to Brevo API...");
        let response = self
            .client
            .post("https://api.brevo.com/v3/smtp/email")
            .header("api-key", &self.api_key)
            .header("Content-Type", "application/json")
            .json(&request)
            .send()
            .await?;

        let status = response.status();
        tracing::info!("Brevo API response status: {}", status);

        if !status.is_success() {
            let error_text = response.text().await.unwrap_or_else(|_| "Unknown error".to_string());
            tracing::error!("Brevo API error response: {}", error_text);
            return Err(format!("Brevo API error ({}): {}", status, error_text).into());
        }

        tracing::info!("Email sent successfully to {}", to);
        Ok(())
    }

    pub async fn send_contact_notification(
        &self,
        contact: &ContactRequest,
        recipient: &str,
    ) -> Result<(), Box<dyn std::error::Error>> {
        let subject = format!(
            "[Territorio Digital] Nuevo mensaje de contacto de {}",
            contact.name
        );

        let body = format!(
            r#"<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo Mensaje de Contacto</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <tr>
                        <td style="background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%); padding: 40px 30px; text-align: center; border-radius: 10px 10px 0 0;">
                            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">📧 Nuevo Mensaje de Contacto</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                                Has recibido un nuevo mensaje desde el formulario de contacto de <strong>territorio-digital.cl</strong>
                            </p>
                            <div style="background-color: #f0f7ff; border-left: 4px solid #0066cc; padding: 25px; margin: 30px 0; border-radius: 5px;">
                                <h3 style="color: #0052a3; margin: 0 0 20px 0; font-size: 20px;">👤 Información del Cliente</h3>
                                <table width="100%" cellpadding="8" cellspacing="0">
                                    <tr>
                                        <td style="color: #555; font-size: 14px; font-weight: bold; width: 40%;">Nombre:</td>
                                        <td style="color: #333; font-size: 14px;">{}</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #555; font-size: 14px; font-weight: bold;">Email:</td>
                                        <td style="color: #0066cc; font-size: 14px;"><a href="mailto:{}" style="color: #0066cc; text-decoration: none;">{}</a></td>
                                    </tr>
                                    <tr>
                                        <td style="color: #555; font-size: 14px; font-weight: bold;">Empresa:</td>
                                        <td style="color: #333; font-size: 14px;">{}</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #555; font-size: 14px; font-weight: bold;">Servicio de Interés:</td>
                                        <td style="color: #333; font-size: 14px;">{}</td>
                                    </tr>
                                </table>
                            </div>
                            <div style="background-color: #fff9e6; border-left: 4px solid #ffc107; padding: 25px; margin: 30px 0; border-radius: 5px;">
                                <h3 style="color: #856404; margin: 0 0 15px 0; font-size: 18px;">💬 Mensaje:</h3>
                                <p style="color: #333; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">{}</p>
                            </div>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="mailto:{}" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%); color: white; text-decoration: none; border-radius: 5px; font-weight: bold; box-shadow: 0 4px 12px rgba(0,102,204,0.3); font-size: 16px;">✉️ Responder al Cliente</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-radius: 0 0 10px 10px; border-top: 1px solid #e9ecef;">
                            <p style="color: #666; font-size: 14px; margin: 0 0 10px 0;"><strong>Territorio Digital</strong></p>
                            <p style="color: #999; font-size: 12px; margin: 0;">Este mensaje fue enviado automáticamente desde el formulario de contacto<br>📧 contacto@territorio-digital.cl | 🌐 <a href="https://territorio-digital.cl" style="color: #0066cc; text-decoration: none;">territorio-digital.cl</a></p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>"#,
            contact.name,
            contact.email,
            contact.email,
            if contact.company.is_empty() { "No especificada" } else { &contact.company },
            if contact.service.is_empty() { "No especificado" } else { &contact.service },
            contact.message,
            contact.email
        );

        self.send_email(recipient, &subject, &body).await
    }

    pub async fn send_confirmation_email(
        &self,
        contact: &ContactRequest,
    ) -> Result<(), Box<dyn std::error::Error>> {
        let subject = "Gracias por contactarnos - Territorio Digital";

        let body = format!(
            r#"<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gracias por contactarnos</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <tr>
                        <td style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 40px 30px; text-align: center; border-radius: 10px 10px 0 0;">
                            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">✅ ¡Mensaje Recibido!</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="color: #333; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                                Hola <strong>{}</strong>,
                            </p>
                            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                                Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos pronto. 📧
                            </p>
                            <div style="background-color: #e8f5e9; border-left: 4px solid #28a745; padding: 25px; margin: 30px 0; border-radius: 5px;">
                                <h3 style="color: #1b5e20; margin: 0 0 20px 0; font-size: 20px;">📋 Resumen de tu Consulta</h3>
                                <table width="100%" cellpadding="8" cellspacing="0">
                                    <tr>
                                        <td style="color: #555; font-size: 14px; font-weight: bold; width: 40%;">Empresa:</td>
                                        <td style="color: #333; font-size: 14px;">{}</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #555; font-size: 14px; font-weight: bold;">Servicio de Interés:</td>
                                        <td style="color: #333; font-size: 14px;">{}</td>
                                    </tr>
                                </table>
                            </div>
                            <div style="background-color: #f0f7ff; border-left: 4px solid #0066cc; padding: 25px; margin: 30px 0; border-radius: 5px;">
                                <h3 style="color: #0052a3; margin: 0 0 15px 0; font-size: 18px;">💬 Tu Mensaje:</h3>
                                <p style="color: #333; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">{}</p>
                            </div>
                            <div style="background-color: #fff9e6; padding: 20px; border-radius: 8px; margin: 30px 0;">
                                <p style="color: #856404; font-size: 15px; margin: 0; line-height: 1.6;">
                                    <strong>⏱️ Tiempo de Respuesta:</strong><br>
                                    Normalmente respondemos dentro de 24-48 horas hábiles.
                                </p>
                            </div>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="https://territorio-digital.cl" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%); color: white; text-decoration: none; border-radius: 5px; font-weight: bold; box-shadow: 0 4px 12px rgba(0,102,204,0.3); font-size: 16px;">🌐 Visitar Nuestro Sitio</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-radius: 0 0 10px 10px; border-top: 1px solid #e9ecef;">
                            <p style="color: #666; font-size: 14px; margin: 0 0 15px 0;">
                                <strong>Territorio Digital</strong><br>
                                Soluciones digitales para tu negocio
                            </p>
                            <p style="color: #999; font-size: 12px; margin: 0;">
                                📧 <a href="mailto:contacto@territorio-digital.cl" style="color: #0066cc; text-decoration: none;">contacto@territorio-digital.cl</a><br>
                                🌐 <a href="https://territorio-digital.cl" style="color: #0066cc; text-decoration: none;">territorio-digital.cl</a>
                            </p>
                            <p style="color: #aaa; font-size: 11px; margin: 15px 0 0 0;">
                                Este es un email automático de confirmación. Por favor no respondas a este mensaje.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>"#,
            contact.name,
            if contact.company.is_empty() { "No especificada" } else { &contact.company },
            if contact.service.is_empty() { "No especificado" } else { &contact.service },
            contact.message
        );

        self.send_email(&contact.email, subject, &body).await
    }
}
