import React, { Component } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./CompanyDetails.module.css";
import { updateCompany } from "../../services/api";

// Composant fonctionnel wrapper
const CompanyDetailsWrapper = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return <CompanyDetails navigate={navigate} location={location} />;
};

class CompanyDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: props.location.state.company || {},
            error: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            company: {
                ...prevState.company,
                idAddress: {
                    ...prevState.company.idAddress,
                    [name]: value,
                },
                [name]: value,
            },
        }));
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
        updateCompany(this.state.company, (error, data) => {
            if (error) {
                this.setState({ error: error.message });
            } else {
                this.props.navigate(`/company`);
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
                                    name="address"
                                    value={company.idAddress.address}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label>
                                Code Postal :
                                <input
                                    type="text"
                                    name="zipcode"
                                    value={company.idAddress.zipcode}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label>
                                Ville :
                                <input
                                    type="text"
                                    name="city"
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

export default CompanyDetailsWrapper;
