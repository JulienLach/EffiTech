import React, { Component } from "react";
import { isMobile } from "react-device-detect";
import styles from "./FilterBar.module.css";
import stylesMobile from "./FilterBarMobile.module.css";

class FilterBar extends Component {
    render() {
        return (
            <>
                {isMobile ? (
                    <div className={stylesMobile.filterDiv}>
                        <div
                            className={stylesMobile.typeFilter}
                            onClick={this.props.toggleStatusModal}
                        >
                            <i className="fa-solid fa-tag"></i>
                            <p>Statut</p>
                        </div>
                        {this.props.isStatusModalOpen && (
                            <div className={stylesMobile.statutModalOverlay}>
                                <div className={stylesMobile.modalContent}>
                                    <div className={stylesMobile.modalBody}>
                                        <label>
                                            <input
                                                type="radio"
                                                name="status"
                                                value="1"
                                                checked={
                                                    this.props
                                                        .selectedStatus === "1"
                                                }
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
                                                checked={
                                                    this.props
                                                        .selectedStatus === "2"
                                                }
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
                                                checked={
                                                    this.props
                                                        .selectedStatus === "3"
                                                }
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
                                                checked={
                                                    this.props
                                                        .selectedStatus === "4"
                                                }
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
                                                checked={
                                                    this.props
                                                        .selectedStatus === "5"
                                                }
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
                                                checked={
                                                    this.props
                                                        .selectedStatus === ""
                                                }
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
                        <div
                            className={stylesMobile.typeFilter}
                            onClick={this.props.toggleTypeModal}
                        >
                            <i className="fa-solid fa-filter"></i>
                            <p>Type</p>
                        </div>
                        {this.props.isTypeModalOpen && (
                            <div className={stylesMobile.typeModalOverlay}>
                                <div className={stylesMobile.modalContent}>
                                    <div className={stylesMobile.modalBody}>
                                        <label>
                                            <input
                                                type="radio"
                                                name="type"
                                                value=""
                                                checked={
                                                    this.props.selectedType ===
                                                    ""
                                                }
                                                onChange={
                                                    this.props.handleTypeChange
                                                }
                                            />
                                            Tous
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="type"
                                                value="Intervention"
                                                checked={
                                                    this.props.selectedType ===
                                                    "Intervention"
                                                }
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
                                                checked={
                                                    this.props.selectedType ===
                                                    "Rendez-vous"
                                                }
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
                        <div
                            className={stylesMobile.typeFilter}
                            onClick={this.props.handleResetFilter}
                        >
                            <i className="fa-solid fa-arrow-rotate-left"></i>
                            <p>Réinitialiser</p>
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
                                value={this.props.searchItem}
                                onChange={this.props.handleSearchChange}
                            />
                        </div>
                        <div className={styles.typeFilter}>
                            <i className="fa-solid fa-user-group"></i>
                            <p>Client</p>
                        </div>
                        <div
                            className={`${styles.typeFilter} ${
                                this.props.isStatusModalOpen
                                    ? styles.activeFilter
                                    : ""
                            }`}
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
                            <i className="fa-solid fa-user"></i>
                            <p>Employé</p>
                        </div>
                        <div
                            className={`${styles.typeFilter} ${
                                this.props.isTypeModalOpen
                                    ? styles.activeFilter
                                    : ""
                            }`}
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
                                        <label>
                                            <input
                                                type="radio"
                                                name="type"
                                                value=""
                                                onChange={
                                                    this.props.handleTypeChange
                                                }
                                            />
                                            Tous
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
                        <div
                            className={styles.typeFilter}
                            onClick={this.props.handleResetFilter}
                        >
                            <i className="fa-solid fa-arrow-rotate-left"></i>
                            <p>Réinitialiser</p>
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
