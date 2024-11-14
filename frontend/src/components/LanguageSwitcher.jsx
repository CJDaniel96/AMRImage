// src/components/LanguageSwitcher.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="nav-item language-switcher">
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="form-select"
        aria-label="Default select"
        style={{ width: 'auto', display: 'inline-block', marginLeft: '10px' }}
      >
        <option value="en">Language</option>
        <option value="zh-TW">語言</option>
        <option value="zh-CN">语言</option>
        <option value="vi">Ngôn ngữ</option>
      </select>
    </div>
  );
}

export default LanguageSwitcher;
