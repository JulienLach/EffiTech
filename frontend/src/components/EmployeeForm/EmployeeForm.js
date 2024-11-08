import React, { Component } from "react";
import styles from "./EmployeeForm.module.css";
import profilPicture from "../../images/profil.png";
import { createEmployee } from "../../services/api";

class EmployeeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastname: "",
            firstname: "",
            job: "",
            speciality: "",
            email: "",
            phoneNumber: "",
            password: "",
            isAdmin: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value, type, checked } = event.target;
        this.setState({
            [name]: type === "checkbox" ? checked : value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const employeeData = this.state;
        console.log("Données du formulaire soumises:", employeeData);
        createEmployee(employeeData, (error, createdEmployee) => {
            if (error) {
                console.error(
                    "Erreur lors de la création de l'employé:",
                    error
                );
            } else {
                console.log("Employé créé:", createdEmployee);
            }
        });
    }

    render() {
        return (
            <>
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>Employé</h1>
                    <img src={profilPicture} alt="Profil picture" />
                    <div className={styles.separation}></div>
                    <h2>Coordonnées</h2>
                    <form
                        className={styles.formElements}
                        onSubmit={this.handleSubmit}
                    >
                        <div className={styles.labelInput}>
                            <label htmlFor="lastname">Nom:</label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={this.state.lastname}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="firstname">Prénom:</label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                value={this.state.firstname}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="job">Métier:</label>
                            <input
                                type="text"
                                id="job"
                                name="job"
                                value={this.state.job}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="speciality">Spécialité:</label>
                            <input
                                type="text"
                                id="speciality"
                                name="speciality"
                                value={this.state.speciality}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="email">Adresse email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="phone">Téléphone:</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={this.state.phoneNumber}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="password">Mot de passe:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="isAdmin">Admin:</label>
                            <input
                                type="checkbox"
                                id="isAdmin"
                                name="isAdmin"
                                checked={this.state.isAdmin}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.buttonPosition}>
                            <button
                                type="reset"
                                className={styles.cancelButton}
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
                    </form>
                </div>
            </>
        );
    }
}

export default EmployeeForm;
