use lettre::message::header::ContentType;
use lettre::transport::smtp::authentication::Credentials;
use lettre::{Message, SmtpTransport, Transport};

use crate::config::Config;
use crate::models::ContactRequest;

#[derive(Clone)]
pub struct EmailService {
    mailer: SmtpTransport,
    from: String,
}

impl EmailService {
    pub fn new(config: &Config) -> Result<Self, lettre::transport::smtp::Error> {
        let creds = Credentials::new(config.smtp_username.clone(), config.smtp_password.clone());

        let mailer = SmtpTransport::relay(&config.smtp_host)?
            .port(config.smtp_port)
            .credentials(creds)
            .build();

        Ok(EmailService {
            mailer,
            from: config.email_from.clone(),
        })
    }

    pub fn send_contact_notification(
        &self,
        contact: &ContactRequest,
        recipient: &str,
    ) -> Result<(), Box<dyn std::error::Error>> {
        let subject = format!(
            "[Territorio Digital] Nuevo mensaje de contacto de {}",
            contact.name
        );

        let body = format!(
            r#"
Has recibido un nuevo mensaje de contacto desde territoriodigital.cl

---
Nombre: {}
Email: {}
Empresa: {}
Servicio de interés: {}

Mensaje:
{}
---

Este mensaje fue enviado desde el formulario de contacto del sitio web.
            "#,
            contact.name,
            contact.email,
            if contact.company.is_empty() {
                "No especificada"
            } else {
                &contact.company
            },
            if contact.service.is_empty() {
                "No especificado"
            } else {
                &contact.service
            },
            contact.message
        );

        let email = Message::builder()
            .from(self.from.parse()?)
            .to(recipient.parse()?)
            .subject(subject)
            .header(ContentType::TEXT_PLAIN)
            .body(body)?;

        self.mailer.send(&email)?;

        Ok(())
    }

    pub fn send_confirmation_email(
        &self,
        contact: &ContactRequest,
    ) -> Result<(), Box<dyn std::error::Error>> {
        let subject = "Gracias por contactarnos - Territorio Digital";

        let body = format!(
            r#"
Hola {},

Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos pronto.

Este es un resumen de tu consulta:
---
Empresa: {}
Servicio de interés: {}

Mensaje:
{}
---

Normalmente respondemos dentro de 24-48 horas hábiles.

Saludos,
Equipo Territorio Digital
francisco.parra.o@usach.cl
            "#,
            contact.name,
            if contact.company.is_empty() {
                "No especificada"
            } else {
                &contact.company
            },
            if contact.service.is_empty() {
                "No especificado"
            } else {
                &contact.service
            },
            contact.message
        );

        let email = Message::builder()
            .from(self.from.parse()?)
            .to(contact.email.parse()?)
            .subject(subject)
            .header(ContentType::TEXT_PLAIN)
            .body(body)?;

        self.mailer.send(&email)?;

        Ok(())
    }
}
