// src/components/FormFields.jsx
import React from "react";
import { useTranslation } from "react-i18next";

function ImageFormFields({ lines, comps, formData, handleChange }) {
  const { t } = useTranslation();

  return (
    <>
      {/* Line */}
      <div className="col-md-10 mb-3">
        <label htmlFor="line" className="form-label">
          {t("line")}
        </label>
        <select
          id="line"
          className="form-select"
          name="line"
          value={formData.line}
          onChange={handleChange}
          required
        >
          <option value="">{t("please_select", { field: t("line") })}</option>
          {lines.map((line) => (
            <option key={line} value={line}>
              {line}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div className="col-md-10 mb-3">
        <label htmlFor="date" className="form-label">
          {t("date")}
        </label>
        <input
          id="date"
          type="date"
          className="form-control"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      {/* SN */}
      <div className="col-md-10 mb-3">
        <label htmlFor="sn" className="form-label">
          {t("sn")}
        </label>
        <input
          id="sn"
          type="text"
          className="form-control"
          name="sn"
          value={formData.sn}
          onChange={handleChange}
          required
        />
      </div>

      {/* Comp */}
      <div className="col-md-10 mb-3">
        <label htmlFor="comp" className="form-label">
          {t("comp")}
        </label>
        <select
          id="comp"
          className="form-select"
          name="comp"
          value={formData.comp}
          onChange={handleChange}
          required
        >
          <option value="">{t("please_select", { field: t("comp") })}</option>
          {comps.map((comp) => (
            <option key={comp} value={comp}>
              {comp}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

function ReportFormFields({ lines, formData, handleChange }) {
  const { t } = useTranslation();

  return (
    <>
      {/* Line */}
      <div className="col-md-10 mb-3">
        <label htmlFor="line" className="form-label">
          {t("line")}
        </label>
        <select
          id="line"
          className="form-select"
          name="line"
          value={formData.line}
          onChange={handleChange}
          required
        >
          <option value="">{t("please_select", { field: t("line") })}</option>
          {lines.map((line) => (
            <option key={line} value={line}>
              {line}
            </option>
          ))}
        </select>
      </div>

      {/* Start Date */}
      <div className="col-md-10 mb-3">
        <label htmlFor="startDate" className="form-label">
          {t("start_date")}
        </label>
        <input
          id="startDate"
          type="date"
          className="form-control"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
      </div>

      {/* End Date */}
      <div className="col-md-10 mb-3">
        <label htmlFor="endDate" className="form-label">
          {t("end_date")}
        </label>
        <input
          id="endDate"
          type="date"
          className="form-control"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
      </div>

      {/* Comp */}
      <div className="col-md-10 mb-3">
        <label htmlFor="model" className="form-label">
          {t("model_name")}
        </label>
        <input
          id="model"
          type="text"
          className="form-control"
          name="model"
          value={formData.model}
          onChange={handleChange}
          required
        />
      </div>
    </>
  );
}

export { ImageFormFields, ReportFormFields };
