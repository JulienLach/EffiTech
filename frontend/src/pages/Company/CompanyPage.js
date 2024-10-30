import React, { Component } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./CompanyPage.module.css";
import { getCompany } from "../../services/api";

// Composant fonctionnel wrapper
const CompanyPageWrapper = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return <CompanyPage navigate={navigate} location={location} />;
};

class CompanyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: null,
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    componentDidMount() {
        getCompany((error, data) => {
            if (error) {
                this.setState({ error: error.message });
            } else {
                console.log("Données de la société :", data);
                this.setState({ company: data });
            }
        });
    }

    handleButtonClick() {
        this.props.navigate(`/company-form`);
    }

    render() {
        const { company } = this.state;

        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>Société</h1>
                    {company ? (
                        <div>
                            <div className={styles.logoCompany}>
                                <img
                                    src={`data:image/jpeg;base64,${company.logo}`}
                                    alt="Logo de la société"
                                />
                            </div>
                            <div className={styles.separator}></div>
                            <div>
                                <h3>Coordonnées</h3>
                                <p>
                                    Adresse : {company.idAddress.address},{" "}
                                    {company.idAddress.zipcode} ,
                                    {company.idAddress.city}
                                </p>{" "}
                                <p>Téléphone : {company.phoneNumber}</p>
                            </div>
                            <div className={styles.separator}></div>
                            <div>
                                <h3>Informations</h3>
                                <p>SIRET : {company.siret}</p>
                                <p>
                                    N°TVA Intracommunautaire :{" "}
                                    {company.vatNumber}
                                </p>
                                <p>Capital : {company.capital} €</p>
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
                        <div>
                            <p>
                                Aucune société trouvée. Veuillez en créer une.
                            </p>
                            <button
                                className={styles.addCompany}
                                onClick={this.handleButtonClick}
                            >
                                <i className="fa-solid fa-plus"></i>Créer une
                                société
                            </button>
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default CompanyPageWrapper;
