import React, { Component } from 'react';
import logoDesktop from '../../images/logo.svg';
import GlobalStyles from '../../styles/GlobalStyles.module.css';
import styles from './LogoDesktop.module.css';

class LogoDesktop extends Component {
    render() {
        return (
            <div className={styles.logoEffitech}>
                <img src={logoDesktop} alt="LogoDesktop" />
            </div>
        );
    }
}

export default LogoDesktop;