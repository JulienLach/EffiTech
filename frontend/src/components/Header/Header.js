import React from 'react';
import logo from '../../images/logo.svg';
import GlobalStyle from '../../styles/GlobalStyle.module.css';
import style from './Header.module.css';

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.logo}>Effitech</div>
      <div className={style.headerRight}>
        <button className={style.planifierButton}>Planifier</button>
        <div className={style.notificationIcon}>
          <span className={style.icon}>🔔</span>
          <span className={style.notificationCount}>3</span>
        </div>
        <div className={style.profileIcon}>
          <span className={style.icon}>👤</span>
          <div className={style.profileBubble}>A</div>
        </div>
      </div>
    </header>
  );
};

export default Header;