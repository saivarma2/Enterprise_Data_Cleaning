// Enterprise_Data_Cleaning/frontend/src/pages/CleaningPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import AnimatedPageWrapper from '../components/AnimatedPageWrapper';

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
      // Call the analysis endpoint to get original and cleaned data previews plus duplicate info
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
          navigate('/report', { state: { filePath } });
        })
        .catch(err => {
          // Catch the error message if duplicate columns cause cleaning to fail
          setCleanMessage(err.response?.data.error || 'Cleaning failed.');
        });
    }
  };

  return (
    <AnimatedPageWrapper>
      <h1>Data Analysis & Cleaning</h1>
      {analysisMessage && <p>{analysisMessage}</p>}
      {analysis ? (
        <div>
          <h3>Original Data Preview:</h3>
          <div dangerouslySetInnerHTML={{ __html: analysis.original_data_preview }} />
          
          <h3>Cleaned Data Preview (duplicates removed):</h3>
          <div dangerouslySetInnerHTML={{ __html: analysis.cleaned_data_preview }} />
          
          <p style={{ color: 'red' }}>{analysis.removed_message}</p>
          
          <h3>Additional Analysis:</h3>
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
    </AnimatedPageWrapper>
  );
};

export default CleaningPage;
