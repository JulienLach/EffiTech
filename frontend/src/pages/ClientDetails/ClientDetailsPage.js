import React, { Component } from "react";
import { isMobile } from "react-device-detect";
import { useLocation, useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import TemplateGlobalMobile from "../Template/TemplateGlobalMobile";
import styles from "./ClientDetailsPage.module.css";
import stylesMobile from "./ClientDetailsPageMobile.module.css";
import { getClientById, getEventsByClientId } from "../../services/api";
import getStatusIndicator from "../../components/Utils/StatusUtils";
import getCategoryIndicator from "../../components/Utils/CategoryUtils";

function ClientDetailsPageWrapper() {
    const navigate = useNavigate();
    const location = useLocation();
    return <ClientDetailsPage navigate={navigate} location={location} />;
}

class ClientDetailsPage extends Component {
    constructor(props) {
        super(props);
        const { client, idClient } = this.props.location.state;
        this.state = {
            client: client,
            idClient: idClient || (client ? client.idClient : null), // idClient envoyé à partir de calendar ou objet client complet à partir de clients page
            activeTab: "coordonnées",
            events: [],
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    componentDidMount() {
        const { idClient } = this.state;
        getClientById(idClient, (error, data) => {
            if (error) {
                console.error(
                    "Erreur lors de la récupération du client",
                    error
                );
                this.setState({ error: error.message });
            } else {
                this.setState({ client: data });
                console.log("Données du client récupérées:", data);
            }
        });

        getEventsByClientId(idClient, (error, data) => {
            if (error) {
                console.error(
                    "Erreur lors de la récupération des événements",
                    error
                );
                this.setState({ error: error.message });
            } else {
                this.setState({ events: data });
                console.log("Données des événements récupérées:", data);
            }
        });
    }

    handleButtonClick = () => {
        this.props.navigate("/client-form", {
            state: { client: this.state.client },
        });
    };

    handleTabClick = (tab) => {
        this.setState({ activeTab: tab });
    };

    render() {
        const { client, activeTab, events } = this.state;
        if (!client) return <div></div>; // pour charger l'idClient avant de récupérer les données, corriger la logique d'ordre de récupération des données

        const initial =
            client.category === "Professionnel"
                ? client.company.charAt(0).toUpperCase() +
                  client.company.charAt(1).toUpperCase()
                : client.lastname.charAt(0).toUpperCase() +
                  client.firstname.charAt(0).toUpperCase();

        const clientAddress = `${client.address.address}, ${client.address.zipcode} ${client.address.city}`;
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            clientAddress
        )}`;

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
                                        (window.location.href = "/clients")
                                    }
                                >
                                    <i className="fa-solid fa-arrow-left"></i>
                                    Retour
                                </button>
                            </div>
                            {client.category === "Professionnel" ? (
                                <>
                                    <div
                                        className={stylesMobile.infoClientCard}
                                    >
                                        <div
                                            className={
                                                stylesMobile.profilInitial
                                            }
                                        >
                                            {initial}
                                        </div>
                                        <h3>Société</h3>
                                        <p>{client.company}</p>
                                        <h3>Contact</h3>
                                        <p>
                                            {client.firstname} {client.lastname}
                                        </p>
                                        <h3>Téléphone</h3>
                                        <p>
                                            <a
                                                href={`tel:${client.phoneNumber}`}
                                            >
                                                {client.phoneNumber}
                                            </a>
                                        </p>
                                        <h3>Adresse mail</h3>
                                        <p>
                                            Mail :{" "}
                                            <a href={`mailto:${client.email}`}>
                                                {client.email}
                                            </a>
                                        </p>
                                    </div>
                                    <div className={stylesMobile.addressCard}>
                                        <h3>Adresse</h3>
                                        <p>{client.address.address}</p>
                                        <h3>Code postal</h3>
                                        <p>{client.address.zipcode}</p>
                                        <h3>Ville</h3>
                                        <p>{client.address.city}</p>
                                    </div>
                                    <p>
                                        <a
                                            href={googleMapsUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={
                                                stylesMobile.openMapsLink
                                            }
                                        >
                                            <i className="fa-solid fa-location-dot"></i>
                                            Voir sur Google Maps
                                        </a>
                                    </p>
                                    <div className={stylesMobile.mapCard}>
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1295.9371259602922!2d0.1083643145593688!3d49.48688229569379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sfr!4v1733324124820!5m2!1sfr!2sfr"
                                            width="100%"
                                            height="300"
                                            style={{ border: 0 }}
                                            allowfullscreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div
                                        className={stylesMobile.infoClientCard}
                                    >
                                        <div
                                            className={
                                                stylesMobile.profilInitial
                                            }
                                        >
                                            {initial}
                                        </div>
                                        <h3>Nom</h3>
                                        <p>{client.lastname}</p>
                                        <h3>Prénom</h3>
                                        <p>{client.firstname}</p>
                                        <h3>Téléphone</h3>
                                        <p>
                                            <a
                                                href={`tel:${client.phoneNumber}`}
                                            >
                                                {client.phoneNumber}
                                            </a>
                                        </p>
                                        <h3>Adresse mail</h3>
                                        <p>
                                            Mail :{" "}
                                            <a href={`mailto:${client.email}`}>
                                                {client.email}
                                            </a>
                                        </p>
                                    </div>
                                    <div className={stylesMobile.addressCard}>
                                        <h3>Adresse</h3>
                                        <p>{client.address.address}</p>
                                        <h3>Code postal</h3>
                                        <p>{client.address.zipcode}</p>
                                        <h3>Ville</h3>
                                        <p>{client.address.city}</p>
                                    </div>
                                    <p>
                                        <a
                                            href={googleMapsUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={
                                                stylesMobile.openMapsLink
                                            }
                                        >
                                            <i className="fa-solid fa-location-dot"></i>
                                            Voir sur Google Maps
                                        </a>
                                    </p>
                                    <div className={stylesMobile.mapCard}>
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1295.9371259602922!2d0.1083643145593688!3d49.48688229569379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sfr!4v1733324124820!5m2!1sfr!2sfr"
                                            width="100%"
                                            height="300"
                                            style={{ border: 0 }}
                                            allowfullscreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <TemplateGlobal />
                        <div className={styles.container}>
                            {client.category === "Professionnel" ? (
                                <div className={styles.pro}>
                                    <div className={styles.profilInfo}>
                                        <h1 className={styles.pageTitle}>
                                            Détails client
                                        </h1>
                                        <div
                                            className={styles.profilCompanyBack}
                                        >
                                            <div className={styles.iconWrapper}>
                                                <i className="fa-solid fa-landmark"></i>
                                            </div>
                                            <p className={styles.company}>
                                                {client.company}
                                            </p>
                                            <button
                                                type="button"
                                                className={styles.backButton}
                                                onClick={() =>
                                                    this.props.navigate(
                                                        "/clients"
                                                    )
                                                }
                                            >
                                                <i className="fa-solid fa-arrow-right"></i>
                                                Retour
                                            </button>
                                        </div>
                                        <div className={styles.idAndCategory}>
                                            <p className={styles.id}>
                                                C-{client.idClient}
                                            </p>
                                            <p>
                                                {getCategoryIndicator(
                                                    client.category
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={styles.separation}></div>
                                    <div className={styles.tabContainer}>
                                        <button
                                            className={`${styles.tabButton} ${
                                                activeTab === "coordonnées"
                                                    ? styles.activeTab
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                this.handleTabClick(
                                                    "coordonnées"
                                                )
                                            }
                                        >
                                            Coordonnées
                                        </button>
                                        <button
                                            className={`${styles.tabButton} ${
                                                activeTab === "interventions"
                                                    ? styles.activeTab
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                this.handleTabClick(
                                                    "interventions"
                                                )
                                            }
                                        >
                                            Interventions
                                        </button>
                                        <button
                                            className={`${styles.tabButton} ${
                                                activeTab === "Factures"
                                                    ? styles.activeTab
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                this.handleTabClick("Factures")
                                            }
                                        >
                                            Factures
                                        </button>
                                    </div>
                                    {activeTab === "coordonnées" ? (
                                        <>
                                            <div className={styles.contactInfo}>
                                                <p
                                                    className={
                                                        styles.firstnamePro
                                                    }
                                                >
                                                    <span
                                                        className={
                                                            styles.clientLabel
                                                        }
                                                    >
                                                        Contact client :
                                                    </span>{" "}
                                                    {client.firstname}{" "}
                                                    {client.lastname}
                                                </p>
                                                <p>
                                                    <span
                                                        className={
                                                            styles.clientLabel
                                                        }
                                                    >
                                                        Téléphone :{" "}
                                                    </span>
                                                    <a
                                                        href={`tel:${client.phoneNumber}`}
                                                    >
                                                        {client.phoneNumber}
                                                    </a>
                                                </p>
                                                <p>
                                                    {" "}
                                                    <span
                                                        className={
                                                            styles.clientLabel
                                                        }
                                                    >
                                                        Adresse :
                                                    </span>{" "}
                                                    {clientAddress}
                                                </p>
                                                <p>
                                                    <a
                                                        href={googleMapsUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className={
                                                            styles.openMapsLink
                                                        }
                                                    >
                                                        <i className="fa-solid fa-location-dot"></i>
                                                        Voir sur Google Maps
                                                    </a>
                                                </p>
                                                <p>
                                                    <span
                                                        className={
                                                            styles.clientLabel
                                                        }
                                                    >
                                                        Mail :
                                                    </span>{" "}
                                                    <a
                                                        href={`mailto:${client.email}`}
                                                    >
                                                        {client.email}
                                                    </a>
                                                </p>
                                            </div>
                                            <button
                                                className={styles.editButton}
                                                onClick={this.handleButtonClick}
                                            >
                                                <i className="fa-solid fa-pen"></i>
                                                Modifier
                                            </button>
                                        </>
                                    ) : activeTab === "interventions" ? (
                                        <>
                                            <div
                                                className={
                                                    styles.interventionsTable
                                                }
                                            >
                                                <div
                                                    className={styles.divider}
                                                ></div>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Référence</th>
                                                            <th>Type</th>
                                                            <th>Titre</th>
                                                            <th>Statut</th>
                                                            <th>Date</th>
                                                            <th>Employé</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {events &&
                                                            events.map(
                                                                (event) => (
                                                                    <tr
                                                                        key={
                                                                            event.idEvent
                                                                        }
                                                                    >
                                                                        <td>
                                                                            {(() => {
                                                                                if (
                                                                                    event.type ===
                                                                                    "Intervention"
                                                                                ) {
                                                                                    return "INT-";
                                                                                } else {
                                                                                    return "RDV-";
                                                                                }
                                                                            })()}
                                                                            {
                                                                                event.idEvent
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                event.type
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                event.title
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {getStatusIndicator(
                                                                                event.status
                                                                            )}
                                                                        </td>
                                                                        <td>
                                                                            {event.startingDate
                                                                                ? new Date(
                                                                                      event.startingDate
                                                                                  ).toLocaleDateString()
                                                                                : ""}
                                                                        </td>
                                                                        <td>{`${event.employee.firstname} ${event.employee.lastname}`}</td>
                                                                    </tr>
                                                                )
                                                            )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div
                                                className={
                                                    styles.interventionsTable
                                                }
                                            >
                                                <div
                                                    className={styles.divider}
                                                ></div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className={styles.part}>
                                    <div className={styles.profilInfo}>
                                        <h1 className={styles.pageTitle}>
                                            Détails client
                                        </h1>
                                        <div className={styles.profilNamesBack}>
                                            <div className={styles.iconWrapper}>
                                                <i className="fa-solid fa-user"></i>
                                            </div>
                                            <div className={styles.nameColumn}>
                                                <p className={styles.lastname}>
                                                    {client.lastname}{" "}
                                                    {client.firstname}
                                                </p>{" "}
                                            </div>
                                            <button
                                                type="button"
                                                className={styles.backButton}
                                                onClick={() =>
                                                    this.props.navigate(
                                                        "/clients"
                                                    )
                                                }
                                            >
                                                <i className="fa-solid fa-arrow-right"></i>
                                                Retour
                                            </button>
                                        </div>
                                        <div className={styles.idAndCategory}>
                                            <p className={styles.id}>
                                                C-{client.idClient}
                                            </p>
                                            <p>
                                                {getCategoryIndicator(
                                                    client.category
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={styles.separation}></div>
                                    <div className={styles.tabContainer}>
                                        <button
                                            className={`${styles.tabButton} ${
                                                activeTab === "coordonnées"
                                                    ? styles.activeTab
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                this.handleTabClick(
                                                    "coordonnées"
                                                )
                                            }
                                        >
                                            Coordonnées
                                        </button>
                                        <button
                                            className={`${styles.tabButton} ${
                                                activeTab === "interventions"
                                                    ? styles.activeTab
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                this.handleTabClick(
                                                    "interventions"
                                                )
                                            }
                                        >
                                            Interventions
                                        </button>
                                        <button
                                            className={`${styles.tabButton} ${
                                                activeTab === "Factures"
                                                    ? styles.activeTab
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                this.handleTabClick("Factures")
                                            }
                                        >
                                            Factures
                                        </button>
                                    </div>
                                    {activeTab === "coordonnées" ? (
                                        <>
                                            <div className={styles.contactInfo}>
                                                <p>
                                                    <span
                                                        className={
                                                            styles.clientLabel
                                                        }
                                                    >
                                                        Téléphone :
                                                    </span>{" "}
                                                    <a
                                                        href={`tel:${client.phoneNumber}`}
                                                    >
                                                        {client.phoneNumber}
                                                    </a>
                                                </p>
                                                <p>
                                                    <span
                                                        className={
                                                            styles.clientLabel
                                                        }
                                                    >
                                                        Adresse :
                                                    </span>{" "}
                                                    {clientAddress}
                                                </p>
                                                <p>
                                                    <a
                                                        href={googleMapsUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className={
                                                            styles.openMapsLink
                                                        }
                                                    >
                                                        <i className="fa-solid fa-location-dot"></i>
                                                        Voir sur Google Maps
                                                    </a>
                                                </p>
                                                <p>
                                                    <span
                                                        className={
                                                            styles.clientLabel
                                                        }
                                                    >
                                                        Mail :
                                                    </span>{" "}
                                                    <a
                                                        href={`mailto:${client.email}`}
                                                    >
                                                        {client.email}
                                                    </a>
                                                </p>
                                            </div>
                                            <button
                                                className={styles.editButton}
                                                onClick={this.handleButtonClick}
                                            >
                                                <i className="fa-solid fa-pen"></i>
                                                Modifier
                                            </button>
                                        </>
                                    ) : activeTab === "interventions" ? (
                                        <>
                                            <div
                                                className={
                                                    styles.interventionsTable
                                                }
                                            >
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Référence</th>
                                                            <th>Type</th>
                                                            <th>Titre</th>
                                                            <th>Statut</th>
                                                            <th>Date</th>
                                                            <th>Employé</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {events &&
                                                            events.map(
                                                                (event) => (
                                                                    <tr
                                                                        key={
                                                                            event.idEvent
                                                                        }
                                                                    >
                                                                        <td>
                                                                            {(() => {
                                                                                if (
                                                                                    event.type ===
                                                                                    "Intervention"
                                                                                ) {
                                                                                    return "INT-";
                                                                                } else {
                                                                                    return "RDV-";
                                                                                }
                                                                            })()}
                                                                            {
                                                                                event.idEvent
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                event.type
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                event.title
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {getStatusIndicator(
                                                                                event.status
                                                                            )}
                                                                        </td>
                                                                        <td>
                                                                            {event.startingDate
                                                                                ? new Date(
                                                                                      event.startingDate
                                                                                  ).toLocaleDateString()
                                                                                : ""}
                                                                        </td>
                                                                        <td>{`${event.employee.firstname} ${event.employee.lastname}`}</td>
                                                                    </tr>
                                                                )
                                                            )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div
                                                className={
                                                    styles.interventionsTable
                                                }
                                            >
                                                <div
                                                    className={styles.divider}
                                                ></div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </>
        );
    }
}

export default ClientDetailsPageWrapper;
