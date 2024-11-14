// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Download from './components/Download';
import ShowImages from './components/ShowImages';
import ProduceReport from './components/ProduceReport';
import UploadCSV from './components/UploadCSV';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true, }}>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<ShowImages />} />
          <Route path="/download" element={<Download />} />
          <Route path="/upload-csv" element={<UploadCSV />} />
          <Route path="/show-images" element={<ShowImages />} />
          <Route path="/produce-report" element={<ProduceReport />} />
          <Route path="*" element={<NotFound />} /> {/* 404 Not Found route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
