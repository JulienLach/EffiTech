import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./ClientFormPage.module.css";
import profilPicture from "../../images/profil.png";
import { getClientById, updateClient } from "../../services/api";

// Composant wrapper pour utiliser les hooks
function ClientFormPageWrapper() {
    const navigate = useNavigate();
    const location = useLocation();
    return <ClientFormPage navigate={navigate} location={location} />;
}

class ClientFormPage extends Component {
    constructor(props) {
        super(props);
        const { client } = this.props.location.state;
        this.state = {
            client: client,
            idClient: client.idClient,
            error: null,
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { idClient } = this.state;
        getClientById(idClient, (error, data) => {
            if (error) {
                this.setState({ error: error.message });
            } else {
                this.setState({ client: data });
            }
        });
    }

    handleCancel() {
        this.props.navigate("/clients");
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState((prevState) => {
            if (["address", "city", "zipcode"].includes(name)) {
                return {
                    client: {
                        ...prevState.client,
                        address: {
                            ...prevState.client.address,
                            [name]: value,
                        },
                    },
                };
            } else {
                return {
                    client: {
                        ...prevState.client,
                        [name]: value,
                    },
                };
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { client } = this.state;
        const {
            idClient,
            category,
            firstname,
            lastname,
            email,
            phoneNumber,
            company,
            address,
        } = client;
        const addressDetails = {
            address: address.address,
            city: address.city,
            zipcode: address.zipcode,
        };

        const clientData = {
            idClient,
            category,
            firstname,
            lastname,
            email,
            phoneNumber,
            company,
            addressDetails,
        };

        console.log("Données du formulaire soumises:", clientData);

        updateClient(clientData, (error, data) => {
            if (error) {
                this.setState({ error: error.message });
            } else {
                console.log("Client mis à jour:", data);
                window.history.back();
            }
        });
    }

    render() {
        const { client } = this.state;

        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>Client</h1>
                    <div>
                        <img src={profilPicture} alt="Profil picture" />
                    </div>
                    <div className={styles.separation}></div>
                    <h2>Coordonnées</h2>
                    <form
                        className={styles.formElements}
                        onSubmit={this.handleSubmit}
                    >
                        <div className={styles.labelInput}>
                            <label htmlFor="lastname">Nom:</label>
                            <input
                                type="text"
                                name="lastname"
                                value={client.lastname}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="firstname">Prénom:</label>
                            <input
                                type="text"
                                name="firstname"
                                value={client.firstname}
                                onChange={this.handleChange}
                            />
                        </div>
                        {client.category !== "Particulier" && (
                            <div className={styles.labelInput}>
                                <label htmlFor="company">Entreprise:</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={client.company}
                                    onChange={this.handleChange}
                                />
                            </div>
                        )}
                        <div className={styles.labelInput}>
                            <label htmlFor="phoneNumber">Téléphone:</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={client.phoneNumber}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="address">Adresse:</label>
                            <input
                                type="text"
                                name="address"
                                value={client.address.address}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="zipcode">Code postal:</label>
                            <input
                                type="text"
                                name="zipcode"
                                value={client.address.zipcode}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="city">Ville:</label>
                            <input
                                type="text"
                                name="city"
                                value={client.address.city}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.buttonPosition}>
                            <button
                                type="button"
                                onClick={this.handleCancel}
                                className={styles.cancelButton}
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className={styles.submitButton}
                            >
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

export default ClientFormPageWrapper;
