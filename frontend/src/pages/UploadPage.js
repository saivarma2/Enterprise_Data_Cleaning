// frontend/src/pages/UploadPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import AnimatedPageWrapper from '../components/AnimatedPageWrapper';

const UploadPage = () => {
  const navigate = useNavigate();
  const [filePath, setFilePath] = useState('');

  const handleUploadSuccess = (path) => {
    setFilePath(path);
    navigate('/cleaning', { state: { filePath: path } });
  };

  return (
    <AnimatedPageWrapper>
      <h1>Upload File</h1>
      <FileUpload 
        onUploadSuccess={handleUploadSuccess} 
        showCleanButton={false} // Hides the clean data section on this page
        hideFileInput={false}   // Ensures file input is visible alongside drag & drop
      />
    </AnimatedPageWrapper>
  );
};

export default UploadPage;
