import React, { Component } from "react";
import logo from "../../images/logo.svg";
import bellIcon from "../../images/notificationBell.svg";
import GlobalStyles from "../../styles/GlobalStyles.module.css";
import styles from "./Header.module.css";

class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <div className={styles.headerDiv}>
          <div className={styles.logo}>
            <img src={logo} alt="Effitech Logo" />
          </div>
          <div className={styles.headerRight}>
            <div>
              <button className={styles.planifierButton}>
                <i className="fa-solid fa-plus"></i>Créer
              </button>
            </div>
            <div className={styles.notificationIcon}>
              <img src={bellIcon} className={styles.notificationBell}></img>
              <span className={styles.notificationCount}>2</span>
            </div>
            <div className={styles.profileBubble}>JL</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
