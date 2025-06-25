// src/components/Footer.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css'; // 引入頁尾的專屬樣式

function Footer() {
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear(); // 動態取得當前年份

  return (
    <footer className="footer mt-4">
      <div className="container">
        <p className="footer-text">
          &copy; {currentYear} {t('company_name_placeholder')}. {t('all_rights_reserved')}
        </p>
        <p className="footer-info">
          {t('contact_info_placeholder')}
        </p>
      </div>
    </footer>
  );
}

export default Footer;