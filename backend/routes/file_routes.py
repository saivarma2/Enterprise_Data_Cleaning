# Enterprise_Data_Cleaning/backend/routes/file_routes.py
from flask import Blueprint, request, jsonify
from backend.services import file_service, data_cleaning, analysis_service  # Moved analysis_service import here
from backend.utils.logger import logger

file_bp = Blueprint('file_bp', __name__, url_prefix='/file')

@file_bp.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        logger.error("Upload attempted without file in the request.")
        return jsonify({'error': 'No file part in the request.'}), 400
    
    file = request.files['file']
    if file.filename == '':
        logger.error("Empty filename provided.")
        return jsonify({'error': 'No file selected for uploading.'}), 400

    try:
        saved_path = file_service.save_file(file)
        return jsonify({'message': 'File uploaded successfully!', 'file_path': saved_path}), 200
    except Exception as e:
        logger.exception("Error during file upload:")
        return jsonify({'error': str(e)}), 500

@file_bp.route('/clean', methods=['POST'])
def clean_file():
    data = request.get_json()
    file_path = data.get('file_path')
    confirm = data.get('confirm')
    
    if not file_path:
        logger.error("Clean operation attempted without file path.")
        return jsonify({'error': 'Please upload a file first.'}), 400

    if confirm:
        try:
            result_path = data_cleaning.clean_data(file_path)
            logger.info("Data cleaning successful.")
            return jsonify({'message': 'Data cleaned successfully!', 'result_path': result_path}), 200
        except Exception as e:
            logger.exception("Error during data cleaning:")
            return jsonify({'error': str(e)}), 500
    else:
        logger.info("Data cleaning cancelled by user.")
        return jsonify({'message': 'Cleaning cancelled. Redirecting to home.'}), 200

# Updated Analysis Endpoint with top-level import
@file_bp.route('/analyze', methods=['POST'])
def analyze_file():
    data = request.get_json()
    file_path = data.get('file_path')
    if not file_path:
        logger.error("Analysis attempted without file path.")
        return jsonify({'error': 'Please upload a file first.'}), 400
    try:
        analysis = analysis_service.analyze_file(file_path)
        return jsonify({'message': 'Analysis successful', 'analysis': analysis}), 200
    except Exception as e:
        logger.exception("Error during file analysis:")
        return jsonify({'error': str(e)}), 500
