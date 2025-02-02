import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./EmployeeFormPage.module.css";
import { getEmployeeById, updateEmployee } from "../../services/api";

// Composant wrapper pour utiliser les hooks
function EmployeeFormPageWrapper() {
    const location = useLocation();
    return <EmployeeFormPage location={location} />;
}

class EmployeeFormPage extends Component {
    constructor(props) {
        super(props);
        const { employee } = this.props.location.state;
        this.state = {
            employee: employee,
            idEmployee: employee.idEmployee,
            error: null,
            errors: {},
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { idEmployee } = this.state;
        getEmployeeById(idEmployee, (error, data) => {
            if (error) {
                this.setState({ error: error.message });
            } else {
                this.setState({ employee: data });
            }
        });
    }

    handleCancel() {
        window.history.back();
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            employee: {
                ...prevState.employee,
                [name]: value,
            },
        }));
    }

    handleSubmit(event) {
        event.preventDefault();
        const { employee } = this.state;
        const errors = {};

        if (!employee.lastname) {
            errors.lastname = "* Champ obligatoire";
        } else if (!/^[a-zA-Z\s-]+$/.test(employee.lastname)) {
            errors.lastname = "* Ne doit contenir que des lettres";
        }

        if (!employee.firstname) {
            errors.firstname = "* Champ obligatoire";
        } else if (!/^[a-zA-Z\s-]+$/.test(employee.firstname)) {
            errors.firstname = "* Ne doit contenir que des lettres";
        }

        if (!employee.job) {
            errors.job = "* Champ obligatoire";
        } else if (!/^[a-zA-Z\s-]+$/.test(employee.job)) {
            errors.job = "* Ne doit contenir que des lettres";
        }

        if (!employee.speciality) {
            errors.speciality = "* Champ obligatoire";
        } else if (!/^[a-zA-Z\s-]+$/.test(employee.speciality)) {
            errors.speciality = "* Ne doit contenir que des lettres";
        }

        if (!employee.email) {
            errors.email = "* Champ obligatoire";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.email)) {
            errors.email = "* Adresse email invalide";
        }

        if (!employee.phoneNumber) {
            errors.phoneNumber = "* Champ obligatoire";
        } else if (!/^[\d\s]+$/.test(employee.phoneNumber)) {
            errors.phoneNumber =
                "* Ne doit contenir que des chiffres et des espaces";
        }

        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }

        updateEmployee(employee, (error, data) => {
            if (error) {
                this.setState({ error: error.message });
            } else {
                console.log("Employé mis à jour:", data);
                window.history.back();
            }
        });
    }

    render() {
        const { employee, errors } = this.state;

        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>Employé</h1>
                    <div className={styles.separation}></div>
                    <h2>Coordonnées</h2>
                    <form
                        className={styles.formElements}
                        onSubmit={this.handleSubmit}
                    >
                        <div className={styles.labelInput}>
                            <label htmlFor="lastname">Nom : </label>
                            <input
                                type="text"
                                name="lastname"
                                value={employee.lastname}
                                onChange={this.handleChange}
                            />
                            {errors.lastname && (
                                <span className={styles.error}>
                                    {errors.lastname}
                                </span>
                            )}
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="firstname">Prénom : </label>
                            <input
                                type="text"
                                name="firstname"
                                value={employee.firstname}
                                onChange={this.handleChange}
                            />
                            {errors.firstname && (
                                <span className={styles.error}>
                                    {errors.firstname}
                                </span>
                            )}
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="job">Métier : </label>
                            <input
                                type="text"
                                name="job"
                                value={employee.job}
                                onChange={this.handleChange}
                            />
                            {errors.job && (
                                <span className={styles.error}>
                                    {errors.job}
                                </span>
                            )}
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="speciality">Spécialité : </label>
                            <input
                                type="text"
                                name="speciality"
                                value={employee.speciality}
                                onChange={this.handleChange}
                            />
                            {errors.speciality && (
                                <span className={styles.error}>
                                    {errors.speciality}
                                </span>
                            )}
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="email">Mail : </label>
                            <input
                                type="email"
                                name="email"
                                value={employee.email}
                                onChange={this.handleChange}
                            />
                            {errors.email && (
                                <span className={styles.error}>
                                    {errors.email}
                                </span>
                            )}
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="phoneNumber">Téléphone : </label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={employee.phoneNumber}
                                onChange={this.handleChange}
                            />
                            {errors.phoneNumber && (
                                <span className={styles.error}>
                                    {errors.phoneNumber}
                                </span>
                            )}
                        </div>
                        <div className={styles.buttonPosition}>
                            <button
                                type="button"
                                onClick={this.handleCancel}
                                className={styles.cancelButton}
                            >
                                <i className="fa-solid fa-xmark"></i>
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className={styles.submitButton}
                            >
                                <i className="fa-solid fa-check"></i>
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

export default EmployeeFormPageWrapper;
