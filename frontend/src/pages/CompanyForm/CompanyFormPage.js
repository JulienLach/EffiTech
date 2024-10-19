import React, { Component } from "react";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./CompanyFormPage.module.css";
import { getCompany, updateCompany } from "../../services/api";

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
                logo: null,
            },
            error: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    componentDidMount() {
        getCompany((error, data) => {
            if (error) {
                this.setState({ error: error.message });
            } else {
                this.setState({ company: data });
            }
        });
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
            this.setState((prevState) => ({
                company: {
                    ...prevState.company,
                    logo: reader.result,
                },
            }));
        };
        reader.readAsDataURL(file);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("Données envoyées :", this.state.company);

        updateCompany(this.state.company, (error, data) => {
            if (error) {
                this.setState({ error: error.message });
            } else {
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
                    <h1 className={styles.pageTitle}>Modifier Société</h1>
                    {error && <p className={styles.error}>{error}</p>}
                    <form onSubmit={this.handleSubmit}>
                        <div className={styles.logoCompany}>
                            <img
                                src={`data:image/jpeg;base64,${company.logo}`}
                                alt="Logo de la société"
                            />
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
