import React, { Component } from "react";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./CompanyFormPage.module.css";
import { createCompany } from "../../services/api";

class CompanyFormPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: {
                phoneNumber: "",
                idAddress: {
                    address: "",
                    zipcode: "",
                    city: "",
                },
                siret: "",
                vatNumber: "",
                capital: "",
                logo: "",
            },
            error: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const keys = name.split(".");
        if (keys.length > 1) {
            this.setState((prevState) => ({
                company: {
                    ...prevState.company,
                    [keys[0]]: {
                        ...prevState.company[keys[0]],
                        [keys[1]]: value,
                    },
                },
            }));
        } else {
            this.setState((prevState) => ({
                company: {
                    ...prevState.company,
                    [name]: value,
                },
            }));
        }
    }

    handleFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(",")[1]; // Extraire la partie base64
            this.setState((prevState) => ({
                company: {
                    ...prevState.company,
                    logo: base64String,
                },
            }));
        };
        reader.readAsDataURL(file);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("Données envoyées :", this.state.company);

        createCompany(this.state.company, (error, data) => {
            if (error) {
                console.error(
                    "Erreur lors de la création de la société :",
                    error
                );
                this.setState({ error: error.message });
            } else {
                console.log("Société créée :", data);
                window.location.href = "/company";
            }
        });
    }

    render() {
        const { company, error } = this.state;

        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>Créer Société</h1>
                    {error && <p className={styles.error}>{error}</p>}
                    <form onSubmit={this.handleSubmit}>
                        <div className={styles.profilPic}>
                            {company.logo && (
                                <img
                                    src={`data:image/jpeg;base64,${company.logo}`}
                                    alt="Logo de la société"
                                />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={this.handleFileChange}
                            />
                        </div>
                        <div className={styles.separation}></div>
                        <h2 className={styles.header}>Coordonnées</h2>
                        <div className={styles.labelInput}>
                            <label htmlFor="phoneNumber">Téléphone :</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={company.phoneNumber}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="idAddress.address">Adresse :</label>
                            <input
                                type="text"
                                name="idAddress.address"
                                value={company.idAddress.address}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="idAddress.zipcode">
                                Code Postal :
                            </label>
                            <input
                                type="text"
                                name="idAddress.zipcode"
                                value={company.idAddress.zipcode}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="idAddress.city">Ville :</label>
                            <input
                                type="text"
                                name="idAddress.city"
                                value={company.idAddress.city}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.separation}></div>
                        <h2 className={styles.header}>Informations</h2>
                        <div className={styles.labelInput}>
                            <label htmlFor="siret">SIRET :</label>
                            <input
                                type="text"
                                name="siret"
                                value={company.siret}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="vatNumber">
                                N°TVA Intracommunautaire :
                            </label>
                            <input
                                type="text"
                                name="vatNumber"
                                value={company.vatNumber}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="capital">Capital :</label>
                            <input
                                type="text"
                                name="capital"
                                value={company.capital}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.buttonPosition}>
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className={styles.cancelButton}
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className={styles.submitButton}
                            >
                                <i className="fa-solid fa-floppy-disk"></i>{" "}
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

export default CompanyFormPage;
