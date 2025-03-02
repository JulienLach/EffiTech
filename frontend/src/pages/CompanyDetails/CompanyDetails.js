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
            company: {
                ...props.location.state.company,
                idAddress: {
                    address: "",
                    zipcode: "",
                    city: "",
                    ...props.location.state.company?.idAddress,
                },
            },
            errors: {},
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
                [name]: value,
                idAddress: {
                    ...prevState.company.idAddress,
                    [name]: value,
                },
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
        const { company } = this.state;
        const errors = {};

        if (!company.idAddress.address) {
            errors.address = "* Champ obligatoire";
        } else if (!/^[a-zA-ZÀ-ÿ\d\s]+$/.test(company.idAddress.address)) {
            errors.address =
                "* Ne doit contenir que des lettres, des chiffres et des espaces";
        }
        if (!company.idAddress.zipcode) {
            errors.zipcode = "* Champ obligatoire";
        } else if (!/^\d{5}$/.test(company.idAddress.zipcode)) {
            errors.zipcode = "* Doit contenir exactement 5 chiffres";
        }
        if (!company.idAddress.city) {
            errors.city = "* Champ obligatoire";
        } else if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(company.idAddress.city)) {
            errors.city =
                "* Ne doit contenir que des lettres, des espaces et des tirets";
        }
        if (!company.name) {
            errors.name = "* Champ obligatoire";
        } else if (!/^[a-zA-ZÀ-ÿ\d\s]+$/.test(company.name)) {
            errors.name =
                "* Ne doit contenir que des lettres, des chiffres et des espaces";
        }
        if (!company.phoneNumber) {
            errors.phoneNumber = "* Champ obligatoire";
        } else if (!/^[\d\s]+$/.test(company.phoneNumber)) {
            errors.phoneNumber =
                "* Ne doit contenir que des chiffres et des espaces";
        }
        if (!company.siret) {
            errors.siret = "* Champ obligatoire";
        } else if (!/^[\d\s]+$/.test(company.siret)) {
            errors.siret = "* Ne doit contenir que des chiffres et des espaces";
        }
        if (!company.vatNumber) {
            errors.vatNumber = "* Champ obligatoire";
        } else if (!/^[a-zA-Z\d\s]+$/.test(company.vatNumber)) {
            errors.vatNumber =
                "* Ne doit contenir que des lettres, des chiffres et des espaces";
        }
        if (!company.capital) {
            errors.capital = "* Champ obligatoire";
        } else if (!/^\d+$/.test(company.capital)) {
            errors.capital = "* Ne doit contenir que des chiffres";
        }
        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }

        updateCompany(this.state.company, (error) => {
            if (error) {
                this.setState({ error: error.message });
            } else {
                this.props.navigate(`/company`);
            }
        });

        updateCompany(this.state.company, (error) => {
            if (error) {
                this.setState({ error: error.message });
            } else {
                this.props.navigate(`/company`);
            }
        });
    }

    render() {
        const { company, errors } = this.state;

        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>Modifier Société</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className={styles.logoCompany}>
                            <img
                                src={`data:image/jpeg;base64,${company.logo}`}
                                alt="Logo de la société"
                            />
                            <div className={styles.fileInputContainer}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={this.handleFileChange}
                                    className={styles.fileInput}
                                    id="fileInput"
                                />
                                <label
                                    htmlFor="fileInput"
                                    className={styles.fileInputLabel}
                                >
                                    <i className="fa-solid fa-file"></i>
                                    Choisir un fichier
                                </label>
                            </div>
                        </div>
                        <div className={styles.separator}></div>
                        <div className={styles.companyData}>
                            <h3>Coordonnées</h3>
                            <label>
                                Nom :
                                <input
                                    type="text"
                                    name="name"
                                    value={company.name}
                                    onChange={this.handleChange}
                                />
                                {errors.name && (
                                    <p className={styles.error}>
                                        {errors.name}
                                    </p>
                                )}
                            </label>
                            <label>
                                Adresse :
                                <input
                                    type="text"
                                    name="address"
                                    value={company.idAddress.address}
                                    onChange={this.handleChange}
                                />
                                {errors.address && (
                                    <p className={styles.error}>
                                        {errors.address}
                                    </p>
                                )}
                            </label>
                            <label>
                                Code Postal :
                                <input
                                    type="text"
                                    name="zipcode"
                                    value={company.idAddress.zipcode}
                                    onChange={this.handleChange}
                                />
                                {errors.zipcode && (
                                    <p className={styles.error}>
                                        {errors.zipcode}
                                    </p>
                                )}
                            </label>
                            <label>
                                Ville :
                                <input
                                    type="text"
                                    name="city"
                                    value={company.idAddress.city}
                                    onChange={this.handleChange}
                                />
                                {errors.city && (
                                    <p className={styles.error}>
                                        {errors.city}
                                    </p>
                                )}
                            </label>
                            <label>
                                Téléphone :
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={company.phoneNumber}
                                    onChange={this.handleChange}
                                />
                                {errors.phoneNumber && (
                                    <p className={styles.error}>
                                        {errors.phoneNumber}
                                    </p>
                                )}
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
                                {errors.siret && (
                                    <p className={styles.error}>
                                        {errors.siret}
                                    </p>
                                )}
                            </label>
                            <label>
                                N° TVA Intracommunautaire :
                                <input
                                    type="text"
                                    name="vatNumber"
                                    value={company.vatNumber}
                                    onChange={this.handleChange}
                                />
                                {errors.vatNumber && (
                                    <p className={styles.error}>
                                        {errors.vatNumber}
                                    </p>
                                )}
                            </label>
                            <label>
                                Capital :
                                <input
                                    type="text"
                                    name="capital"
                                    placeholder=" €"
                                    value={company.capital}
                                    onChange={this.handleChange}
                                />
                                {errors.capital && (
                                    <p className={styles.error}>
                                        {errors.capital}
                                    </p>
                                )}
                            </label>
                        </div>
                        <div className={styles.buttons}>
                            <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={() => this.props.navigate(`/company`)}
                            >
                                <i className="fa-solid fa-xmark"></i>
                                Annuler
                            </button>
                            <button type="submit" className={styles.saveButton}>
                                <i className="fa-solid fa-check"></i>{" "}
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

export default CompanyDetailsWrapper;
