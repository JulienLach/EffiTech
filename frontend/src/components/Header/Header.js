import React from "react";
import logo from "../../images/logo.svg";
import bellIcon from "../../images/notificationBell.svg";
import GlobalStyles from "../../styles/GlobalStyles.module.css";
import HeaderStyle from "./Header.module.css";

const Header = () => {
  return (
    <div className={HeaderStyle.header}>
      <div className={HeaderStyle.headerDiv}>
        <div className={HeaderStyle.logo}>
          <img src={logo} alt="Effitech Logo" />
        </div>
        <div className={HeaderStyle.headerRight}>
          <div>
            <button className={HeaderStyle.planifierButton}>
              <i class="fa-solid fa-plus"></i>Créer
            </button>
          </div>
          <div className={HeaderStyle.notificationIcon}>
            <img src={bellIcon} className={HeaderStyle.notificationBell}></img>
            <span className={HeaderStyle.notificationCount}>2</span>
          </div>
          <div className={HeaderStyle.profileBubble}>JL</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
