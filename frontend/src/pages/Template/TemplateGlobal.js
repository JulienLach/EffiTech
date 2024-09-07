import React from "react";
import styles from "./TemplateGlobal.module.css";
import logo from "../../images/logo.svg";
import bellIcon from "../../images/notificationBell.svg";

const TemplateGlobal = function () {
  return (
    <>
    {/* Partie header */}
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

    {/* Partie sidebar */}
      <div className={styles.sidebarAndOrange}>
        <div className={styles.sidebar}>
          <ul>
            <li>
              <i className="fa-solid fa-calendar"></i>
              <a href="/calendar">Calendrier</a>
            </li>
            <li>
              <i className="fa-solid fa-user"></i>
              <a href="/clients">Clients</a>
            </li>
            <li>
              <i className="fa-solid fa-users"></i>
              <a href="/employees">Équipes</a>
            </li>
            <li>
              <i className="fa-solid fa-building"></i>
              <a href="/company">Société</a>
            </li>
            <li>
              <i className="fa-solid fa-file-lines"></i>
              <a href="/invoices">Facture/Devis</a>
            </li>
            <li>
              <i className="fa-solid fa-folder"></i>
              <a href="/documents">Documents</a>
            </li>
          </ul>
        </div>
        <div className={styles.sideOrange}>
          <i className="fa-solid fa-caret-down"></i>
        </div>
      </div>

{/* partie container a copier pour les nouvelles pages */}
        {/* <div className={styles.container}>
      </div> */}
    </>
  );
};

export default TemplateGlobal;
