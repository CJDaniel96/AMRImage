// src/components/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="container text-center mt-5">
      <h1>{t('404_title')}</h1>
      <p>{t('404_message')}</p>
      <Link to="/" className="btn btn-primary">{t('go_to_home')}</Link>
    </div>
  );
}

export default NotFound;
