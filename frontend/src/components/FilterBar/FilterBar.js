import React, { Component } from "react";
import styles from "./FilterBar.module.css";

class FilterBar extends Component {
    render() {
        return (
            <div>
                <div className={styles.searchInput}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                        type="text"
                        id="search"
                        name="search"
                        placeholder="Recherche"
                    />
                </div>
                <div className={styles.typeFilter}>
                    <i className="fa-solid fa-users"></i>
                    <p>Client</p>
                </div>
                <div className={styles.typeFilter}>
                    <i className="fa-solid fa-check"></i>
                    <p>Status</p>
                </div>
                <div className={styles.typeFilter}>
                    <i className="fa-solid fa-helmet-safety"></i>
                    <p>Intervenants</p>
                </div>
                <div className={styles.typeFilter}>
                    <i className="fa-solid fa-filter"></i>
                    <p>Type</p>
                </div>
                <button
                    className={styles.createEventbutton}
                    onClick={this.props.toggleCreateEventModal}
                >
                    <i
                        className="fa-solid fa-plus"
                        style={{ marginRight: "8px" }}
                    ></i>
                    Créer un évènement
                </button>
            </div>
        );
    }
}

export default FilterBar;
