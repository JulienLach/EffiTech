import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./InvoiceDetailsPage.module.css";
import { getInvoiceById } from "../../services/api";

function InvoiceDetailsPageWrapper() {
    const navigate = useNavigate();
    const location = useLocation();
    return <InvoiceDetailsPage navigate={navigate} location={location} />;
}

class InvoiceDetailsPage extends Component {
    constructor(props) {
        super(props);
        const { invoice } = this.props.location.state;
        this.state = {
            invoice: invoice,
            idInvoice: invoice.idInvoice,
        };
    }

    componentDidMount() {
        const { idInvoice } = this.state;
        getInvoiceById(idInvoice, (error, data) => {
            if (error) {
                console.error("Erreur de récupération de la facture", error);
                this.setState({ error: error.message });
            } else {
                console.log("Données de la facture récupérées:", data);
                this.setState({ invoice: data });
            }
        });
    }

    render() {
        const { invoice, error } = this.state;

        //URI de la string base64 du PDF
        const pdfDataUri = `data:application/pdf;base64,${invoice.file}`;

        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}>
                    <div className={styles.documentInfo}>
                        <h1 className={styles.pageTitle}>Facture</h1>
                        <div className={styles.alignBackButton}>
                            <div className={styles.names}></div>
                            <button
                                type="button"
                                className={styles.backButton}
                                onClick={() => this.props.navigate("/invoices")}
                            >
                                <i className="fa-solid fa-arrow-right"></i>
                                Retour
                            </button>
                        </div>
                    </div>
                    <div className={styles.separation}></div>
                    <div className={styles.documentDetails}>
                        <p>
                            <p>FC-{invoice.idInvoice}</p>
                        </p>
                    </div>
                    <div className={styles.pdfContainer}>
                        <embed
                            src={pdfDataUri}
                            type="application/pdf"
                            width="100%"
                            height="750px"
                        ></embed>
                    </div>
                </div>
            </>
        );
    }
}

export default InvoiceDetailsPageWrapper;
