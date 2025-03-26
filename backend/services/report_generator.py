# Enterprise_Data_Cleaning/backend/services/report_generator.py
import pandas as pd
from openpyxl import load_workbook
from backend.utils.logger import logger

def generate_report(file_path):
    try:
        # Load cleaned data from the "Cleaned Data" sheet
        df = pd.read_excel(file_path, sheet_name='Cleaned Data')
        
        # --- Generate Reports ---
        # Here you can add any advanced analysis or visual generation logic.
        # For demonstration, we generate descriptive statistics.
        report = df.describe()

        # Write the report to a new sheet ("Reports")
        book = load_workbook(file_path)
        with pd.ExcelWriter(file_path, engine='openpyxl') as writer:
            writer.book = book
            report.to_excel(writer, sheet_name='Reports')
            writer.save()

        logger.info("Report generated successfully.")
        return file_path
    except Exception as e:
        logger.exception("Error generating report:")
        raise e
