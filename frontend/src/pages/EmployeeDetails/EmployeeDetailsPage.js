import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./EmployeeDetailsPage.module.css";
import profilPicture from "../../images/profil.png";
import { getEmployeeById } from "../../services/api";

// Composant wrapper pour utiliser les hooks
function EmployeeDetailsPageWrapper() {
    const navigate = useNavigate();
    const location = useLocation();
    return <EmployeeDetailsPage navigate={navigate} location={location} />;
}

class EmployeeDetailsPage extends Component {
    constructor(props) {
        super(props);
        const { employee } = this.props.location.state;
        this.state = {
            employee: employee,
            idEmployee: employee.idEmployee,
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    componentDidMount() {
        const { idEmployee } = this.state;
        getEmployeeById(idEmployee, (error, data) => {
            if (error) {
                console.error(
                    "Erreur lors de la récupération de l'employé",
                    error
                );
                this.setState({ error: error.message });
            } else {
                this.setState({ employee: data });
                console.log("Données de l'employé récupérées:", data);
            }
        });
    }

    handleButtonClick = () => {
        this.props.navigate("/employee-form", {
            state: { employee: this.state.employee },
        });
    };

    render() {
        const { employee, error } = this.state;

        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}>
                    <div className={styles.profilInfo}>
                        <h1 className={styles.pageTitle}>Employé</h1>
                        <div className={styles.alignBackButton}>
                            <img src={profilPicture} alt="Profil picture" />
                            <div className={styles.names}>
                                <p className={styles.firstname}>
                                    {employee.firstname} {employee.lastname}
                                </p>
                            </div>
                            <button
                                type="button"
                                className={styles.backButton}
                                onClick={() =>
                                    this.props.navigate("/employees")
                                }
                            >
                                <i className="fa-solid fa-arrow-right"></i>
                                Retour
                            </button>
                        </div>
                    </div>
                    <div className={styles.separation}></div>
                    <h2>Coordonnées</h2>
                    <div className={styles.contactInfo}>
                        <p>Métier : {employee.job}</p>
                        <p>Spécialité : {employee.speciality}</p>
                        <p>Email : {employee.email}</p>
                        <p>Téléphone : {employee.phoneNumber}</p>
                    </div>
                    <button
                        className={styles.editButton}
                        onClick={this.handleButtonClick}
                    >
                        <i className="fa-solid fa-pen"></i>
                        Modifier
                    </button>
                </div>
            </>
        );
    }
}

export default EmployeeDetailsPageWrapper;
