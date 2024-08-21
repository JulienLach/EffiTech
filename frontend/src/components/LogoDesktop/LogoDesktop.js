import React from 'react';
import logo from '../../images/logo.svg';
import GlobalStyle from '../../styles/GlobalStyle.module.css';
import style from './LogoDesktop.module.css';

const LogoDesktop = () => {
    return (
      <header className={style.logoEffitech}>
        <img src={logo} alt="Logo" style={{ height: '100px' }} />
      </header>
    )
};

export default LogoDesktop;