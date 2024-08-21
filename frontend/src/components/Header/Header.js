import React from "react";
import logo from "../../images/logo.svg";
import bellIcon from "../../images/notificationBell.svg";
import GlobalStyle from "../../styles/GlobalStyle.module.css";
import style from "./Header.module.css";

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <img src={logo} alt="Effitech Logo" />
      </div>
      <div className={style.headerRight}>
        <button className={style.planifierButton}>+ Planifier</button>
        <div className={style.notificationIcon}>
          <img src={bellIcon} className={style.notificationBell}></img>
          <span className={style.notificationCount}>2</span>
        </div>
        <div className={style.profileBubble}>JD</div>
      </div>
    </header>
  );
};

export default Header;
