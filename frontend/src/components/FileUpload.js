// frontend/src/components/FileUpload.js
import React, { useState, useRef } from 'react';
import axios from 'axios';

const FileUpload = ({ onUploadSuccess, showCleanButton = true, hideFileInput = false }) => {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [filePath, setFilePath] = useState('');
  const [cleanMessage, setCleanMessage] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const dropRef = useRef(null);
  // New ref for hidden file input element
  const fileInputRef = useRef(null);

  // Handle file selection via input
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle drag events
  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropRef.current) {
      dropRef.current.style.border = '2px dashed #007bff';
    }
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropRef.current) {
      dropRef.current.style.border = '2px dashed #ccc';
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropRef.current) {
      dropRef.current.style.border = '2px dashed #ccc';
    }
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const onUpload = async () => {
    if (!file) {
      setUploadMessage("Please select a file before uploading.");
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('http://localhost:5000/file/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadMessage(res.data.message);
      setFilePath(res.data.file_path);
      setUploadedFileName(file.name); // Save and display the file name after upload
      onUploadSuccess(res.data.file_path);
    } catch (err) {
      console.error("Upload error:", err);
      setUploadMessage(err.response?.data.error || 'Upload failed.');
    }
  };

  // This function remains for backward compatibility (when showCleanButton=true)
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
      {/* Single Column: Drag & Drop Area */}
      <div
        ref={dropRef}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        // On click, trigger hidden file input selection
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
        style={{
          border: '2px dashed #ccc',
          borderRadius: '5px',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '15px',
          transition: 'border 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer'
        }}
      >
        {file ? (
          <p>Selected File: {file.name}</p>
        ) : (
          <p>Click or drag and drop your file here.</p>
        )}
        {/* Hidden file input is still available for file select */}
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={onFileChange} 
          accept=".xlsx" 
          style={{ display: 'none' }} 
        />
        <button onClick={(e) => { e.stopPropagation(); onUpload(); }}>
          Upload
        </button>
      </div>
      <p>{uploadMessage}</p>
      {/* Display the uploaded file name after successful upload */}
      {uploadedFileName && (
        <p style={{ fontWeight: 'bold' }}>Uploaded File: {uploadedFileName}</p>
      )}
      
      {/* Conditionally render the Clean Data section if showCleanButton is true */}
      {showCleanButton && (
        <>
          <h2>Clean Data</h2>
          <button onClick={onClean}>Clean Data</button>
          <p>{cleanMessage}</p>
        </>
      )}
    </div>
  );
};

export default FileUpload;
