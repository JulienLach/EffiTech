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
        };
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
        const { notifications } = this.state;

        return (
            <>
                {isMobile ? (
                    <>
                        <TemplateGlobalMobile />
                        <div className={stylesMobile.container}>
                            <div className={styles.alignItems}>
                                <h1 className={styles.pageTitle}>
                                    Notifications
                                </h1>
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
                                        {notifications.map((notification) => (
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
                                                <td>{notification.title}</td>
                                                <td>
                                                    {this.formatDate(
                                                        notification.creationDate
                                                    )}
                                                </td>
                                                <td>
                                                    {notification.creationHour}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </>
        );
    }
}

export default NotificationsPageWrapper;
