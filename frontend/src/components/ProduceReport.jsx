// src/components/ProduceReport.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import useLines from "../hooks/useLines";
import { handleFormChange } from "../utils/handleFormChange";
import { ReportFormFields } from "./FormFields";

function ProduceReport() {
  const { t } = useTranslation();
  const lines = useLines();
  const [formData, setFormData] = useState({
    line: '',
    startDate: '',
    endDate: '',
    model: '',
  });

  const handleChange = handleFormChange(setFormData);

  const handleDownloadReport = (e) => {
    e.preventDefault();
    const { line, startDate, endDate, model } = formData;
    if (!line || !startDate || !endDate || !model) {
      alert('所有欄位都是必填的');
      return;
    }
    axios.get('/api/v1/report_script', {
      params: { line, startDate, endDate, model },
      responseType: 'blob',
    })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'report.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch(error => console.error('Error downloading report:', error));
  };

  return (
    <div className="row justify-content-center mb-5">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-body d-flex flex-column align-items-center">
            <h4 className="card-title mb-4">{t("produce_amr_report")}</h4>
            <form className="w-100 d-flex flex-column align-items-center" onSubmit={handleDownloadReport}>
              <ReportFormFields
                lines={lines}
                formData={formData}
                handleChange={handleChange} />
              {/* Submit */}
              <button type="submit" className="btn btn-primary">{t('download_report')}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProduceReport;
