import React from 'react';
import logoDesktop from '../../images/logo.svg';
import GlobalStyle from '../../styles/GlobalStyle.module.css';
import style from './LogoDesktop.module.css';

const LogoDesktop = () => {
    return (
      <header className={style.logoEffitech}>
        <img src={logoDesktop} alt="LogoDesktop"/>
      </header>
    )
};

export default LogoDesktop;