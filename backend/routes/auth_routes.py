# Enterprise_Data_Cleaning/backend/routes/auth_routes.py
from flask import Blueprint, request, jsonify
from backend.utils.logger import logger

auth_bp = Blueprint('auth_bp', __name__, url_prefix='/auth')

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    
    # Dummy authentication check – replace with real validation!
    if username == "admin" and password == "admin":
        logger.info("User authenticated successfully.")
        return jsonify({"message": "Login successful", "token": "dummy_token"}), 200
    else:
        logger.error("Authentication failed for user: %s", username)
        return jsonify({"error": "Invalid credentials"}), 401
