import React, { Component } from "react";
import styles from "./FilterBar.module.css";
import stylesMobile from "./FilterBarMobile.module.css";

class FilterBar extends Component {
    render() {
        const isMobile = window.navigator.userAgentData;

        return (
            <>
                {isMobile.mobile ? (
                    <div className={stylesMobile.filterDiv}>
                        <div className={stylesMobile.typeFilter}>
                            <i className="fa-solid fa-tag"></i>
                            <p>Statut</p>
                        </div>
                        <div className={stylesMobile.typeFilter}>
                            <i className="fa-solid fa-filter"></i>
                            <p>Type</p>
                        </div>
                        <div className={stylesMobile.typeFilter}>
                            <i className="fa-solid fa-user"></i>
                            <p>Clients</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className={styles.searchInput}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input
                                type="text"
                                id="search"
                                name="search"
                                placeholder="Recherche"
                                onChange={this.props.handleSearchChange}
                            />
                        </div>
                        <div className={styles.typeFilter}>
                            <i className="fa-solid fa-user"></i>
                            <p>Clients</p>
                        </div>
                        <div
                            className={styles.typeFilter}
                            onClick={this.props.toggleStatusModal}
                        >
                            <i className="fa-solid fa-tag"></i>
                            <p>Statut</p>
                        </div>
                        {this.props.isStatusModalOpen && (
                            <div className={styles.statutModalOverlay}>
                                <div className={styles.modalContent}>
                                    <div className={styles.modalHeader}>
                                        <h2>Filtrer par statut</h2>
                                        <button
                                            onClick={
                                                this.props.toggleStatusModal
                                            }
                                        >
                                            Fermer
                                        </button>
                                    </div>
                                    <div className={styles.modalBody}>
                                        {/* Ajoutez ici les options de filtrage de statut */}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className={styles.typeFilter}>
                            <i className="fa-solid fa-user-group"></i>
                            <p>Employé</p>
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
                                style={{ marginRight: "0.5em" }}
                            ></i>
                            Créer un évènement
                        </button>
                    </div>
                )}
            </>
        );
    }
}

export default FilterBar;
