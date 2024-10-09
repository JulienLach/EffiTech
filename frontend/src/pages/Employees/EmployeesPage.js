import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./EmployeesPage.module.css";
import profilPicture from "../../images/profil.png";

// Composant fonctionnel wrapper
const EmployeesPageWrapper = () => {
    const navigate = useNavigate();
    return <EmployeesPage navigate={navigate} />;
};

class EmployeesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleButtonClick() {
        this.props.navigate("/employee-details");
    }

    openModal() {
        this.setState({ isModalOpen: true });
    }

    closeModal() {
        this.setState({ isModalOpen: false });
    }

    render() {
        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>Employés</h1>
                    <div>
                        <button
                            className={styles.addEmployee}
                            onClick={this.openModal}
                        >
                            <i className="fa-solid fa-plus"></i>Ajouter un
                            employé
                        </button>
                    </div>
                    <div className={styles.cardContainer}>
                        <div className={styles.card}>
                            <div className={styles.profilPicture}>
                                <img src={profilPicture} alt="Profil picture" />
                            </div>
                            <div className={styles.profilInfo}>
                                <p className={styles.name}>[lastname]</p>
                                <p className={styles.name}>[firstname]</p>
                                <p className={styles.job}>[Menuisier]</p>
                                <p className={styles.info}>[phone]</p>
                                <p className={styles.info}>[mail]</p>
                                <div className={styles.moreInfo}>
                                    <button
                                        type="submit"
                                        onClick={this.handleButtonClick}
                                    >
                                        Consulter la fiche
                                    </button>
                                    <i className="fa-solid fa-arrow-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isModalOpen && (
                    <Modal onClose={this.closeModal}>
                        <h2>Ajouter un nouvel employé</h2>
                        <form className={styles.formElements}>
                            <div className={styles.labelInput}>
                                <label htmlFor="lastname">Nom:</label>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                />
                            </div>
                            <div className={styles.labelInput}>
                                <label htmlFor="firstname">Prénom:</label>
                                <input
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                />
                            </div>
                            <div className={styles.labelInput}>
                                <label htmlFor="job">Métier:</label>
                                <input type="text" id="job" name="job" />
                            </div>
                            <div className={styles.labelInput}>
                                <label htmlFor="speciality">Spécialité:</label>
                                <input
                                    type="text"
                                    id="speciality"
                                    name="speciality"
                                />
                            </div>
                            <div className={styles.labelInput}>
                                <label htmlFor="mail">Adresse mail:</label>
                                <input type="email" id="mail" name="mail" />
                            </div>
                            <div className={styles.labelInput}>
                                <label htmlFor="phone">Téléphone:</label>
                                <input type="text" id="phone" name="phone" />
                            </div>
                        </form>
                        <div className={styles.buttonPosition}>
                            <button
                                type="reset"
                                className={styles.cancelButton}
                                onClick={this.closeModal}
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className={styles.submitButton}
                            >
                                Enregistrer
                            </button>
                        </div>
                    </Modal>
                )}
            </>
        );
    }
}

const Modal = ({ onClose, children }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>{children}</div>
        </div>
    );
};

export default EmployeesPageWrapper;
