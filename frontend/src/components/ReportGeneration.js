// Enterprise_Data_Cleaning/frontend/src/components/ReportGeneration.js
import React, { useState } from 'react';
import axios from 'axios';

const ReportGeneration = ({ filePath }) => {
  const [reportMessage, setReportMessage] = useState('');
  const [reportPath, setReportPath] = useState('');

  const onGenerateReport = async () => {
    if (!filePath) {
      setReportMessage("Please upload and clean a file first.");
      return;
    }
    try {
      const res = await axios.post('/report/generate', { file_path: filePath });
      setReportMessage(res.data.message);
      setReportPath(res.data.result_path);
    } catch (err) {
      setReportMessage(err.response?.data.error || "Report generation failed.");
    }
  };

  return (
    <div>
      <h2>Generate Report</h2>
      <button onClick={onGenerateReport}>Generate Report</button>
      <p>{reportMessage}</p>
      {reportPath && <p>Report saved in: {reportPath}</p>}
    </div>
  );
};

export default ReportGeneration;
