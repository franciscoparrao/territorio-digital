use serde::{Deserialize, Serialize};
use validator::Validate;

#[derive(Debug, Clone, Serialize, Deserialize, Validate)]
pub struct ContactRequest {
    #[validate(length(
        min = 2,
        max = 100,
        message = "El nombre debe tener entre 2 y 100 caracteres"
    ))]
    pub name: String,

    #[validate(email(message = "Debe proporcionar un email válido"))]
    pub email: String,

    #[validate(length(max = 100, message = "La empresa no puede exceder 100 caracteres"))]
    #[serde(default)]
    pub company: String,

    #[validate(length(max = 50, message = "El servicio no puede exceder 50 caracteres"))]
    #[serde(default)]
    pub service: String,

    #[validate(length(
        min = 10,
        max = 2000,
        message = "El mensaje debe tener entre 10 y 2000 caracteres"
    ))]
    pub message: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ContactMessage {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<bson::oid::ObjectId>,
    pub name: String,
    pub email: String,
    pub company: String,
    pub service: String,
    pub message: String,
    pub created_at: bson::DateTime,
    pub status: MessageStatus,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "lowercase")]
pub enum MessageStatus {
    New,
    Read,
    Replied,
    Archived,
}

impl From<ContactRequest> for ContactMessage {
    fn from(req: ContactRequest) -> Self {
        ContactMessage {
            id: None,
            name: req.name,
            email: req.email,
            company: req.company,
            service: req.service,
            message: req.message,
            created_at: bson::DateTime::now(),
            status: MessageStatus::New,
        }
    }
}

#[derive(Debug, Serialize)]
pub struct ContactResponse {
    pub success: bool,
    pub message: String,
}
