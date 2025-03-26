// Enterprise_Data_Cleaning/frontend/src/pages/UploadPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';

const UploadPage = () => {
  const navigate = useNavigate();
  const [filePath, setFilePath] = useState('');

  const handleUploadSuccess = (path) => {
    setFilePath(path);
    // Navigate to the Cleaning Page and pass the filePath in state
    navigate('/cleaning', { state: { filePath: path } });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Upload File</h1>
      <FileUpload onUploadSuccess={handleUploadSuccess} />
    </div>
  );
};

export default UploadPage;
