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

    openModal() {
        this.setState({ isModalOpen: true });
    }

    render() {
        const { isModalOpen } = this.state;

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
                                    <th>Visualiser</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>[FC-001]</td>
                                    <td>[Jean Bombeur]</td>
                                    <td>[100€]</td>
                                    <td>[120€]</td>
                                    <td>[24.02.2025]</td>
                                    <td>[Visualiser la facture]</td>
                                </tr>
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
