# Enterprise_Data_Cleaning/backend/services/data_cleaner_class.py
import pandas as pd
from openpyxl import load_workbook
from backend.utils.logger import logger

class DataCleaner:
    def __init__(self, file_path):
        self.file_path = file_path
        self.original_data = None
        self.cleaned_data = None

    def load_data(self):
        self.original_data = pd.read_excel(self.file_path, sheet_name=0)
        logger.info("Data loaded from file: %s", self.file_path)

    def clean(self):
        if self.original_data is None:
            self.load_data()
        # Example cleaning: drop rows with missing values
        self.cleaned_data = self.original_data.dropna()
        logger.info("Data cleaning process completed.")

    def save_cleaned_data(self):
        try:
            book = load_workbook(self.file_path)
            with pd.ExcelWriter(self.file_path, engine='openpyxl') as writer:
                writer.book = book
                # Overwrite or create sheets as needed
                self.original_data.to_excel(writer, sheet_name='Actual Data', index=False)
                self.cleaned_data.to_excel(writer, sheet_name='Cleaned Data', index=False)
                writer.save()
            logger.info("Cleaned data saved in file: %s", self.file_path)
            return self.file_path
        except Exception as e:
            logger.exception("Error saving cleaned data:")
            raise e
