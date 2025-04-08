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
        const { document, error } = this.state;
    }
}

export default InvoiceDetailsPageWrapper;
