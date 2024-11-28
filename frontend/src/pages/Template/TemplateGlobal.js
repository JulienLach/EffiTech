import React, { Component } from "react";
import styles from "./TemplateGlobal.module.css";
import logo from "../../images/logo.svg";
import bellIcon from "../../images/notificationBell.svg";

class TemplateGlobal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPath: window.location.pathname,
            showProfileMenu: false,
            initials: "",
        };
        this.toggleProfileMenu = this.toggleProfileMenu.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.setInitials();
    }

    setInitials() {
        const firstname = localStorage.getItem("firstname");
        const lastname = localStorage.getItem("lastname");

        if (firstname && lastname) {
            const initials = `${firstname.charAt(0)}${lastname.charAt(
                0
            )}`.toUpperCase();
            this.setState({ initials });
        }
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
                                <a href="/calendar">
                                    <i className="fa-solid fa-calendar"></i>
                                    Calendrier
                                </a>
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
                                <a href="/clients">
                                    <i className="fa-solid fa-user"></i>Clients
                                </a>
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
                                <a href="/employees">
                                    <i className="fa-solid fa-user-group"></i>
                                    Employés
                                </a>
                            </li>
                            <li
                                className={
                                    currentPath === "/company" ||
                                    currentPath === "/company-details"
                                        ? styles.active
                                        : ""
                                }
                            >
                                <a href="/company">
                                    <i className="fa-solid fa-landmark"></i>
                                    Société
                                </a>
                            </li>
                            <li
                                className={
                                    currentPath === "/invoices"
                                        ? styles.active
                                        : ""
                                }
                            >
                                <a href="/invoices">
                                    <i className="fa-solid fa-file"></i>
                                    Facture/Devis
                                </a>
                            </li>
                            <li
                                className={
                                    currentPath === "/documents"
                                        ? styles.active
                                        : ""
                                }
                            >
                                <a href="/documents">
                                    <i className="fa-solid fa-folder"></i>
                                    Documents
                                </a>
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
