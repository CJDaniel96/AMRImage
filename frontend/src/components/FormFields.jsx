// src/components/FormFields.jsx
import React from "react";
import { useTranslation } from "react-i18next";

/**
 * A reusable form fields component for selecting image criteria.
 * Applies the custom "semiconductor" theme styles.
 */
function ImageFormFields({ lines, comps, formData, handleChange }) {
  const { t } = useTranslation();

  return (
    // The form fields are wrapped in a single fragment.
    // Each field is encapsulated in a div for consistent margin and width.
    <>
      {/* Line Selection */}
      <div className="w-100 mb-4">
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
          <option value="" disabled>
            {t("please_select", { field: t("line") })}
          </option>
          {lines.map((line) => (
            <option key={line} value={line}>
              {line}
            </option>
          ))}
        </select>
      </div>

      {/* Date Selection */}
      <div className="w-100 mb-4">
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

      {/* Serial Number Input */}
      <div className="w-100 mb-4">
        <label htmlFor="sn" className="form-label">
          {t("sn")}
        </label>
        <input
          id="sn"
          type="text"
          className="form-control"
          name="sn"
          placeholder={t("sn")}
          value={formData.sn}
          onChange={handleChange}
          required
        />
      </div>

      {/* Component Selection */}
      <div className="w-100 mb-4">
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
          <option value="" disabled>
            {t("please_select", { field: t("comp") })}
          </option>
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

/**
 * A reusable form fields component for generating reports.
 */
function ReportFormFields({ lines, formData, handleChange }) {
  const { t } = useTranslation();

  return (
    <>
      {/* Line Selection */}
      <div className="w-100 mb-4">
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
          <option value="" disabled>
            {t("please_select", { field: t("line") })}
          </option>
          {lines.map((line) => (
            <option key={line} value={line}>
              {line}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div className="w-100 mb-4">
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
      <div className="w-100 mb-4">
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
      <div className="w-100 mb-4">
        <label htmlFor="comp" className="form-label">
          {t("comp")}
        </label>
        <input
          id="comp"
          className="form-select"
          name="comp"
          value={formData.comp}
          onChange={handleChange}
          required
        />
      </div>
    </>
  );
}

export { ImageFormFields, ReportFormFields };
