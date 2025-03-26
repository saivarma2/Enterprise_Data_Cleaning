# Enterprise_Data_Cleaning/backend/services/analysis_service.py
import pandas as pd
from backend.utils.logger import logger

def analyze_file(file_path):
    try:
        # Attempt to read the 'Actual Data' sheet; if not available, load the first sheet.
        try:
            df = pd.read_excel(file_path, sheet_name='Actual Data')
        except Exception:
            df = pd.read_excel(file_path, sheet_name=0)
        duplicate_columns = df.columns[df.columns.duplicated()].tolist()
        duplicate_rows = int(df.duplicated().sum())
        null_values = df.isnull().sum().to_dict()

        analysis = {
            "duplicate_columns": duplicate_columns,
            "duplicate_rows": duplicate_rows,
            "null_values": null_values
        }
        logger.info("File analysis complete.")
        return analysis
    except Exception as e:
        logger.exception("Error during file analysis:")
        raise e
