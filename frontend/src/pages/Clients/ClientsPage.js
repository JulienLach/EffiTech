import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./ClientsPage.module.css";
import { getAllClients, createClient } from "../../services/api";

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
            category: "",
            company: "",
            isCategeoryModalOpen: false,
            selectedCategory: "All",
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleModalCategoryChange =
            this.handleModalCategoryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    openCategoryModal = () => {
        this.setState({ isCategeoryModalOpen: true });
    };

    closeCategoryModal = () => {
        this.setState({ isCategeoryModalOpen: false });
    };

    openModal() {
        this.setState({ isModalOpen: true });
    }

    closeModal() {
        this.setState({ isModalOpen: false });
    }

    handleCategoryChange(event) {
        this.setState({ selectedCategory: event.target.value });
    }

    handleModalCategoryChange(event) {
        this.setState({ category: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const data = {
            category: this.state.category,
            company: this.state.company,
            lastname: form.lastname.value,
            firstname: form.firstname.value,
            addressDetails: {
                address: form.address.value,
                zipcode: form.zipcode.value,
                city: form.city.value,
            },
            email: form.mail.value,
            phoneNumber: form.phone.value,
        };
        console.log("Données du formulaire soumises:", data);

        createClient(data, (error, newClient) => {
            if (error) {
                this.setState({ error: error.message });
            } else {
                this.setState((prevState) => ({
                    clients: [...prevState.clients, newClient],
                    isModalOpen: false,
                }));
            }
        });
    }

    render() {
        const { clients, isModalOpen, isCategeoryModalOpen, selectedCategory } =
            this.state;

        // Filtrer les clients en fonction de la catégorie sélectionnée
        const filteredClients =
            selectedCategory === "All"
                ? clients
                : clients.filter(
                      (client) => client.category === selectedCategory
                  );

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
                            <div
                                className={styles.typeFilter}
                                onClick={this.openCategoryModal}
                            >
                                <i className="fa-solid fa-filter"></i>
                                <p>Type</p>
                            </div>
                            {isCategeoryModalOpen && (
                                <div className={styles.modalFilter}>
                                    <div>
                                        <div>
                                            <input
                                                type="radio"
                                                id="all"
                                                name="clientType"
                                                value="All"
                                                checked={
                                                    this.state
                                                        .selectedCategory ===
                                                    "All"
                                                }
                                                onChange={
                                                    this.handleCategoryChange
                                                }
                                            />
                                            <label htmlFor="all">Tous</label>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                name="clientType"
                                                value="Particulier"
                                                checked={
                                                    this.state
                                                        .selectedCategory ===
                                                    "Particulier"
                                                }
                                                onChange={
                                                    this.handleCategoryChange
                                                }
                                            />
                                            <label htmlFor="particuliers">
                                                Particuliers
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                name="clientType"
                                                value="Professionnel"
                                                checked={
                                                    this.state
                                                        .selectedCategory ===
                                                    "Professionnel"
                                                }
                                                onChange={
                                                    this.handleCategoryChange
                                                }
                                            />
                                            <label htmlFor="professionnels">
                                                Professionnels
                                            </label>
                                        </div>
                                        <button
                                            onClick={this.closeCategoryModal}
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            onClick={this.closeCategoryModal}
                                        >
                                            Filter
                                        </button>
                                    </div>
                                </div>
                            )}
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
                                {filteredClients.map((client) => (
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
                {isModalOpen && (
                    <Modal onClose={this.closeModal}>
                        <h1>Nouveau client</h1>
                        <form
                            className={styles.formElements}
                            onSubmit={this.handleSubmit}
                        >
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
                                            onChange={this.handleModalCategoryChange.bind(
                                                this
                                            )}
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
                                            onChange={this.handleModalCategoryChange.bind(
                                                this
                                            )}
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
                                    Enregister
                                </button>
                            </div>
                        </form>
                    </Modal>
                )}
            </>
        );
    }
}

const Modal = ({ onClose, children }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>{children}</div>
        </div>
    );
};

export default ClientsPageWrapper;
