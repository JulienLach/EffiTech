import React, { Component } from "react";
import styles from "./TemplateGlobal.module.css";
import logo from "../../images/logo.svg";
import bellIcon from "../../images/notificationBell.svg";

class TemplateGlobal extends Component {
    constructor(props) {
        super(props);
        const employee = this.getEmployeeFromCookies();
        console.log("Employee data from cookies:", employee); // Log pour vérifier les données de l'employé

        this.state = {
            currentPath: window.location.pathname,
            showProfileMenu: false,
            initials: employee
                ? `${employee.firstname[0]}${employee.lastname[0]}`
                : "",
        };
        this.toggleProfileMenu = this.toggleProfileMenu.bind(this);
        this.logout = this.logout.bind(this);
    }

    getEmployeeFromCookies() {
        const cookies = document.cookie.split("; ");
        const employeeCookie = cookies.find((cookie) =>
            cookie.startsWith("employee=")
        );
        if (employeeCookie) {
            const employeeData = JSON.parse(
                decodeURIComponent(employeeCookie.split("=")[1])
            );
            return employeeData;
        }
        return null;
    }

    toggleProfileMenu() {
        this.setState((prevState) => ({
            showProfileMenu: !prevState.showProfileMenu,
        }));
    }

    logout() {
        // Supprimer le cookie employee
        document.cookie =
            "employee=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/login";
    }

    render() {
        const { currentPath, showProfileMenu, initials } = this.state;

        return (
            <>
                {/* Partie header */}
                <div className={styles.header}>
                    <div className={styles.headerDiv}>
                        <div className={styles.logo}>
                            <img src={logo} alt="Effitech Logo" />
                        </div>
                        <div className={styles.headerRight}>
                            <div>
                                <button className={styles.planifierButton}>
                                    <i className="fa-solid fa-plus"></i>Créer
                                </button>
                            </div>
                            <div className={styles.notificationIcon}>
                                <img
                                    src={bellIcon}
                                    className={styles.notificationBell}
                                ></img>
                                <span className={styles.notificationCount}>
                                    2
                                </span>
                            </div>
                            <div
                                className={styles.profileBubble}
                                onClick={this.toggleProfileMenu}
                            >
                                {initials}
                            </div>
                            {showProfileMenu && (
                                <div className={styles.profileMenu}>
                                    <ul>
                                        <li>
                                            <a onClick={this.logout} href="#">
                                                Se déconnecter{" "}
                                                <i className="fa-solid fa-sign-out-alt"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="">
                                                Mon profil{" "}
                                                <i className="fa-solid fa-user"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Partie sidebar */}
                <div className={styles.sidebarAndOrange}>
                    <div className={styles.sidebar}>
                        <ul>
                            <li
                                className={
                                    currentPath === "/calendar"
                                        ? styles.active
                                        : ""
                                }
                            >
                                <i className="fa-solid fa-calendar"></i>
                                <a href="/calendar">Calendrier</a>
                            </li>
                            <li
                                className={
                                    currentPath === "/clients" ||
                                    currentPath === "/client-details/" ||
                                    currentPath === "/client-form"
                                        ? styles.active
                                        : ""
                                }
                            >
                                <i className="fa-solid fa-user"></i>
                                <a href="/clients">Clients</a>
                            </li>
                            <li
                                className={
                                    currentPath === "/employees" ||
                                    currentPath === "/employee-details/" ||
                                    currentPath === "/employee-form"
                                        ? styles.active
                                        : ""
                                }
                            >
                                <i className="fa-solid fa-users"></i>
                                <a href="/employees">Employés</a>
                            </li>
                            <li
                                className={
                                    currentPath === "/company" ||
                                    currentPath === "/company-details"
                                        ? styles.active
                                        : ""
                                }
                            >
                                <i className="fa-solid fa-building"></i>
                                <a href="/company">Société</a>
                            </li>
                            <li
                                className={
                                    currentPath === "/invoices"
                                        ? styles.active
                                        : ""
                                }
                            >
                                <i className="fa-solid fa-file-lines"></i>
                                <a href="/invoices">Facture/Devis</a>
                            </li>
                            <li
                                className={
                                    currentPath === "/documents"
                                        ? styles.active
                                        : ""
                                }
                            >
                                <i className="fa-solid fa-folder"></i>
                                <a href="/documents">Documents</a>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.sideOrange}>
                        <i className="fa-solid fa-caret-down"></i>
                    </div>
                </div>

                {/* partie container à copier pour les nouvelles pages */}
                {/* <div className={styles.container}>
                </div> */}
            </>
        );
    }
}

export default TemplateGlobal;
