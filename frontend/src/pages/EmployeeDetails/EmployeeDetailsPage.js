import React, { Component } from "react";
import { isMobile } from "react-device-detect";
import { useLocation, useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import TemplateGlobalMobile from "../Template/TemplateGlobalMobile";
import styles from "./EmployeeDetailsPage.module.css";
import stylesMobile from "./EmployeeDetailsPageMobile.module.css";
import { getEmployeeById } from "../../services/api";

function EmployeeDetailsPageWrapper() {
    const navigate = useNavigate();
    const location = useLocation();
    const idEmployee =
        location.state?.idEmployee || localStorage.getItem("idEmployee");

    if (!idEmployee) {
        window.location.href = "/employees";
    }
    return <EmployeeDetailsPage navigate={navigate} location={location} />;
}

class EmployeeDetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: {},
            idEmployee:
                this.props.location.state?.idEmployee ||
                localStorage.getItem("idEmployee"),
            error: null,
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleLogout = this.handleLogout.bind(this); // Ajout du handler pour la déconnexion
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

    handleLogout = () => {
        this.props.navigate("/login");
    };

    render() {
        const { employee } = this.state;
        const initial =
            employee.firstname && employee.lastname
                ? employee.firstname.charAt(0).toUpperCase() +
                  employee.lastname.charAt(0).toUpperCase()
                : "";

        return (
            <>
                {isMobile ? (
                    <>
                        <TemplateGlobalMobile />
                        <div className={stylesMobile.container}>
                            <div className={stylesMobile.buttonContainer}>
                                <button
                                    className={stylesMobile.backButton}
                                    type="button"
                                    onClick={() =>
                                        (window.location.href = "/calendar")
                                    }
                                >
                                    <i className="fa-solid fa-arrow-left"></i>
                                    Retour
                                </button>
                            </div>
                            <div className={stylesMobile.infoEmployeeCard}>
                                <div className={stylesMobile.profilInitial}>
                                    {initial}
                                </div>
                                <h3>Nom</h3>
                                <p>{employee.lastname}</p>
                                <h3>Prénom</h3>
                                <p>{employee.firstname}</p>
                                <h3>Téléphone</h3>
                                <p>{employee.phoneNumber}</p>
                            </div>
                            <div className={stylesMobile.contactCard}>
                                <h3>Métier</h3>
                                <p>{employee.job}</p>
                                <h3>Spécialité</h3>
                                <p>{employee.speciality}</p>
                                <h3>Email</h3>
                                <p>{employee.email}</p>
                                <h3>Téléphone</h3>
                                <p>{employee.phoneNumber}</p>
                            </div>
                            <button
                                className={stylesMobile.logoutButton}
                                type="button"
                                onClick={this.handleLogout}
                            >
                                <i className="fa-solid fa-sign-out-alt"></i>
                                Déconnexion
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <TemplateGlobal />
                        <div className={styles.container}>
                            <div className={styles.profilInfo}>
                                <h1 className={styles.pageTitle}>Employé</h1>
                                <div className={styles.alignBackButton}>
                                    <div className={styles.iconWrapper}>
                                        <i className="fa-solid fa-user"></i>
                                    </div>
                                    <div className={styles.names}>
                                        <p className={styles.firstname}>
                                            {employee.firstname}{" "}
                                            {employee.lastname}
                                        </p>
                                        <p>
                                            {employee.isAdmin && (
                                                <span
                                                    className={
                                                        styles.adminBadge
                                                    }
                                                >
                                                    Administrateur
                                                </span>
                                            )}
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
                                <p>
                                    <span className={styles.employeeLabels}>
                                        Métier :
                                    </span>{" "}
                                    {employee.job}
                                </p>
                                <p>
                                    <span className={styles.employeeLabels}>
                                        Spécialité :
                                    </span>{" "}
                                    {employee.speciality}
                                </p>
                                <p>
                                    <span className={styles.employeeLabels}>
                                        Email :
                                    </span>{" "}
                                    {employee.email}
                                </p>
                                <p>
                                    <span className={styles.employeeLabels}>
                                        Téléphone :
                                    </span>{" "}
                                    {employee.phoneNumber}
                                </p>
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
                )}
            </>
        );
    }
}

export default EmployeeDetailsPageWrapper;
