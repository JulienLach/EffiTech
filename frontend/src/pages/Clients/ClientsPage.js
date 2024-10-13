import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./ClientsPage.module.css";
import { getAllClients } from "../../services/api";

// Composant wrapper pour utiliser les hooks
const ClientsPageWrapper = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return <ClientsPage navigate={navigate} location={location} />;
};

class ClientsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            error: null,
            isModalOpen: false,
            category: "Particulier",
            company: "",
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
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

    handleButtonClick(client) {
        if (client && client.idClient) {
            this.props.navigate(`/client-details/`, {
                state: { client },
            });
        } else {
            console.error("Données ddu client non définies");
        }
    }

    openModal() {
        this.setState({ isModalOpen: true });
    }

    closeModal() {
        this.setState({ isModalOpen: false });
    }

    handleCategoryChange(event) {
        this.setState({ category: event.target.value });
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
                                    <th>Nom/Entreprise</th>
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
                                        <td
                                            onClick={() =>
                                                this.handleButtonClick(client)
                                            }
                                        >
                                            {client.category ===
                                            "Professionnel" ? (
                                                <span
                                                    className={
                                                        styles.professionnel
                                                    }
                                                >
                                                    {client.company}
                                                </span>
                                            ) : (
                                                <span
                                                    className={
                                                        styles.particulier
                                                    }
                                                >
                                                    {client.lastname}{" "}
                                                    {client.firstname}
                                                </span>
                                            )}
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
                {this.state.isModalOpen && (
                    <Modal onClose={this.closeModal}>
                        <h2>Nouveau client</h2>
                        <form className={styles.formElements}>
                            <div className={styles.selectedCategory}>
                                <label className={styles.labelRadio}>
                                    Type de client:
                                </label>
                                <div>
                                    <label className={styles.radioParticulier}>
                                        <input
                                            type="radio"
                                            name="category"
                                            value="Particulier"
                                            checked={
                                                this.state.category ===
                                                "Particulier"
                                            }
                                            onChange={this.handleCategoryChange}
                                        />
                                        Particulier
                                    </label>
                                </div>
                                <div>
                                    <label
                                        className={styles.radioProfessionnel}
                                    >
                                        <input
                                            type="radio"
                                            name="category"
                                            value="Professionnel"
                                            checked={
                                                this.state.category ===
                                                "Professionnel"
                                            }
                                            onChange={this.handleCategoryChange}
                                        />
                                        Professionnel
                                    </label>
                                </div>
                            </div>
                            {this.state.category === "Professionnel" && (
                                <div className={styles.labelInput}>
                                    <label htmlFor="company">Entreprise:</label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={this.state.company}
                                        onChange={(e) =>
                                            this.setState({
                                                company: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            )}

                            <div className={styles.labelInput}>
                                <label htmlFor="lastname">Nom:</label>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                />
                            </div>
                            <div className={styles.labelInput}>
                                <label htmlFor="firstname">Prénom:</label>
                                <input
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                />
                            </div>
                            <div className={styles.labelInput}>
                                <label htmlFor="address">Adresse:</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                />
                            </div>
                            <div className={styles.labelInput}>
                                <label htmlFor="zipcode">Code postal:</label>
                                <input
                                    type="text"
                                    id="zipcode"
                                    name="zipcode"
                                />
                            </div>
                            <div className={styles.labelInput}>
                                <label htmlFor="city">Ville:</label>
                                <input type="text" id="city" name="city" />
                            </div>
                            <div className={styles.labelInput}>
                                <label htmlFor="mail">Email:</label>
                                <input type="email" id="mail" name="mail" />
                            </div>
                            <div className={styles.labelInput}>
                                <label htmlFor="phone">Téléphone:</label>
                                <input type="text" id="phone" name="phone" />
                            </div>
                        </form>
                        <div className={styles.buttonPosition}>
                            <button
                                type="reset"
                                className={styles.cancelButton}
                                onClick={this.closeModal}
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className={styles.submitButton}
                            >
                                Créer le client
                            </button>
                        </div>
                    </Modal>
                )}
            </>
        );
    }
}

const Modal = ({ onClose, children }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default ClientsPageWrapper;
