# Enterprise_Data_Cleaning/backend/services/file_service.py
import os
from werkzeug.utils import secure_filename
from backend.config import Config
from backend.utils.security import validate_file_size, validate_file_type
from backend.utils.logger import logger

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in Config.ALLOWED_EXTENSIONS

def save_file(file):
    # Validate file type and size
    validate_file_type(file.filename)
    validate_file_size(file)
    
    filename = secure_filename(file.filename)
    save_path = os.path.join(Config.UPLOAD_FOLDER, filename)
    
    # Ensure the upload folder exists
    os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)
    
    try:
        file.save(save_path)
        logger.info(f"File saved: {save_path}")
        return save_path
    except Exception as e:
        logger.exception("Failed to save file.")
        raise Exception("Failed to save file. Please try again.")
