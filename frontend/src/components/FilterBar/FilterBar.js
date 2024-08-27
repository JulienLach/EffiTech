import React from "react";
import GlobalStyles from "../../styles/GlobalStyles.module.css";
import style from "./FilterBar.module.css";

const FilterBar = () => {
  return (
    <>
    <div>
    <h1 className={style.pageTitle}>Calendrier</h1>
      <div className={style.searchInput}>
        <label htmlFor="email" hidden >Email:</label>
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" id="email" name="email" placeholder="Recherche"/>
      </div>
      <div className={style.typeFilter}>
        <i class="fa-solid fa-users"></i>
        <p>Client</p>
      </div>
      <div className={style.typeFilter}>
        <i class="fa-solid fa-check"></i>
        <p>Status</p>
      </div>
      <div className={style.typeFilter}>
        <i class="fa-solid fa-helmet-safety"></i>
        <p>Intervenants</p>
      </div>
      <div className={style.typeFilter}>
        <i class="fa-solid fa-filter"></i>
        <p>Type</p>
      </div>
    </div>
    </>
  );
};

export default FilterBar;
