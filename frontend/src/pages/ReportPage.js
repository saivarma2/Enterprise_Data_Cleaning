// Enterprise_Data_Cleaning/frontend/src/pages/ReportPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ReportPage = () => {
  const [reportMessage, setReportMessage] = useState('');
  const [reportPath, setReportPath] = useState('');
  const location = useLocation();
  const { filePath } = location.state || {};

  const onGenerateReport = () => {
    axios.post('http://localhost:5000/report/generate', { file_path: filePath })
      .then(res => {
        setReportMessage(res.data.message);
        setReportPath(res.data.result_path);
      })
      .catch(err => {
        setReportMessage(err.response?.data.error || 'Report generation failed.');
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Report Generation & Visuals</h1>
      <button onClick={onGenerateReport}>Generate Report & Visuals</button>
      <p>{reportMessage}</p>
      {reportPath && <p>Report saved in: {reportPath}</p>}
      {/* Integrate charts/graphs here as needed */}
    </div>
  );
};

export default ReportPage;
