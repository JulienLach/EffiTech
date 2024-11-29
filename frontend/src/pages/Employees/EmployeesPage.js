import React, { Component } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./EmployeesPage.module.css";
import profilPicture from "../../images/profil.png";
import { getAllEmployees } from "../../services/api";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";

// Composant fonctionnel wrapper
const EmployeesPageWrapper = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return <EmployeesPage navigate={navigate} location={location} />;
};

class EmployeesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            isModalOpen: false,
            employee: {},
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        getAllEmployees((error, data) => {
            if (error) {
                this.setState({ error: error.message });
            } else {
                // console.log("Données des employés récupérées:", data);
                this.setState({ employees: data });
            }
        });
    }

    handleButtonClick(employee) {
        if (employee && employee.idEmployee) {
            this.props.navigate(`/employee-details/`, {
                state: { employee },
            });
        } else {
            console.error("Données de l'employé non définies");
        }
    }

    openModal() {
        this.setState({ isModalOpen: true });
    }

    closeModal() {
        this.setState({ isModalOpen: false });
    }

    render() {
        const { employees, isModalOpen } = this.state;
        const screenType = window.navigator.userAgentData;
        return (
            <>
                {screenType.mobile ? (
                    <>
                        <h1>Mobile</h1>
                    </>
                ) : (
                    <>
                        <TemplateGlobal />
                        <div className={styles.container}>
                            <h1 className={styles.pageTitle}>Employés</h1>
                            <div>
                                <button
                                    className={styles.addEmployee}
                                    onClick={this.openModal}
                                >
                                    <i className="fa-solid fa-plus"></i>Ajouter
                                    un employé
                                </button>
                            </div>
                            <div className={styles.cardContainer}>
                                {employees.map((employee) => (
                                    <div
                                        key={employee.idEmployee}
                                        className={styles.card}
                                    >
                                        <div className={styles.profilPicture}>
                                            <img
                                                src={profilPicture}
                                                alt="Profil picture"
                                            />
                                        </div>
                                        <div className={styles.profilInfo}>
                                            <p className={styles.name}>
                                                {employee.firstname}{" "}
                                                {employee.lastname}
                                            </p>
                                            <p className={styles.job}>
                                                {employee.job}
                                            </p>
                                            <p className={styles.info}>
                                                {employee.phoneNumber}
                                            </p>
                                            <p className={styles.info}>
                                                {employee.email}
                                            </p>
                                            <div className={styles.moreInfo}>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        this.handleButtonClick(
                                                            employee
                                                        )
                                                    }
                                                >
                                                    Voir détails
                                                </button>
                                                <i className="fa-solid fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
                {isModalOpen && (
                    <Modal onClose={this.closeModal}>
                        <EmployeeForm onClose={this.closeModal} />
                    </Modal>
                )}
            </>
        );
    }
}

const Modal = ({ onClose, children }) => {
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default EmployeesPageWrapper;
