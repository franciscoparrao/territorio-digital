mod config;
mod db;
mod handlers;
mod models;
mod routes;
mod services;

use std::net::SocketAddr;
use tower_http::cors::{Any, CorsLayer};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

use config::Config;
use db::MongoDb;
use services::EmailService;

#[derive(Clone)]
pub struct AppState {
    pub db: MongoDb,
    pub email_service: EmailService,
    pub config: Config,
}

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "territorio_digital_api=debug,tower_http=debug".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    // Load configuration
    let config = Config::from_env().expect("Failed to load configuration");
    tracing::info!("✅ Configuration loaded");

    // Connect to MongoDB
    let db = MongoDb::connect(&config)
        .await
        .expect("Failed to connect to MongoDB");

    // Initialize email service
    let email_service = EmailService::new(&config).expect("Failed to initialize email service");
    tracing::info!("✅ Email service initialized");

    // Create application state
    let state = AppState {
        db,
        email_service,
        config: config.clone(),
    };

    // Configure CORS
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    // Build routes
    let app = routes::create_routes(state).layer(cors);

    // Run the server
    let addr = SocketAddr::from(([0, 0, 0, 0], config.port));
    tracing::info!("🚀 Territorio Digital API listening on {}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
