import React, { Component } from "react";
import styles from "./EmployeeForm.module.css";
import { createEmployee, sendEmployeeCredentials } from "../../services/api";

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
            errors: {},
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
        const {
            lastname,
            firstname,
            job,
            speciality,
            email,
            phoneNumber,
            password,
        } = this.state;
        const employeeData = this.state;
        console.log("Données du formulaire soumises:", employeeData);

        const errors = {};
        if (!lastname) {
            errors.lastname = "* Champ obligatoire";
        } else if (!/^[a-zA-ZÀ-ÿÇç\s-]+$/.test(lastname)) {
            errors.lastname = "* Ne doit contenir que des lettres";
        }
        if (!firstname) {
            errors.firstname = "* Champ obligatoire";
        } else if (!/^[a-zA-ZÀ-ÿÇç\s-]+$/.test(firstname)) {
            errors.firstname = "* Ne doit contenir que des lettres";
        }
        if (!job) {
            errors.job = "* Champ obligatoire";
        } else if (!/^[a-zA-ZÀ-ÿÇç\s-]+$/.test(job)) {
            errors.job = "* Ne doit contenir que des lettres";
        }
        if (!speciality) {
            errors.speciality = "* Champ obligatoire";
        } else if (!/^[a-zA-ZÀ-ÿÇç\s-]+$/.test(speciality)) {
            errors.speciality = "* Ne doit contenir que des lettres";
        }
        if (!email) {
            errors.email = "* Champ obligatoire";
        }
        if (!phoneNumber) {
            errors.phoneNumber = "* Champ obligatoire";
        } else if (!/^[\d\s]+$/.test(phoneNumber)) {
            errors.phoneNumber =
                "* Ne doit contenir que des chiffres et des espaces";
        }
        if (!password) {
            errors.password = "* Champ obligatoire";
        }

        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }

        createEmployee(employeeData, (error, createdEmployee) => {
            if (error) {
                console.error(
                    "Erreur lors de la création de l'employé:",
                    error
                );
            } else {
                console.log("Employé créé:", createdEmployee);

                const emailData = {
                    to: createdEmployee.email,
                    subject: "🔧 Vos identifiants de connexion EffiTech",
                    text: `Bonjour ${createdEmployee.firstname},\n\nVoici vos identifiants de connexion à l'application EffiTech :\nEmail: ${createdEmployee.email}\nMot de passe: ${password}\n`,
                };

                sendEmployeeCredentials(emailData, (error, data) => {
                    if (error) {
                        console.error(
                            "Erreur lors de l'envoi des identifiants",
                            error
                        );
                    } else {
                        console.log("Identifiants envoyés par email", data);
                    }
                });
            }
            window.location.reload();
        });
    }

    render() {
        const { errors } = this.state;

        return (
            <>
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>Ajouter un employé</h1>
                    <div className={styles.separation}></div>
                    <h2 className={styles.modalHeader}>Coordonnées :</h2>
                    <form
                        className={styles.formElements}
                        onSubmit={this.handleSubmit}
                    >
                        <div className={styles.labelInput}>
                            <label htmlFor="lastname">
                                Nom <span className={styles.required}>*</span> :{" "}
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={this.state.lastname}
                                onChange={this.handleChange}
                            />
                            {errors.lastname && (
                                <span className={styles.error}>
                                    {errors.lastname}
                                </span>
                            )}
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="firstname">
                                Prénom{" "}
                                <span className={styles.required}>*</span> :{" "}
                            </label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                value={this.state.firstname}
                                onChange={this.handleChange}
                            />
                            {errors.firstname && (
                                <span className={styles.error}>
                                    {errors.firstname}
                                </span>
                            )}
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="job">
                                Métier{" "}
                                <span className={styles.required}>*</span> :{" "}
                            </label>
                            <input
                                type="text"
                                id="job"
                                name="job"
                                value={this.state.job}
                                onChange={this.handleChange}
                            />
                            {errors.job && (
                                <span className={styles.error}>
                                    {errors.job}
                                </span>
                            )}
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="speciality">
                                Spécialité{" "}
                                <span className={styles.required}>*</span> :{" "}
                            </label>
                            <input
                                type="text"
                                id="speciality"
                                name="speciality"
                                value={this.state.speciality}
                                onChange={this.handleChange}
                            />
                            {errors.speciality && (
                                <span className={styles.error}>
                                    {errors.speciality}
                                </span>
                            )}
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="email">
                                Adresse email{" "}
                                <span className={styles.required}>*</span> :{" "}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                            {errors.email && (
                                <span className={styles.error}>
                                    {errors.email}
                                </span>
                            )}
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="phone">
                                Téléphone{" "}
                                <span className={styles.required}>*</span> :{" "}
                            </label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={this.state.phoneNumber}
                                onChange={this.handleChange}
                            />
                            {errors.phoneNumber && (
                                <span className={styles.error}>
                                    {errors.phoneNumber}
                                </span>
                            )}
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="password">
                                Mot de passe{" "}
                                <span className={styles.required}>*</span> :{" "}
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                            {errors.password && (
                                <span className={styles.error}>
                                    {errors.password}
                                </span>
                            )}
                        </div>
                        <div className={styles.labelAdminInput}>
                            <label htmlFor="isAdmin">
                                Compte administrateur :{" "}
                            </label>
                            <label className={styles.switch}>
                                <input
                                    type="checkbox"
                                    id="isAdmin"
                                    name="isAdmin"
                                    checked={this.state.isAdmin}
                                    onChange={this.handleChange}
                                />
                                <span className={styles.slider}></span>
                            </label>
                        </div>
                        <div className={styles.separation}></div>
                        <div className={styles.buttonPosition}>
                            <button
                                type="reset"
                                className={styles.cancelButton}
                                onClick={this.props.onClose}
                            >
                                <i className="fa-solid fa-xmark"></i> Annuler
                            </button>
                            <button
                                type="submit"
                                className={styles.employeeSubmitButton}
                            >
                                <i className="fa-solid fa-check"></i>{" "}
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
