import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./EmployeeFormPage.module.css";
import profilPicture from "../../images/profil.png";
import { getEmployeeById } from "../../services/api";

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

    render() {
        const { employee } = this.state;

        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>Employé</h1>
                    <img src={profilPicture} alt="Profil picture" />
                    <div className={styles.separation}></div>
                    <h2>Coordonnées</h2>
                    <form className={styles.formElements}>
                        <div className={styles.labelInput}>
                            <label htmlFor="lastname">Nom:</label>
                            <input type="text" value={employee.lastname} />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="firstname">Prénom:</label>
                            <input type="text" value={employee.firstname} />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="job">Métier:</label>
                            <input type="text" value={employee.job} />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="speciality">Spécialité:</label>
                            <input type="text" value={employee.speciality} />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="mail">Adresse mail:</label>
                            <input type="email" value={employee.email} />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="phone">Téléphone:</label>
                            <input type="text" value={employee.phoneNumber} />
                        </div>
                    </form>
                    <div className={styles.buttonPosition}>
                        <button
                            type="reset"
                            // onClick={this.handleCancel}
                            className={styles.cancelButton}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            // onClick={this.handleSubmit}
                            className={styles.submitButton}
                        >
                            Enregistrer
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

export default EmployeeFormPageWrapper;
