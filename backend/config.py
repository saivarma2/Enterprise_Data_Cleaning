# Enterprise_Data_Cleaning/backend/config.py
import os

class Config:
    DEBUG = os.getenv('DEBUG', 'True') == 'True'
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-default-secret-key')
    UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'data/uploads')
    ALLOWED_EXTENSIONS = {"xlsx"}
