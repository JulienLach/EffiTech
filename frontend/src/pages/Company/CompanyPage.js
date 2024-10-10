import React, { Component } from "react";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./CompanyPage.module.css";
import logoCompany from "../../images/logoCompany.png";

class CompanyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: {},
        };
    }

    render() {
        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>Société</h1>
                    <div>
                        <div className={styles.logoCompany}>
                            <img src={logoCompany}></img>
                        </div>
                        <div>
                            <h3>Coordonnées</h3>
                            <p>Téléphone : 0604050604</p>
                            <p>Adresse : 12 rue du douze 12120 Douze-sur-mer</p>
                        </div>
                        <div>
                            <h3>Informations</h3>
                            <p>SIRET : 55644355600012</p>
                            <p>N°TVA Intracommunautaire : FR453456657</p>
                            <p>Capital : 4655 €</p>
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
