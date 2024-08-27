import React from 'react';
import logoDesktop from '../../images/logo.svg';
import GlobalStyles from '../../styles/GlobalStyles.module.css';
import style from './LogoDesktop.module.css';

const LogoDesktop = () => {
    return (
      <div className={style.logoEffitech}>
        <img src={logoDesktop} alt="LogoDesktop"/>
      </div>
    )
};

export default LogoDesktop;