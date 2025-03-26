// Enterprise_Data_Cleaning/frontend/src/pages/CleaningPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const CleaningPage = () => {
  const [analysis, setAnalysis] = useState(null);
  const [analysisMessage, setAnalysisMessage] = useState('');
  const [cleanMessage, setCleanMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  const { filePath } = location.state || {};

  useEffect(() => {
    if (!filePath) {
      navigate('/');
    } else {
      // Call the analysis endpoint to get duplicate columns, duplicate rows, and null values
      axios.post('http://localhost:5000/file/analyze', { file_path: filePath })
        .then(res => {
          setAnalysis(res.data.analysis);
          setAnalysisMessage(res.data.message);
        })
        .catch(err => {
          setAnalysisMessage(err.response?.data.error || 'Analysis failed.');
        });
    }
  }, [filePath, navigate]);

  const onClean = () => {
    if (window.confirm("Do you want to proceed with cleaning the file?")) {
      axios.post('http://localhost:5000/file/clean', { file_path: filePath, confirm: true })
        .then(res => {
          setCleanMessage(res.data.message);
          // Navigate to the Report Generation Page, passing the filePath
          navigate('/report', { state: { filePath } });
        })
        .catch(err => {
          setCleanMessage(err.response?.data.error || 'Cleaning failed.');
        });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Data Analysis & Cleaning</h1>
      {analysisMessage && <p>{analysisMessage}</p>}
      {analysis ? (
        <div>
          <h3>Analysis Details:</h3>
          <p><strong>Duplicate Columns:</strong> {analysis.duplicate_columns.length > 0 ? analysis.duplicate_columns.join(', ') : 'None'}</p>
          <p><strong>Duplicate Rows Count:</strong> {analysis.duplicate_rows}</p>
          <h4>Null Values per Column:</h4>
          <ul>
            {Object.entries(analysis.null_values).map(([col, count]) => (
              <li key={col}>{col}: {count}</li>
            ))}
          </ul>
          <button onClick={onClean}>Clean Data</button>
          <p>{cleanMessage}</p>
        </div>
      ) : (
        <p>Loading analysis...</p>
      )}
    </div>
  );
};

export default CleaningPage;
