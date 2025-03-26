# Enterprise_Data_Cleaning/backend/services/data_cleaning.py
from backend.services.data_cleaner_class import DataCleaner

def clean_data(file_path):
    cleaner = DataCleaner(file_path)
    cleaner.clean()
    return cleaner.save_cleaned_data()
