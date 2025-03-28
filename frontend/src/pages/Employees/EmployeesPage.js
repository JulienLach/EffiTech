import React, { Component } from "react";
import { isMobile } from "react-device-detect";
import { useNavigate, useLocation } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./EmployeesPage.module.css";
import { getAllEmployees } from "../../services/api";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";

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
            filteredEmployees: [],
            isModalOpen: false,
            searchItem: "",
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentDidMount() {
        getAllEmployees((error, data) => {
            if (error) {
                this.setState({ error: error.message });
            } else {
                this.setState({ employees: data, filteredEmployees: data });
            }
        });
    }

    handleSearchChange(event) {
        const searchItem = event.target.value.toLowerCase();
        this.setState((prevState) => {
            const filteredEmployees = prevState.employees.filter(
                (employee) =>
                    employee.firstname.toLowerCase().includes(searchItem) ||
                    employee.lastname.toLowerCase().includes(searchItem) ||
                    employee.job.toLowerCase().includes(searchItem)
            );
            return { searchItem, filteredEmployees };
        });
    }

    handleButtonClick(employee) {
        if (employee && employee.idEmployee) {
            this.props.navigate("/employee-details", {
                state: { idEmployee: employee.idEmployee },
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
        const { filteredEmployees, isModalOpen } = this.state;

        return (
            <>
                {isMobile ? (
                    <>
                        <h1>Mobile</h1>{" "}
                        {/* ici faire une redirection simple vers la page de connexion */}
                    </>
                ) : (
                    <>
                        <TemplateGlobal />
                        <div className={styles.container}>
                            <div className={styles.alignItems}>
                                <h1 className={styles.pageTitle}>Employés</h1>
                                <div className={styles.rightPart}>
                                    <button
                                        className={styles.addEmployee}
                                        onClick={this.openModal}
                                    >
                                        <i className="fa-solid fa-plus"> </i>{" "}
                                        Ajouter un employé
                                    </button>
                                </div>
                            </div>
                            <div className={styles.filterBar}>
                                <div className={styles.searchInput}>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                    <input
                                        type="text"
                                        id="search"
                                        name="search"
                                        placeholder="Rechercher"
                                        onChange={this.handleSearchChange}
                                    />
                                </div>
                                <div className={styles.columnModalFilter}>
                                    <div
                                        className={styles.typeFilter}
                                        onClick={this.openCategoryModal}
                                    >
                                        <i className="fa-solid fa-wrench"></i>
                                        <p>Métier</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.divider}></div>
                            <div className={styles.cardContainer}>
                                {filteredEmployees.map((employee) => (
                                    <div
                                        key={employee.idEmployee}
                                        className={styles.card}
                                        onClick={() =>
                                            this.handleButtonClick(employee)
                                        }
                                    >
                                        <div className={styles.profilPicture}>
                                            <div className={styles.iconWrapper}>
                                                <i className="fa-solid fa-user"></i>
                                            </div>
                                        </div>
                                        <div className={styles.profilInfo}>
                                            <p className={styles.name}>
                                                {employee.firstname}{" "}
                                                {employee.lastname}
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
                                                    {" "}
                                                    Profil employé
                                                    <i className="fa-solid fa-user"></i>{" "}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
                {isModalOpen && (
                    <>
                        <Modal onClose={this.closeModal}>
                            <EmployeeForm onClose={this.closeModal} />
                        </Modal>
                        <div className={styles.modalBackground}></div>
                    </>
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
