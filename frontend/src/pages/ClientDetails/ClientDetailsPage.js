import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./ClientDetailsPage.module.css";
import profilPicture from "../../images/profil.png";
import { getClientById } from "../../services/api";

// Composant wrapper pour utiliser les hooks
function ClientDetailsPageWrapper() {
    const navigate = useNavigate();
    const location = useLocation();
    return <ClientDetailsPage navigate={navigate} location={location} />;
}

class ClientDetailsPage extends Component {
    constructor(props) {
        super(props);
        const { client } = this.props.location.state;
        this.state = {
            client: client,
            idClient: client.idClient,
        };
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
    }

    getCategoryIndicator(category) {
        const style = {
            padding: "2px 10px",
            borderRadius: "8px",
            color: "white",
            fontSize: "0.8em",
            fontWeight: "500",
        };

        switch (category) {
            case "Professionnel":
                return (
                    <span
                        style={{
                            ...style,
                            backgroundColor: "#C1F0FF",
                            color: "#2C5BA1",
                        }}
                    >
                        Professionnel
                    </span>
                );
            case "Particulier":
                return (
                    <span
                        style={{
                            ...style,
                            backgroundColor: "#FFE4BC",
                            color: "#C35E00",
                        }}
                    >
                        Particulier
                    </span>
                );
        }
    }

    render() {
        const { client, error } = this.state;
        console.log(client);
        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}>
                    {client.category === "Professionnel" ? (
                        <div className={styles.pro}>
                            {/* code pour le professionnel ici */}
                            <div className={styles.profilInfo}>
                                <h1 className={styles.pageTitle}>Client</h1>
                                <div className={styles.profilCompanyBack}>
                                    <img
                                        src={profilPicture}
                                        alt="Profil picture"
                                    />
                                    <p className={styles.company}>
                                        {client.company}
                                    </p>
                                    <button
                                        type="button"
                                        className={styles.backButton}
                                        onClick={() =>
                                            this.props.navigate("/clients")
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
                                        {this.getCategoryIndicator(
                                            client.category
                                        )}
                                    </p>
                                </div>
                                <div className={styles.names}>
                                    <p className={styles.firstnamePro}>
                                        {client.firstname}
                                    </p>
                                    <p className={styles.lastnamePro}>
                                        {client.lastname}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.separation}></div>
                            <h2>Coordonnées</h2>
                            <div className={styles.contactInfo}>
                                <p>
                                    <i class="fa-solid fa-phone"></i>
                                    {client.phoneNumber}
                                </p>
                                <p>
                                    <i class="fa-solid fa-location-dot"></i>
                                    {client.address.address},{" "}
                                    {client.address.zipcode},{" "}
                                    {client.address.city}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.part}>
                            {/* code pour le particulier ici */}
                            <div className={styles.profilInfo}>
                                <h1 className={styles.pageTitle}>Client</h1>
                                <div className={styles.profilNamesBack}>
                                    <img
                                        src={profilPicture}
                                        alt="Profil picture"
                                    />
                                    <div className={styles.nameColumn}>
                                        <p className={styles.lastname}>
                                            {client.lastname}
                                        </p>
                                        <p className={styles.firstname}>
                                            {client.firstname}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className={styles.backButton}
                                        onClick={() =>
                                            this.props.navigate("/clients")
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
                                        {this.getCategoryIndicator(
                                            client.category
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.separation}></div>
                            <h2>Coordonnées</h2>
                            <div className={styles.contactInfo}>
                                <p>
                                    <i class="fa-solid fa-phone"></i>
                                    {client.phoneNumber}
                                </p>
                                <p>
                                    <i class="fa-solid fa-location-dot"></i>
                                    {client.address.address},{" "}
                                    {client.address.zipcode},{" "}
                                    {client.address.city}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* <div className={styles.profilInfo}>
                        <h1>Client</h1>
                        <div className={styles.alignBackButton}>
                            <img src={profilPicture} alt="Profil picture" />
                            <div className={styles.names}>
                                <p className={styles.company}>
                                    {client.company}
                                </p>
                                <p className={styles.lastname}>
                                    {client.lastname}
                                </p>
                                <p className={styles.firstname}>
                                    {client.firstname}
                                </p>
                            </div>
                            <div className={styles.idAndCategory}>
                                <p className={styles.id}>C-{client.idClient}</p>
                                <p>
                                    {this.getCategoryIndicator(client.category)}
                                    <a
                                        type="button"
                                        className={styles.backButton}
                                        onClick={() =>
                                            this.props.navigate("/clients")
                                        }
                                    >
                                        <i className="fa-solid fa-arrow-right"></i>
                                        Retour
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.separation}></div>
                    <h2>Coordonnées</h2>
                    <div className={styles.contactInfo}>
                        <p>{client.phoneNumber}</p>
                        <p>
                            {client.address.address}, {client.address.zipcode},{" "}
                            {client.address.city}
                        </p>
                    </div> */}
                </div>
            </>
        );
    }
}

export default ClientDetailsPageWrapper;
