# Enterprise_Data_Cleaning/backend/app.py
from flask import Flask
from flask_cors import CORS
from .routes import file_routes, report_routes, auth_routes

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

app.config.from_object('backend.config.Config')  # Load configuration

# Register blueprints
app.register_blueprint(file_routes.file_bp)
app.register_blueprint(report_routes.report_bp)
app.register_blueprint(auth_routes.auth_bp)

if __name__ == "__main__":
    app.run(debug=True)  # Use debug=False in production
