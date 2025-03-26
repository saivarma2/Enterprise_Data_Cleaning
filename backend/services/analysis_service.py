# Enterprise_Data_Cleaning/backend/services/analysis_service.py
import pandas as pd
import openpyxl
from collections import Counter
from backend.utils.logger import logger

def analyze_file(file_path):
    try:
        # 1) Read the original column names using openpyxl, converting None to "Unnamed".
        wb = openpyxl.load_workbook(file_path, read_only=True)
        ws = wb.active
        original_columns = [
            cell.value if cell.value is not None else "Unnamed"
            for cell in next(ws.iter_rows(max_row=1))
        ]
        
        # 2) Determine which columns are duplicated from the original column names
        col_counts = Counter(original_columns)
        duplicate_columns = [col for col, count in col_counts.items() if count > 1]
        
        # 3) Read the data using pandas (Actual Data sheet if available, otherwise first sheet)
        sheet_names = pd.ExcelFile(file_path).sheet_names
        if 'Actual Data' in sheet_names:
            df = pd.read_excel(file_path, sheet_name='Actual Data')
        else:
            df = pd.read_excel(file_path, sheet_name=0)
        
        # 4) Reassign the original columns to the DataFrame so we have exact duplicates
        #    (e.g., "Age" and "Age" instead of "Age" and "Age.1").
        #    This ensures our cleaned preview truly removes duplicate columns.
        if len(df.columns) == len(original_columns):
            df.columns = original_columns
        
        # 5) Create an HTML preview of the original data (with duplicates)
        original_preview = df.head().to_html()
        
        # 6) Create a cleaned preview by dropping duplicate columns (keep the first occurrence)
        cleaned_df = df.loc[:, ~df.columns.duplicated(keep='first')]
        cleaned_preview = cleaned_df.head().to_html()
        
        if duplicate_columns:
            removed_message = (
                f"Duplicate columns removed (kept first instance): {', '.join(duplicate_columns)}"
            )
        else:
            removed_message = "No duplicate columns found."
        
        duplicate_rows = int(df.duplicated().sum())
        null_values = df.isnull().sum().to_dict()
        
        analysis = {
            "duplicate_columns": duplicate_columns,
            "duplicate_rows": duplicate_rows,
            "null_values": null_values,
            "original_data_preview": original_preview,
            "cleaned_data_preview": cleaned_preview,
            "removed_message": removed_message
        }
        logger.info("File analysis complete.")
        return analysis
    except Exception as e:
        logger.exception("Error during file analysis:")
        raise e
