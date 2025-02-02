import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./InvoicesPage.module.css";
import TemplateGlobal from "../Template/TemplateGlobal";
import { getAllInvoices } from "../../services/api";
import InvoiceForm from "../../components/InvoiceForm/InvoiceForm";

function InvoicesPageWrapper() {
    const navigate = useNavigate();
    const location = useLocation();
    return <InvoicesPage navigate={navigate} location={location} />;
}

class InvoicesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoices: [],
            amountIncludingtax: "",
            amountWithoutTax: "",
            invoicesDate: "",
            file: "",
            client: {},
            isModalOpen: false,
        };
        this.openModal = this.openModal.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    componentDidMount() {
        getAllInvoices((error, invoices) => {
            if (error) {
                console.error(error);
            } else {
                this.setState({ invoices });
                console.log("Données des factures récupérées:", invoices);
            }
        });
    }

    formatDate(invoiceDate) {
        const date = new Date(invoiceDate);
        return date.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    openModal() {
        this.setState({ isModalOpen: true });
    }

    render() {
        const { isModalOpen, invoices } = this.state;

        const isMobile = window.navigator.userAgentData;

        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>Factures</h1>
                    <button
                        className={styles.addInvoiceButton}
                        onClick={this.openModal}
                    >
                        <i className="fa-solid fa-plus"></i> Importer une
                        facture
                    </button>
                    <div className={styles.divider}></div>
                    <div>
                        <table>
                            <thead className={styles.stickyThead}>
                                <tr>
                                    <th>Référence</th>
                                    <th>Client</th>
                                    <th>Montant HT</th>
                                    <th>Montant TTC</th>
                                    <th>Date de facturation</th>
                                    <th>Télécharger</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map((invoice) => (
                                    <tr key={invoice.id}>
                                        <td>
                                            <a>FC-{invoice.idInvoice}</a>
                                        </td>
                                        <td>
                                            {invoice.clientFirstname}{" "}
                                            {invoice.clientLastname}
                                        </td>
                                        <td>{invoice.amountWithoutTax}€</td>
                                        <td>{invoice.amountIncludingTax}€</td>
                                        <td>
                                            {this.formatDate(
                                                invoice.invoiceDate
                                            )}
                                        </td>
                                        <td>
                                            <a
                                                className={
                                                    styles.downloadButton
                                                }
                                            >
                                                <i className="fa-solid fa-file-pdf"></i>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {isModalOpen && (
                    <InvoiceForm
                        onClose={() => this.setState({ isModalOpen: false })}
                        navigate={this.props.navigate}
                    />
                )}
            </>
        );
    }
}

export default InvoicesPageWrapper;
