// src/components/UploadCSV.jsx
import React, { useState } from 'react';
import axios from 'axios';

function UploadCSV() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      alert('請選擇一個 CSV 檔案');
      return;
    }
    const formData = new FormData();
    formData.append('csvFile', file);

    axios.post('/api/v1/upload_csv', formData, {
      responseType: 'blob',
    })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'downloaded.zip';
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch(error => console.error('Error uploading CSV:', error));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-body">
            <h4 className="card-title mb-4">Upload CSV for Download</h4>
            <form onSubmit={handleUpload}>
              {/* File Input */}
              <div className="mb-3">
                <input type="file" className="form-control" accept=".csv" onChange={handleFileChange} required />
              </div>
              {/* Submit */}
              <button type="submit" className="btn btn-primary">上傳 CSV</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadCSV;
