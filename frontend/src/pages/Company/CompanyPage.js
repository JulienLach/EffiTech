import React, { Component } from "react";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./CompanyPage.module.css";
import logoCompany from "../../images/logoCompany.png";
import { getCompany } from "../../services/api";

class CompanyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: {},
        };
    }

    componentDidMount() {
        getCompany((error, data) => {
            if (error) {
                this.setState({ error: error.message });
            } else {
                this.setState({ company: data });
                console.log(data);
            }
        });
    }

    render() {
        const { company } = this.state;

        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>Société</h1>
                    <div>
                        <div className={styles.logoCompany}>
                            <img src={logoCompany} alt="Logo de la société" />
                        </div>
                        <div className={styles.separator}></div>
                        <div>
                            <h3>Coordonnées</h3>
                            <p>Téléphone : {company.phoneNumber}</p>
                            {company.idAddress && ( // vérifier si l'adresse est définie
                                <>
                                    <p>
                                        Adresse : {company.idAddress.address},{" "}
                                        {company.idAddress.zipcode} ,
                                        {company.idAddress.city}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className={styles.separator}></div>
                        <div>
                            <h3>Informations</h3>
                            <p>SIRET : {company.siret}</p>
                            <p>
                                N°TVA Intracommunautaire : {company.vatNumber}
                            </p>
                            <p>Capital : {company.capital} €</p>
                        </div>
                        <button
                            className={styles.editCompany}
                            onClick={this.openModal}
                        >
                            <i className="fa-solid fa-pen"></i>Modifier
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

export default CompanyPage;
