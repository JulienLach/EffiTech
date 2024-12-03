import React, { Component } from "react";
import styles from "./TemplateGlobalMobile.module.css";
import logo from "../../images/logo.svg";
import bellIcon from "../../images/notificationBell.svg";
import logoMobile from "../../images/iconMobile.png";

class TemplateGlobalMobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPath: window.location.pathname,
            showProfileMenu: false,
            initials: "",
        };
        this.setInitials = this.setInitials.bind(this);
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

    render() {
        const { initials } = this.state;

        return (
            <>
                {/* Partie header */}
                <div className={styles.headerDiv}>
                    <div className={styles.topLeftHader}>
                        <img
                            src={logoMobile}
                            alt="Logo"
                            className={styles.logoMobile}
                        />
                        <h1 className={styles.title}>Calendrier</h1>
                    </div>
                    <div>
                        <div className={styles.headerRight}>
                            <div className={styles.notificationIcon}>
                                <img
                                    src={bellIcon}
                                    className={styles.notificationBell}
                                    alt="Notification Bell"
                                />
                                <span className={styles.notificationCount}>
                                    2
                                </span>
                            </div>
                            <div className={styles.profileBubble}>
                                {initials}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Partie bar navigation bottom */}
                <div className={styles.navbarBottom}>
                    <a href="/calendar">
                        <i className={`fas fa-list ${styles.navbarIcon}`}></i>
                    </a>
                    <a href="/calendar">
                        <i
                            className={`fas fa-calendar ${styles.navbarIcon}`}
                        ></i>
                    </a>
                    <a href="/expense">
                        <i className={`fas fa-wallet ${styles.navbarIcon}`}></i>
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

export default TemplateGlobalMobile;
