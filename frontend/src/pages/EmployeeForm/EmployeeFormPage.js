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
        const { employee } = this.state;

        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>Employé</h1>
                    {/* <img src={profilPicture} alt="Profil picture" /> */}
                    <div className={styles.separation}></div>
                    <h2>Coordonnées</h2>
                    <form className={styles.formElements}>
                        <div className={styles.labelInput}>
                            <label htmlFor="lastname">Nom : </label>
                            <input
                                type="text"
                                name="lastname"
                                value={employee.lastname}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="firstname">Prénom : </label>
                            <input
                                type="text"
                                name="firstname"
                                value={employee.firstname}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="job">Métier : </label>
                            <input
                                type="text"
                                name="job"
                                value={employee.job}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="speciality">Spécialité : </label>
                            <input
                                type="text"
                                name="speciality"
                                value={employee.speciality}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="mail">Mail : </label>
                            <input
                                type="email"
                                name="email"
                                value={employee.email}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="phone">Téléphone : </label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={employee.phoneNumber}
                                onChange={this.handleChange}
                            />
                        </div>
                    </form>
                    <div className={styles.buttonPosition}>
                        <button
                            onClick={this.handleCancel}
                            className={styles.cancelButton}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            onClick={this.handleSubmit}
                            className={styles.submitButton}
                        >
                            <i className="fa-solid fa-save"></i>
                            Enregistrer
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

export default EmployeeFormPageWrapper;
