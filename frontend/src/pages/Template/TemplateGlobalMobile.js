import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TemplateGlobalMobile.module.css";
import logoMobile from "../../images/iconMobile.png";

function TemplateGlobalMobileWrapper(props) {
    const navigate = useNavigate();
    return <TemplateGlobalMobile {...props} navigate={navigate} />;
}

class TemplateGlobalMobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPath: window.location.pathname,
            showProfileMenu: false,
            initials: "",
            idEmployee: localStorage.getItem("idEmployee"),
        };
        this.setInitials = this.setInitials.bind(this);
        this.getIdEmployeeLocalStorage =
            this.getIdEmployeeLocalStorage.bind(this);
        this.handleProfileClick = this.handleProfileClick.bind(this);
        this.handleNotificationClick = this.handleNotificationClick.bind(this);
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

    getIdEmployeeLocalStorage() {
        return localStorage.getItem("idEmployee");
    }

    handleProfileClick() {
        const idEmployee = this.getIdEmployeeLocalStorage();
        this.props.navigate("/employee-details", { state: { idEmployee } });
    }

    handleNotificationClick() {
        this.props.navigate("/notifications");
    }

    render() {
        const { initials, currentPath } = this.state;

        let pageTitle;
        switch (currentPath) {
            case "/calendar":
                pageTitle = "Mes évènements";
                break;
            case "/calendar-mobile":
                pageTitle = "Calendrier";
                break;
            case "/clients":
                pageTitle = "Clients";
                break;
            case "/client-details":
                pageTitle = "Détails client";
                break;
            case "/expense":
                pageTitle = "Dépense / Frais";
                break;
            case "/report":
                pageTitle = "Rapport";
                break;
            case "/appointment-form":
                pageTitle = "Rendez-vous";
                break;
            case "/intervention-form":
                pageTitle = "Intervention";
                break;
            case "/notifications":
                pageTitle = "Notifications";
                break;
            default:
                pageTitle = "Page";
        }

        return (
            <>
                {/* Partie header */}
                <div className={styles.headerDiv}>
                    <div className={styles.topLeftHeader}>
                        <a href="/calendar">
                            <img
                                src={logoMobile}
                                alt="Logo"
                                className={styles.logoMobile}
                            />
                            <h1 className={styles.title}>{pageTitle}</h1>
                        </a>
                    </div>
                    <div>
                        <div className={styles.headerRight}>
                            <div
                                className={styles.notificationIcon}
                                onClick={this.handleNotificationClick}
                            >
                                <i className="fa-regular fa-bell"></i>
                                <span
                                    className={styles.notificationCount}
                                ></span>
                            </div>
                            <div
                                className={styles.profileBubble}
                                onClick={this.handleProfileClick}
                            >
                                {initials}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Partie bar navigation bottom */}
                <div className={styles.navbarBottom}>
                    <a href="/calendar">
                        <i className={`fas fa-home ${styles.navbarIcon}`}></i>
                    </a>
                    <a href="/calendar-mobile">
                        <i
                            className={`fas fa-calendar ${styles.navbarIcon}`}
                        ></i>
                    </a>
                    <a href="/expense">
                        <i className={`fas fa-euro ${styles.navbarIcon}`}></i>
                    </a>
                    <a href="/clients">
                        <i
                            className={`fas fa-user-group ${styles.navbarIcon}`}
                        ></i>
                    </a>
                </div>
            </>
        );
    }
}

export default TemplateGlobalMobileWrapper;
