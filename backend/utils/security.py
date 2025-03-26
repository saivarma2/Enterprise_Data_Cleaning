# Enterprise_Data_Cleaning/backend/utils/security.py
from flask import abort
from backend.config import Config

def validate_file_size(file):
    # Move pointer to end to calculate size
    file.seek(0, 2)
    file_length = file.tell()
    file.seek(0)  # Reset pointer to beginning
    max_size = 5 * 1024 * 1024  # 5 MB limit
    if file_length > max_size:
        abort(400, description="File size exceeds the 5MB limit.")

def validate_file_type(filename):
    if not ('.' in filename and filename.rsplit('.', 1)[1].lower() in Config.ALLOWED_EXTENSIONS):
        abort(400, description="Invalid file type. Please upload a .xlsx file.")
