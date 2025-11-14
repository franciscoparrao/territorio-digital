use mongodb::{Client, Collection, Database};

use crate::config::Config;
use crate::models::ContactMessage;

#[derive(Clone)]
pub struct MongoDb {
    pub client: Client,
    pub database: Database,
}

impl MongoDb {
    pub async fn connect(config: &Config) -> Result<Self, mongodb::error::Error> {
        tracing::info!("Connecting to MongoDB at {}...", config.mongodb_uri);

        let client = Client::with_uri_str(&config.mongodb_uri).await?;

        // Ping the server to verify connection
        client
            .database("admin")
            .run_command(mongodb::bson::doc! { "ping": 1 })
            .await?;

        tracing::info!("✅ MongoDB connected successfully");

        let database = client.database(&config.mongodb_database);

        Ok(MongoDb { client, database })
    }

    pub fn get_contact_collection(&self) -> Collection<ContactMessage> {
        self.database.collection("contact_messages")
    }
}
