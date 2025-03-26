// Enterprise_Data_Cleaning/frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import CleaningPage from './pages/CleaningPage';
import ReportPage from './pages/ReportPage';
import './styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/cleaning" element={<CleaningPage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </Router>
  );
}

export default App;
