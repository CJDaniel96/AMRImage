// src/components/Navbar.jsx
import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import './Navbar.css'; // 引入 Navbar 的專屬樣式

function Navbar() {
  const { t } = useTranslation();

  return (
    <header className="navbar-container">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand">
          <img src='/logo_black.png' alt="Logo" className="navbar-logo" />
          <span className="navbar-title">{t('amr_image_tracing_system')}</span>
        </Link>
        <nav className="nav-item">
          <NavLink to="/download/download-images" className="nav-link">
            {t('download_images')}
          </NavLink>
          <NavLink to="/show-images" className="nav-link" end>
            {t('show_images')}
          </NavLink>
          <div className="nav-item">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
