import os

folders = [
    "Enterprise_Data_Cleaning/backend/routes",
    "Enterprise_Data_Cleaning/backend/services",
    "Enterprise_Data_Cleaning/backend/models",
    "Enterprise_Data_Cleaning/backend/utils",
    "Enterprise_Data_Cleaning/backend/tests",
    "Enterprise_Data_Cleaning/frontend/src/components",
    "Enterprise_Data_Cleaning/frontend/src/pages",
    "Enterprise_Data_Cleaning/frontend/src/services",
    "Enterprise_Data_Cleaning/data/uploads",
    "Enterprise_Data_Cleaning/data/processed",
    "Enterprise_Data_Cleaning/logs",
]

files = {
    "Enterprise_Data_Cleaning/backend/__init__.py": "",
    "Enterprise_Data_Cleaning/backend/app.py": "# Main entry point",
    "Enterprise_Data_Cleaning/backend/config.py": "# Configuration settings",
    "Enterprise_Data_Cleaning/backend/routes/__init__.py": "",
    "Enterprise_Data_Cleaning/backend/routes/file_routes.py": "# File upload & processing routes",
    "Enterprise_Data_Cleaning/backend/routes/report_routes.py": "# Report generation routes",
    "Enterprise_Data_Cleaning/backend/services/__init__.py": "",
    "Enterprise_Data_Cleaning/backend/services/file_service.py": "# File handling logic",
    "Enterprise_Data_Cleaning/backend/services/data_cleaning.py": "# Data cleaning functions",
    "Enterprise_Data_Cleaning/backend/services/report_generator.py": "# Report generation logic",
    "Enterprise_Data_Cleaning/backend/models/__init__.py": "",
    "Enterprise_Data_Cleaning/backend/models/user_model.py": "# User authentication model",
    "Enterprise_Data_Cleaning/backend/utils/__init__.py": "",
    "Enterprise_Data_Cleaning/backend/utils/logger.py": "# Logging utility",
    "Enterprise_Data_Cleaning/backend/utils/security.py": "# Security functions",
    "Enterprise_Data_Cleaning/backend/utils/helpers.py": "# Utility functions",
    "Enterprise_Data_Cleaning/backend/tests/test_file_upload.py": "# Test file upload",
    "Enterprise_Data_Cleaning/backend/tests/test_data_cleaning.py": "# Test data cleaning",
    "Enterprise_Data_Cleaning/backend/tests/test_report.py": "# Test report generation",
    "Enterprise_Data_Cleaning/frontend/src/App.js": "// React App entry point",
    "Enterprise_Data_Cleaning/frontend/src/index.js": "// React Index file",
    "Enterprise_Data_Cleaning/frontend/src/styles.css": "/* Styles */",
    "Enterprise_Data_Cleaning/logs/app.log": "",
    "Enterprise_Data_Cleaning/requirements.txt": "# List dependencies",
    "Enterprise_Data_Cleaning/README.md": "# Documentation",
    "Enterprise_Data_Cleaning/setup.py": "# Installation script",
}

# Create folders
for folder in folders:
    os.makedirs(folder, exist_ok=True)

# Create files
for file_path, content in files.items():
    with open(file_path, "w") as f:
        f.write(content)

print("Project folder structure created successfully!")
