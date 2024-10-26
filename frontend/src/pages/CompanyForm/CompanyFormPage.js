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
                        <div className={styles.logoCompany}>
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
                        <div className={styles.separator}></div>
                        <div className={styles.companyData}>
                            <h3>Coordonnées</h3>
                            <label>
                                Téléphone :
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={company.phoneNumber}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label>
                                Adresse :
                                <input
                                    type="text"
                                    name="idAddress.address"
                                    value={company.idAddress.address}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label>
                                Code Postal :
                                <input
                                    type="text"
                                    name="idAddress.zipcode"
                                    value={company.idAddress.zipcode}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label>
                                Ville :
                                <input
                                    type="text"
                                    name="idAddress.city"
                                    value={company.idAddress.city}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>
                        <div className={styles.separator}></div>
                        <div className={styles.companyData}>
                            <h3>Informations</h3>
                            <label>
                                SIRET :
                                <input
                                    type="text"
                                    name="siret"
                                    value={company.siret}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label>
                                N°TVA Intracommunautaire :
                                <input
                                    type="text"
                                    name="vatNumber"
                                    value={company.vatNumber}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label>
                                Capital :
                                <input
                                    type="text"
                                    name="capital"
                                    value={company.capital}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>
                        <button type="submit" className={styles.saveButton}>
                            <i className="fa-solid fa-save"></i> Enregistrer
                        </button>
                    </form>
                </div>
            </>
        );
    }
}

export default CompanyFormPage;
