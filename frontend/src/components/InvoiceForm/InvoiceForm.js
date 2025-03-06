import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import styles from "./InvoiceForm.module.css";
import { getAllClients, importInvoice } from "../../services/api";

function InvoiceFormWrapper(props) {
    const navigate = useNavigate();
    return <InvoiceForm {...props} navigate={navigate} />;
}

class InvoiceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: {
                idInvoice: "",
                idClient: "",
                amountIncludingTax: "",
                amountWithoutTax: "",
                invoiceDate: "",
                file: null,
            },
            clients: [],
            searchQuery: "",
            errors: {},
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClientChange = this.handleClientChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentDidMount() {
        getAllClients((error, data) => {
            if (error) {
                console.error(
                    "Erreur lors de la récupération des clients",
                    error
                );
            } else {
                this.setState({ clients: data });
            }
        });
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            invoice: {
                ...prevState.invoice,
                [name]: value,
            },
        }));
    }

    handleFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            this.setState((prevState) => ({
                invoice: {
                    ...prevState.invoice,
                    file: reader.result.split(",")[1],
                },
            }));
        };
        reader.readAsDataURL(file);
    }

    handleClientChange(event) {
        const clientId = event.target.value;
        this.setState((prevState) => ({
            invoice: {
                ...prevState.invoice,
                idClient: clientId,
            },
        }));
    }

    handleSearchChange(event) {
        this.setState({ searchQuery: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { invoice } = this.state;
        const formData = new FormData();
        formData.append("idClient", invoice.idClient);
        formData.append("amountIncludingTax", invoice.amountIncludingTax);
        formData.append("amountWithoutTax", invoice.amountWithoutTax);
        formData.append("invoiceDate", invoice.invoiceDate);
        formData.append("file", invoice.file);

        const errors = {};
        if (!invoice.idClient) {
            errors.idClient = "* Champ obligatoire";
        }
        if (!invoice.amountIncludingTax) {
            errors.amountIncludingTax = "* Champ obligatoire";
        }
        if (!invoice.amountWithoutTax) {
            errors.amountWithoutTax = "* Champ obligatoire";
        }
        if (!invoice.invoiceDate) {
            errors.invoiceDate = "* Champ obligatoire";
        }
        if (!invoice.file) {
            errors.file = "* Champ obligatoire";
        }
        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }

        console.log("Données du formulaire soumises:", formData);

        importInvoice(formData, (error, newInvoice) => {
            if (error) {
                console.error(
                    "Erreur lors de l'importation de la facture :",
                    error
                );
                this.setState({ error: error.message });
            } else {
                console.log("Facture importée :", newInvoice);
                this.props.onClose();
                this.props.navigate("/invoices");
            }
        });
        window.location.reload();
    }

    render() {
        const { onClose } = this.props;
        const { invoice, clients, searchQuery, errors } = this.state;

        // Filtrer les clients en fonction de la recherche
        const filteredClients = clients.filter((client) =>
            `${client.firstname} ${client.lastname}`
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        );

        return (
            <>
                <div className={styles.modalBackground}></div>
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h1 className={styles.modalHeader}>Nouvelle facture</h1>
                        <div className={styles.separation}></div>
                        <form
                            className={styles.formElements}
                            onSubmit={this.handleSubmit}
                        >
                            <div className={styles.labelInput}>
                                <label htmlFor="searchClient">
                                    Sélectionner un client :
                                </label>
                                <Select
                                    options={clients.map((client) => ({
                                        value: client.idClient,
                                        label: `${client.firstname} ${client.lastname}`,
                                    }))}
                                    onChange={(selectedOption) =>
                                        this.handleClientChange({
                                            target: {
                                                value: selectedOption.value,
                                            },
                                        })
                                    }
                                    placeholder={
                                        <span>
                                            <i className="fa fa-search"></i>{" "}
                                            Rechercher un client
                                        </span>
                                    }
                                    className={styles.reactSelect}
                                    classNamePrefix="react-select"
                                />
                                {errors.idClient && (
                                    <span className={styles.error}>
                                        {errors.idClient}
                                    </span>
                                )}
                            </div>
                            <div className={styles.labelInput}>
                                <label htmlFor="amountIncludingTax">
                                    Montant TTC :
                                </label>
                                <input
                                    type="text"
                                    id="amountIncludingTax"
                                    name="amountIncludingTax"
                                    value={invoice.amountIncludingTax}
                                    onChange={this.handleChange}
                                />
                                {errors.amountIncludingTax && (
                                    <span className={styles.error}>
                                        {errors.amountIncludingTax}
                                    </span>
                                )}
                            </div>
                            <div className={styles.labelInput}>
                                <label htmlFor="amountWithoutTax">
                                    Montant HT :
                                </label>
                                <input
                                    type="text"
                                    id="amountWithoutTax"
                                    name="amountWithoutTax"
                                    value={invoice.amountWithoutTax}
                                    onChange={this.handleChange}
                                />
                                {errors.amountWithoutTax && (
                                    <span className={styles.error}>
                                        {errors.amountWithoutTax}
                                    </span>
                                )}
                            </div>
                            <div className={styles.labelInput}>
                                <label htmlFor="invoiceDate">
                                    Date de la facture :
                                </label>
                                <input
                                    type="date"
                                    id="invoiceDate"
                                    name="invoiceDate"
                                    value={invoice.invoiceDate}
                                    onChange={this.handleChange}
                                />
                                {errors.invoiceDate && (
                                    <span className={styles.error}>
                                        {errors.invoiceDate}
                                    </span>
                                )}
                            </div>
                            <div className={styles.labelInput}>
                                <label htmlFor="file">Document PDF :</label>
                                <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    onChange={this.handleFileChange}
                                />
                                {errors.file && (
                                    <span className={styles.error}>
                                        {errors.file}
                                    </span>
                                )}
                            </div>

                            <div className={styles.separation}></div>

                            <div className={styles.buttonPosition}>
                                <button
                                    type="reset"
                                    className={styles.cancelButton}
                                    onClick={onClose}
                                >
                                    <i className="fa-solid fa-xmark"></i>{" "}
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className={styles.submitButton}
                                >
                                    <i className="fa-solid fa-check"></i>{" "}
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default InvoiceFormWrapper;
