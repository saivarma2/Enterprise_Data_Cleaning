// frontend/src/components/FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [filePath, setFilePath] = useState('');
  const [cleanMessage, setCleanMessage] = useState('');

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onUpload = async () => {
    if (!file) {
      setUploadMessage("Please select a file before uploading.");
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      // Use the full backend URL if your frontend and backend run on different ports.
      const res = await axios.post('http://localhost:5000/file/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadMessage(res.data.message);
      setFilePath(res.data.file_path);
      onUploadSuccess(res.data.file_path);
    } catch (err) {
      console.error("Upload error:", err);
      setUploadMessage(err.response?.data.error || 'Upload failed.');
    }
  };

  const onClean = async () => {
    if (!filePath) {
      setCleanMessage("Please upload a file first.");
      return;
    }
    if (window.confirm("Do you want to start the cleaning process?")) {
      try {
        const res = await axios.post('http://localhost:5000/file/clean', {
          file_path: filePath,
          confirm: true
        });
        setCleanMessage(res.data.message);
        onUploadSuccess(filePath);
      } catch (err) {
        console.error("Clean error:", err);
        setCleanMessage(err.response?.data.error || 'Cleaning failed.');
      }
    }
  };

  return (
    <div>
      <h2>Upload Excel File</h2>
      <input type="file" onChange={onFileChange} accept=".xlsx" />
      <button onClick={onUpload}>Upload</button>
      <p>{uploadMessage}</p>
      
      <h2>Clean Data</h2>
      <button onClick={onClean}>Clean</button>
      <p>{cleanMessage}</p>
    </div>
  );
};

export default FileUpload;
