import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import { getAllClients } from "../../services/api";
import styles from "./ClientsPage.module.css";
import FilterBar from "../../components/FilterBar/FilterBar";

// Composant wrapper pour utiliser les hooks
function ClientsPageWrapper() {
    const navigate = useNavigate();
    const location = useLocation();
    return <ClientsPage navigate={navigate} location={location} />;
}

class ClientsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            error: null,
            isModalOpen: false,
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        getAllClients((error, data) => {
            if (error) {
                this.setState({ error: error.message });
            } else {
                this.setState({ clients: data });
            }
        });
    }

    getCategoryIndicator(category) {
        const style = {
            padding: "2px 10px",
            borderRadius: "8px",
            color: "white",
            fontSize: "0.8em",
            fontWeight: "500",
        };

        switch (category) {
            case "Professionnel":
                return (
                    <span
                        style={{
                            ...style,
                            backgroundColor: "#C1F0FF",
                            color: "#2C5BA1",
                        }}
                    >
                        Professionnel
                    </span>
                );
            case "Particulier":
                return (
                    <span
                        style={{
                            ...style,
                            backgroundColor: "#FFE4BC",
                            color: "#C35E00",
                        }}
                    >
                        Particulier
                    </span>
                );
        }
    }

    handleButtonClick() {
        this.props.navigate("/client-details");
    }

    openModal() {
        this.setState({ isModalOpen: true });
    }

    closeModal() {
        this.setState({ isModalOpen: false });
    }

    render() {
        const { clients, isModalOpen } = this.state;

        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>Clients</h1>
                    <div className={styles.filterBar}>
                        <div className={styles.leftPart}>
                            <div className={styles.searchInput}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <input
                                    type="text"
                                    id="search"
                                    name="search"
                                    placeholder="Recherche"
                                />
                            </div>
                            <div className={styles.typeFilter}>
                                <i className="fa-solid fa-filter"></i>
                                <p>Type</p>
                            </div>
                        </div>
                        <div className={styles.rightPart}>
                            <button
                                className={styles.addClient}
                                onClick={this.openModal}
                            >
                                <i className="fa-solid fa-plus"></i>Ajouter un
                                client
                            </button>
                        </div>
                    </div>
                    <div>
                        <table>
                            <thead className={styles.stickyThead}>
                                <tr>
                                    <th>Référence</th>
                                    <th>Type</th>
                                    <th>Nom</th>
                                    <th>Adresse</th>
                                    <th>Email</th>
                                    <th>Téléphone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map((client) => (
                                    <tr key={client.idClient}>
                                        <td>C-{client.idClient}</td>
                                        <td>
                                            {this.getCategoryIndicator(
                                                client.category
                                            )}
                                        </td>
                                        <td>
                                            <a
                                                href="#"
                                                onClick={this.handleButtonClick}
                                            >
                                                {(() => {
                                                    if (
                                                        client.category ===
                                                        "Professionnel"
                                                    ) {
                                                        return client.company;
                                                    } else {
                                                        return (
                                                            client.lastname +
                                                            " " +
                                                            client.firstname
                                                        );
                                                    }
                                                })()}
                                            </a>
                                        </td>
                                        <td>
                                            {client.address.address}, <br />
                                            {client.address.zipcode}{" "}
                                            {client.address.city}
                                        </td>
                                        <td>{client.email}</td>
                                        <td>{client.phoneNumber}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}

export default ClientsPageWrapper;
