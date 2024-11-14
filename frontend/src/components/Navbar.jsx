// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher'

function Navbar() {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <header className="d-flex flex-wrap justify-content-between py-3 mb-4 border-bottom">
        <Link
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
        >
          <img src="logo.png" alt="Logo" width="40" height="32" />
          <span className="fs-4">{t('amr_image_data_center')}</span>
        </Link>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link
              to="/download"
              className={`nav-link ${location.pathname === '/download' ? 'active' : ''}`}
            >
              {t('download')}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/upload-csv"
              className={`nav-link link-disabled`}
              style={{ color: "grey", cursor: "not-allowed", textDecoration: "none" }}
              onClick={(e) => {e.preventDefault();}}
            >
              {t('upload_csv_for_download')}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/show-images"
              className={`nav-link ${location.pathname === '/show-images' || location.pathname === '/' ? 'active' : ''}`}
            >
              {t('show_images')}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/produce-report"
              className={`nav-link ${location.pathname === '/produce-report' ? 'active' : ''}`}
            >
              {t('produce_report')}
            </Link>
          </li>
          <li><LanguageSwitcher /></li>
        </ul>
      
    </header>
  );
}

export default Navbar;
