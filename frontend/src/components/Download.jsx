// src/components/Download.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useLines from "../hooks/useLines";
import useComps from "../hooks/useComps";
import { handleFormChange } from "../utils/handleFormChange";
import { ImageFormFields } from "./FormFields";

// 確保 ImageFormFields 也套用了新的 form-label, form-select 等 class

function DownloadImages() {
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
      // 建議使用更柔和的提示方式，例如在 UI 中顯示錯誤訊息，而不是用 alert
      alert(t('required_field', { field: t('line') + '、' + t('date') + '、' + t('sn') + '、' + t('comp') }));
      return;
    }
    const url = `/api/v1/download/download_images?line=${encodeURIComponent(line)}&date=${encodeURIComponent(date)}&sn=${encodeURIComponent(sn)}&comp=${encodeURIComponent(comp)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="row justify-content-center mb-5">
      <div className="col-lg-8 col-md-10">
        <div className="custom-card">
          <h4 className="custom-card-title">{t('download_amr_image')}</h4>
          <form className="w-100" onSubmit={handleDownload}>
            <ImageFormFields
              lines={lines}
              comps={comps}
              formData={formData}
              handleChange={handleChange}
            />
            <div className="text-center mt-4">
              <button type="submit" className="btn-custom-primary">
                {t('download_images')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export { DownloadImages };
