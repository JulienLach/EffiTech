import React, { Component } from "react";
import { isMobile } from "react-device-detect";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./NotificationsPage.module.css";
import stylesMobile from "./NotificationsPageMobile.module.css";
import TemplateGlobal from "../Template/TemplateGlobal";
import TemplateGlobalMobile from "../Template/TemplateGlobalMobile";
import { getAllNotifications } from "../../services/api";

// Composant wrapper pour utiliser les hooks
function NotificationsPageWrapper() {
    const navigate = useNavigate();
    const location = useLocation();
    return <NotificationsPage navigate={navigate} location={location} />;
}

class NotificationsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            currentPage: 1,
            notificationsPerPage: 12,
        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePreviousPage = this.handlePreviousPage.bind(this);
    }

    componentDidMount() {
        getAllNotifications((error, data) => {
            if (error) {
                this.setState({ error: error.message });
            } else {
                this.setState({ notifications: data });
            }
            console.log(data);
        });
    }

    handlePageChange(event, pageNumber) {
        event.preventDefault();
        this.setState({ currentPage: pageNumber });
    }

    handleNextPage(event) {
        event.preventDefault();
        this.setState((prevState) => ({
            currentPage: Math.min(
                prevState.currentPage + 1,
                Math.ceil(
                    prevState.notifications.length /
                        prevState.notificationsPerPage
                )
            ),
        }));
    }

    handlePreviousPage(event) {
        event.preventDefault();
        this.setState((prevState) => ({
            currentPage: Math.max(prevState.currentPage - 1, 1),
        }));
    }

    formatDate(date) {
        const creationDate = new Date(date);
        return creationDate.toLocaleDateString("fr-FR");
    }

    getActionIndicator(action) {
        const style = {
            padding: "2px 10px",
            borderRadius: "8px",
            color: "white",
            fontSize: "0.9em",
            fontWeight: "500",
        };

        switch (action) {
            case "Enregistrement":
                return (
                    <span
                        style={{
                            ...style,
                            backgroundColor: "#D3F4FF",
                            color: "#2C5BA1",
                        }}
                    >
                        Enregistrement
                    </span>
                );
            case "Suppression":
                return (
                    <span
                        style={{
                            ...style,
                            backgroundColor: "#FFDEDE",
                            color: "#923838",
                        }}
                    >
                        Suppression
                    </span>
                );
            case "Modification":
                return (
                    <span
                        style={{
                            ...style,
                            backgroundColor: "#FFECCF",
                            color: "#C35E00",
                        }}
                    >
                        Modification
                    </span>
                );
            case "Validation":
                return (
                    <span
                        style={{
                            ...style,
                            backgroundColor: "#DCFFD6",
                            color: "#48903C",
                        }}
                    >
                        Validation
                    </span>
                );
            default:
                return null;
        }
    }

    render() {
        const { notifications, currentPage, notificationsPerPage } = this.state;
        const { navigate } = this.props;

        // Calculer les notifications à afficher pour la page actuelle
        const indexOfLastNotification = currentPage * notificationsPerPage;
        const indexOfFirstNotification =
            indexOfLastNotification - notificationsPerPage;
        const currentNotifications = notifications.slice(
            indexOfFirstNotification,
            indexOfLastNotification
        );

        // Calculer le nombre total de pages
        const totalPages = Math.ceil(
            notifications.length / notificationsPerPage
        );

        return (
            <>
                {isMobile ? (
                    <>
                        <TemplateGlobalMobile />
                        <div className={stylesMobile.container}>
                            <button
                                className={stylesMobile.backButton}
                                type="button"
                                onClick={() => navigate(-1)}
                            >
                                <i className="fa fa-arrow-left"></i> Retour
                            </button>
                            {currentNotifications.map((notification) => (
                                <div
                                    key={notification.idNotification}
                                    className={stylesMobile.notificationCard}
                                >
                                    <div
                                        className={
                                            stylesMobile.notificationHeader
                                        }
                                    >
                                        <span
                                            className={
                                                stylesMobile.notificationTitle
                                            }
                                        >
                                            {notification.title}
                                        </span>
                                        <span
                                            className={
                                                stylesMobile.notificationDate
                                            }
                                        >
                                            {this.formatDate(
                                                notification.creationDate
                                            )}
                                            <p>{notification.creationHour}</p>
                                        </span>
                                    </div>
                                    <div
                                        className={
                                            stylesMobile.notificationBody
                                        }
                                    >
                                        <p>
                                            {this.getActionIndicator(
                                                notification.action
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div className={stylesMobile.pagination}>
                                <button
                                    onClick={(e) => this.handlePreviousPage(e)}
                                    disabled={currentPage === 1}
                                >
                                    <i className="fa-solid fa-chevron-left"></i>
                                </button>
                                <button
                                    onClick={(e) => this.handleNextPage(e)}
                                    disabled={currentPage === totalPages}
                                >
                                    <i className="fa-solid fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <TemplateGlobal />
                        <div className={styles.container}>
                            <h1 className={styles.pageTitle}>Notifications</h1>
                            <div className={styles.divider}></div>
                            <div>
                                <table>
                                    <thead className={styles.stickyThead}>
                                        <tr>
                                            <th>Employé</th>
                                            <th>Action</th>
                                            <th>Type</th>
                                            <th>Titre</th>
                                            <th>Date</th>
                                            <th>Heure</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentNotifications.map(
                                            (notification) => (
                                                <tr
                                                    key={
                                                        notification.idNotification
                                                    }
                                                >
                                                    <td>
                                                        {notification.firstName}{" "}
                                                        {notification.lastName}
                                                    </td>
                                                    <td>
                                                        {this.getActionIndicator(
                                                            notification.action
                                                        )}
                                                    </td>
                                                    <td>{notification.type}</td>
                                                    <td>
                                                        <a>
                                                            {notification.title}
                                                        </a>
                                                    </td>
                                                    <td>
                                                        {this.formatDate(
                                                            notification.creationDate
                                                        )}
                                                    </td>
                                                    <td>
                                                        {
                                                            notification.creationHour
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                                <div className={styles.pagination}>
                                    <button
                                        onClick={(e) =>
                                            this.handlePreviousPage(e)
                                        }
                                        disabled={currentPage === 1}
                                    >
                                        <i className="fa-solid fa-chevron-left"></i>
                                    </button>
                                    <button
                                        onClick={(e) => this.handleNextPage(e)}
                                        disabled={currentPage === totalPages}
                                    >
                                        <i className="fa-solid fa-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </>
        );
    }
}

export default NotificationsPageWrapper;
