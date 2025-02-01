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
                    <div className={styles.filterDiv}>
                        <div className={styles.searchInput}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input
                                type="text"
                                id="search"
                                name="search"
                                placeholder="Rechercher"
                                onChange={this.props.handleSearchChange}
                            />
                        </div>
                        <div className={styles.typeFilter}>
                            <i className="fa-solid fa-user"></i>
                            <p>Client</p>
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
                                    <div className={styles.modalBody}>
                                        <label>
                                            <input
                                                type="radio"
                                                name="status"
                                                value="1"
                                                onChange={
                                                    this.props
                                                        .handleStatusChange
                                                }
                                            />
                                            À planifier
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="status"
                                                value="2"
                                                onChange={
                                                    this.props
                                                        .handleStatusChange
                                                }
                                            />
                                            En retard
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="status"
                                                value="3"
                                                onChange={
                                                    this.props
                                                        .handleStatusChange
                                                }
                                            />
                                            Aujourd'hui
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="status"
                                                value="4"
                                                onChange={
                                                    this.props
                                                        .handleStatusChange
                                                }
                                            />
                                            À venir
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="status"
                                                value="5"
                                                onChange={
                                                    this.props
                                                        .handleStatusChange
                                                }
                                            />
                                            Terminé
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="status"
                                                value=""
                                                onChange={
                                                    this.props
                                                        .handleStatusChange
                                                }
                                            />
                                            Tous
                                        </label>
                                    </div>
                                    <button
                                        onClick={this.props.toggleStatusModal}
                                    >
                                        Fermer
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className={styles.typeFilter}>
                            <i className="fa-solid fa-user-group"></i>
                            <p>Employé</p>
                        </div>
                        <div
                            className={styles.typeFilter}
                            onClick={this.props.toggleTypeModal}
                        >
                            <i className="fa-solid fa-filter"></i>
                            <p>Type</p>
                        </div>
                        {this.props.isTypeModalOpen && (
                            <div className={styles.typeModalOverlay}>
                                <div className={styles.modalContent}>
                                    <div className={styles.modalBody}>
                                        <label>
                                            <input
                                                type="radio"
                                                name="type"
                                                value="Intervention"
                                                onChange={
                                                    this.props.handleTypeChange
                                                }
                                            />
                                            Intervention
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="type"
                                                value="Rendez-vous"
                                                onChange={
                                                    this.props.handleTypeChange
                                                }
                                            />
                                            Rendez-vous
                                        </label>
                                    </div>
                                    <button
                                        onClick={this.props.toggleTypeModal}
                                    >
                                        Fermer
                                    </button>
                                </div>
                            </div>
                        )}
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
