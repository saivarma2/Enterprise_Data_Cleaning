# Enterprise_Data_Cleaning/backend/services/data_cleaning.py
import os
import pandas as pd
from openpyxl import load_workbook
from backend.utils.logger import logger

def clean_data(file_path):
    # Read original data from the first sheet
    df = pd.read_excel(file_path, sheet_name=0)
    
    # If duplicate columns exist, simulate an error per boss's requirement
    if df.columns.duplicated().any():
        duplicate_cols = df.columns[df.columns.duplicated()].tolist()
        logger.error("Duplicate columns found: %s", duplicate_cols)
        raise Exception("Atleast one sheet must be visible")
    
    # Example cleaning: drop rows with any missing values.
    df_cleaned = df.dropna()

    # Save the cleaned data to a new sheet ("Cleaned Data")
    book = load_workbook(file_path)
    with pd.ExcelWriter(file_path, engine='openpyxl') as writer:
        writer.book = book
        df.to_excel(writer, sheet_name='Actual Data', index=False)
        df_cleaned.to_excel(writer, sheet_name='Cleaned Data', index=False)
        writer.save()
    
    return file_path
