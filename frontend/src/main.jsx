// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n';
import 'bootstrap/dist/css/bootstrap.min.css'; // 保留 Bootstrap 的網格系統
import './index.css'; // <-- 引入我們新的全域樣式

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
