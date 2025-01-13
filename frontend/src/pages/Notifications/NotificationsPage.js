import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./NotificationsPage.module.css";
import stylesMobile from "./NotificationsPageMobile.module.css";
import TemplateGlobal from "../Template/TemplateGlobal";
import TemplateGlobalMobile from "../Template/TemplateGlobalMobile";

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
            notification: [],
            action: "",
            type: "",
            title: "",
            creationDate: "",
            employee: {},
        };
    }

    render() {
        //Variable pour savoir si c'est mobile ou desktop
        const isMobile = window.navigator.userAgentData;

        return (
            <>
                {isMobile.mobile ? (
                    <>
                        <TemplateGlobalMobile />
                        <div className={stylesMobile.container}>
                            <div className={styles.alignItems}>
                                <h1 className={styles.pageTitle}>
                                    Notifications
                                </h1>
                                <div className={styles.rightPart}>
                                    <button
                                        className={styles.addClient}
                                        onClick={this.openModal}
                                    >
                                        <i className="fa-solid fa-plus"></i>
                                        Ajouter un client
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <TemplateGlobal />
                        <div className={styles.container}>
                            <h1 className={styles.pageTitle}>Notifications</h1>
                            <div>
                                <table>
                                    <thead className={styles.stickyThead}>
                                        <tr>
                                            <th>Employé</th>
                                            <th>Action</th>
                                            <th>Type</th>
                                            <th>Titre</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>[Employee]</td>
                                            <td>[Action]</td>
                                            <td>[Type]</td>
                                            <td>[Titre]</td>
                                        </tr>
                                    </tbody>
                                </table>
                                {/* <div className={styles.pagination}>
                                    <button
                                        onClick={(e) =>
                                            this.handlePreviousPage(e)
                                        }
                                        disabled={currentPage === 1}
                                    >
                                        <i className="fa fa-arrow-left"></i>
                                    </button>
                                    <button
                                        onClick={(e) => this.handleNextPage(e)}
                                        disabled={currentPage === totalPages}
                                    >
                                        <i className="fa fa-arrow-right"></i>
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </>
                )}
            </>
        );
    }
}

export default NotificationsPageWrapper;
