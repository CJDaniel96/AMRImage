// src/components/LanguageSwitcher.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() => {
      setDropdownOpen(false);
    });
  };

  return (
    <div className="nav-item language-switcher" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
        <DropdownToggle caret className="btn btn-link p-0 d-flex align-items-center" aria-label="Language select">
          <FaGlobe style={{ marginRight: '5px', cursor: 'pointer', fontSize: '1.25rem', verticalAlign: 'middle' }} />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem 
            onClick={() => changeLanguage('en')} 
            style={{ cursor: 'pointer', transition: 'background-color 0.3s' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={(e) => e.target.style.backgroundColor = ''}
          >
            English
          </DropdownItem>
          <DropdownItem 
            onClick={() => changeLanguage('zh-TW')} 
            style={{ cursor: 'pointer', transition: 'background-color 0.3s' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={(e) => e.target.style.backgroundColor = ''}
          >
            繁體中文
          </DropdownItem>
          <DropdownItem 
            onClick={() => changeLanguage('zh-CN')} 
            style={{ cursor: 'pointer', transition: 'background-color 0.3s' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={(e) => e.target.style.backgroundColor = ''}
          >
            简体中文
          </DropdownItem>
          <DropdownItem 
            onClick={() => changeLanguage('vi')} 
            style={{ cursor: 'pointer', transition: 'background-color 0.3s' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={(e) => e.target.style.backgroundColor = ''}
          >
            Tiếng Việt
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default LanguageSwitcher;
