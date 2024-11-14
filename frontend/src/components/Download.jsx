// src/components/Download.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useLines from "../hooks/useLines";
import useComps from "../hooks/useComps";
import { handleFormChange } from "../utils/handleFormChange";
import { ImageFormFields } from "./FormFields";

function Download() {
  const { t } = useTranslation();
  const lines = useLines();
  const [formData, setFormData] = useState({
    line: '',
    date: '',
    sn: '',
    comp: '',
  });

  const comps = useComps(formData.line, formData.date, formData.sn);
  const handleChange = handleFormChange(setFormData);

  const handleDownload = (e) => {
    e.preventDefault();
    const { line, date, sn, comp } = formData;
    if (!line || !date || !sn || !comp) {
      alert(t('required_field', { field: t('line') + '、' + t('date') + '、' + t('sn') + '、' + t('comp') }));
      return;
    }
    const url = `/api/v1/download?line=${encodeURIComponent(line)}&date=${encodeURIComponent(date)}&sn=${encodeURIComponent(sn)}&comp=${encodeURIComponent(comp)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="row justify-content-center mb-5">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-body d-flex flex-column align-items-center">
            <h4 className="card-title mb-4">{t('download_amr_image')}</h4>
            <form className="w-100 d-flex flex-column align-items-center" onSubmit={handleDownload}>
              {/* Reuse FormFields */}
              <ImageFormFields
                lines={lines}
                comps={comps}
                formData={formData}
                handleChange={handleChange}
              />

              {/* Submit */}
              <button type="submit" className="btn btn-primary">{t('download')}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Download;
