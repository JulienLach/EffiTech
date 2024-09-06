import React from 'react';
import logoDesktop from '../../images/logo.svg';
import GlobalStyles from '../../styles/GlobalStyles.module.css';
import styles from './LogoDesktop.module.css';

const LogoDesktop = () => {
    return (
      <div className={styles.logoEffitech}>
        <img src={logoDesktop} alt="LogoDesktop"/>
      </div>
    )
};

export default LogoDesktop;