# Enterprise_Data_Cleaning/backend/routes/report_routes.py
from flask import Blueprint, request, jsonify
from backend.services import report_generator
from backend.utils.logger import logger

report_bp = Blueprint('report_bp', __name__, url_prefix='/report')

@report_bp.route('/generate', methods=['POST'])
def generate_report():
    data = request.get_json()
    file_path = data.get('file_path')
    
    if not file_path:
        logger.error("Report generation attempted without file path.")
        return jsonify({'error': 'Please upload and clean a file first.'}), 400

    try:
        result_path = report_generator.generate_report(file_path)
        return jsonify({'message': 'Report generated successfully!', 'result_path': result_path}), 200
    except Exception as e:
        logger.exception("Error during report generation:")
        return jsonify({'error': str(e)}), 500
