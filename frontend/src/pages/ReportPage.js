// frontend/src/pages/ReportPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import AnimatedPageWrapper from '../components/AnimatedPageWrapper';

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
    <AnimatedPageWrapper>
      <h1>Report Generation & Visuals</h1>
      <button onClick={onGenerateReport}>Generate Report & Visuals</button>
      <p>{reportMessage}</p>
      {reportPath && <p>Report saved in: {reportPath}</p>}
      {/* Future visualizations can be added here */}
    </AnimatedPageWrapper>
  );
};

export default ReportPage;
