import React from "react";
import GlobalStyles from "../../styles/GlobalStyles.module.css";
import styles from "./FilterBar.module.css";

const FilterBar = ({ toggleCreateEventModal }) => {
  return (
    <div>
      <h1 className={styles.pageTitle}>Calendrier</h1>
      <div className={styles.searchInput}>
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" id="search" name="search" placeholder="Recherche"/>
      </div>
      <div className={styles.typeFilter}>
        <i class="fa-solid fa-users"></i>
        <p>Client</p>
      </div>
      <div className={styles.typeFilter}>
        <i class="fa-solid fa-check"></i>
        <p>Status</p>
      </div>
      <div className={styles.typeFilter}>
        <i class="fa-solid fa-helmet-safety"></i>
        <p>Intervenants</p>
      </div>
      <div className={styles.typeFilter}>
        <i class="fa-solid fa-filter"></i>
        <p>Type</p>
      </div>
      <button onClick={toggleCreateEventModal}>Créer un évènement </button>
    </div>
  );
};

export default FilterBar;