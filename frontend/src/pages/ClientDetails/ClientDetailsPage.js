import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import TemplateGlobalMobile from "../Template/TemplateGlobalMobile";
import styles from "./ClientDetailsPage.module.css";
import stylesMobile from "./ClientDetailsPageMobile.module.css";
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
    }

    handleButtonClick = () => {
        this.props.navigate("/client-form", {
            state: { client: this.state.client },
        });
    };

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
        const { client } = this.state;
        console.log(client);

        //Variable pour savoir si c'est mobile ou desktop
        const isMobile = window.navigator.userAgentData;

        // Initials for the client's profile picture
        const initial =
            client.category === "Professionnel"
                ? client.company.charAt(0).toUpperCase() +
                  client.company.charAt(1).toUpperCase()
                : client.lastname.charAt(0).toUpperCase() +
                  client.firstname.charAt(0).toUpperCase();

        return (
            <>
                {isMobile.mobile ? (
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
                                        {" "}
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
                                        <p>{client.phoneNumber}</p>
                                        <h3>Adresse mail</h3>
                                        <p>{client.email}</p>
                                    </div>
                                    <div className={stylesMobile.addressCard}>
                                        <h3>Adresse</h3>
                                        <p>{client.address.address}</p>
                                        <h3>Code postal</h3>
                                        <p>{client.address.zipcode}</p>
                                        <h3>Ville</h3>
                                        <p>{client.address.city}</p>
                                    </div>
                                    <div className={stylesMobile.mapCard}>
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1295.9371259602922!2d0.1083643145593688!3d49.48688229569379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sfr!4v1733324124820!5m2!1sfr!2sfr"
                                            width="100%"
                                            height="300"
                                            style={{ border: 0 }}
                                            allowfullscreen=""
                                            loading="lazy"
                                            referrerpolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div
                                        className={stylesMobile.infoClientCard}
                                    >
                                        {" "}
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
                                        <p>{client.phoneNumber}</p>
                                        <h3>Adresse mail</h3>
                                        <p>{client.email}</p>
                                    </div>
                                    <div className={stylesMobile.addressCard}>
                                        <h3>Adresse</h3>
                                        <p>{client.address.address}</p>
                                        <h3>Code postal</h3>
                                        <p>{client.address.zipcode}</p>
                                        <h3>Ville</h3>
                                        <p>{client.address.city}</p>
                                    </div>
                                    <div className={stylesMobile.mapCard}>
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1295.9371259602922!2d0.1083643145593688!3d49.48688229569379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sfr!4v1733324124820!5m2!1sfr!2sfr"
                                            width="100%"
                                            height="300"
                                            style={{ border: 0 }}
                                            allowfullscreen=""
                                            loading="lazy"
                                            referrerpolicy="no-referrer-when-downgrade"
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
                                    {/* code pour le professionnel ici */}
                                    <div className={styles.profilInfo}>
                                        <h1 className={styles.pageTitle}>
                                            Client
                                        </h1>
                                        <div
                                            className={styles.profilCompanyBack}
                                        >
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
                                                {this.getCategoryIndicator(
                                                    client.category
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={styles.separation}></div>
                                    <h2>Coordonnées</h2>
                                    <div className={styles.contactInfo}>
                                        <p className={styles.firstnamePro}>
                                            Contact client : {client.firstname}{" "}
                                            {client.lastname}
                                        </p>
                                        <p>Téléphone : {client.phoneNumber}</p>
                                        <p>
                                            Adresse : {client.address.address},{" "}
                                            {client.address.zipcode},{" "}
                                            {client.address.city}
                                        </p>
                                        <p>Mail : {client.email}</p>
                                    </div>
                                    <button
                                        className={styles.editButton}
                                        onClick={this.handleButtonClick}
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                        Modifier
                                    </button>
                                </div>
                            ) : (
                                <div className={styles.part}>
                                    {/* code pour le particulier ici */}
                                    <div className={styles.profilInfo}>
                                        <h1 className={styles.pageTitle}>
                                            Client
                                        </h1>
                                        <div className={styles.profilNamesBack}>
                                            <img
                                                src={profilPicture}
                                                alt="Profil picture"
                                            />
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
                                                {this.getCategoryIndicator(
                                                    client.category
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={styles.separation}></div>
                                    <h2>Coordonnées</h2>
                                    <div className={styles.contactInfo}>
                                        <p>Téléphone : {client.phoneNumber}</p>
                                        <p>
                                            Adresse : {client.address.address},{" "}
                                            {client.address.zipcode},{" "}
                                            {client.address.city}
                                        </p>
                                        <p>
                                            <p>Mail : {client.email}</p>
                                        </p>
                                    </div>
                                    <button
                                        className={styles.editButton}
                                        onClick={this.handleButtonClick}
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                        Modifier
                                    </button>
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
