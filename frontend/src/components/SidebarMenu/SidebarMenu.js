import React from "react";
import SidebarStyle from "./SidebarMenu.module.css";
import GlobalStyles from "../../styles/GlobalStyles.module.css";

const SidedarMenu = () => {
  return (
    <>
        <div className={SidebarStyle.sidebarAndOrange}>
          <div className={SidebarStyle.sidebar}>
            <ul>
              <li>
                <i class="fa-solid fa-calendar"></i>
                <a href="/dashboard">Calendrier</a>
              </li>
              <li>
                <i class="fa-solid fa-user"></i>
                <a href="/clients">Clients</a>
              </li>
              <li>
                <i class="fa-solid fa-users"></i>
                <a href="/employees">Équipes</a>
              </li>
              <li>
                <i class="fa-solid fa-building"></i>
                <a href="/company">Société</a>
              </li>
              <li>
                <i class="fa-solid fa-file-lines"></i>
                <a href="/invoices">Facture/Devis</a>
              </li>
              <li>
                <i class="fa-solid fa-folder"></i>
                <a href="/documents">Documents</a>
              </li>
            </ul>
          </div>
          <div className={SidebarStyle.sideOrange}>
            <i class="fa-solid fa-caret-down"></i>
          </div>
        </div>
    </>
  );
};

export default SidedarMenu;
