import React, { Component } from "react";
import { isMobile } from "react-device-detect";
import { useLocation, useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import TemplateGlobalMobile from "../Template/TemplateGlobalMobile";
import styles from "./ClientsPage.module.css";
import stylesMobile from "./ClientsPageMobile.module.css";
import { getAllClients } from "../../services/api";
import ClientForm from "../../components/ClientForm/ClientForm";

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
            isCategoryModalOpen: false,
            selectedCategory: "All",
            currentPage: 1,
            clientsPerPage: 10,
            searchItem: "",
            errors: {},
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePreviousPage = this.handlePreviousPage.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleResetFilter = this.handleResetFilter.bind(this);
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
            fontSize: "0.9em",
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
            default:
                return null;
        }
    }

    handlePageChange(event, pageNumber) {
        event.preventDefault();
        this.setState({ currentPage: pageNumber });
    }

    handleNextPage(event) {
        event.preventDefault();
        this.setState((prevState) => ({
            currentPage: Math.min(
                prevState.currentPage + 1,
                Math.ceil(prevState.clients.length / prevState.clientsPerPage)
            ),
        }));
    }

    handlePreviousPage(event) {
        event.preventDefault();
        this.setState((prevState) => ({
            currentPage: Math.max(prevState.currentPage - 1, 1),
        }));
    }

    handleButtonClick(client) {
        if (client && client.idClient) {
            this.props.navigate(`/client-details`, {
                state: { client },
            });
        } else {
            console.error("Données du client non définies");
        }
    }

    openCategoryModal = () => {
        this.setState({ isCategoryModalOpen: true });
    };

    closeCategoryModal = () => {
        this.setState({ isCategoryModalOpen: false });
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

    handleResetFilter() {
        this.setState({ selectedCategory: "All", searchItem: "" });
    }

    handleSearchChange(event) {
        this.setState({ searchItem: event.target.value });
    }

    render() {
        const {
            clients,
            isModalOpen,
            isCategoryModalOpen,
            selectedCategory,
            currentPage,
            clientsPerPage,
            searchItem,
        } = this.state;

        // Filtrer les clients en fonction de la catégorie sélectionnée et de la recherche
        const filteredClients = clients.filter((client) => {
            const matchesCategory =
                selectedCategory === "All" ||
                client.category === selectedCategory;
            const matchesSearchItem =
                (client.lastname &&
                    client.lastname
                        .toLowerCase()
                        .includes(searchItem.toLowerCase())) ||
                (client.firstname &&
                    client.firstname
                        .toLowerCase()
                        .includes(searchItem.toLowerCase())) ||
                (client.company &&
                    client.company
                        .toLowerCase()
                        .includes(searchItem.toLowerCase()));
            return matchesCategory && matchesSearchItem;
        });

        // Calculer les clients à afficher pour la page actuelle
        const indexOfLastClient = currentPage * clientsPerPage;
        const indexOfFirstClient = indexOfLastClient - clientsPerPage;
        const currentFilteredClients = filteredClients.slice(
            indexOfFirstClient,
            indexOfLastClient
        );

        // Calculer le nombre total de pages
        const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

        return (
            <>
                {isMobile ? (
                    <>
                        <TemplateGlobalMobile />
                        <div className={stylesMobile.container}>
                            <div className={stylesMobile.filterBar}>
                                <div className={stylesMobile.leftPart}>
                                    <div className={stylesMobile.searchInput}>
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                        <input
                                            type="text"
                                            id="search"
                                            name="search"
                                            placeholder="Rechercher"
                                            value={searchItem}
                                            onChange={this.handleSearchChange}
                                        />
                                    </div>
                                    <div
                                        className={stylesMobile.typeFilter}
                                        onClick={this.openCategoryModal}
                                    >
                                        <i className="fa-solid fa-filter"></i>
                                        <p>Type</p>
                                    </div>
                                    {isCategoryModalOpen && (
                                        <div
                                            className={stylesMobile.modalFilter}
                                        >
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
                                                            this
                                                                .handleCategoryChange
                                                        }
                                                    />
                                                    <label htmlFor="all">
                                                        Tous
                                                    </label>
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
                                                            this
                                                                .handleCategoryChange
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
                                                            this
                                                                .handleCategoryChange
                                                        }
                                                    />
                                                    <label htmlFor="professionnels">
                                                        Professionnels
                                                    </label>
                                                </div>
                                                <button
                                                    onClick={
                                                        this.closeCategoryModal
                                                    }
                                                >
                                                    Annuler
                                                </button>
                                                <button
                                                    onClick={
                                                        this.closeCategoryModal
                                                    }
                                                >
                                                    Filtrer
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {currentFilteredClients.map((client) => (
                                <div
                                    className={
                                        client.category === "Professionnel"
                                            ? stylesMobile.clientCardProfessionnel
                                            : stylesMobile.clientCardParticulier
                                    }
                                    onClick={() =>
                                        this.handleButtonClick(client)
                                    }
                                >
                                    <div className={stylesMobile.rightPart}>
                                        <p>{client.category}</p>
                                        {client.category === "Professionnel" ? (
                                            <p className={stylesMobile.name}>
                                                {client.company}
                                            </p>
                                        ) : (
                                            <p className={stylesMobile.name}>
                                                {client.lastname}{" "}
                                                {client.firstname}
                                            </p>
                                        )}
                                        <p className={stylesMobile.address}>
                                            {client.address.address},{" "}
                                            {client.address.city}{" "}
                                            {client.address.zipcode}
                                        </p>
                                    </div>
                                    {client.category === "Professionnel" ? (
                                        <i className="fa-solid fa-landmark"></i>
                                    ) : (
                                        <i className="fa-solid fa-user"></i>
                                    )}
                                </div>
                            ))}
                            {/* Ajout de la pagination ici */}
                            <div className={stylesMobile.pagination}>
                                <button
                                    onClick={this.handlePreviousPage}
                                    disabled={currentPage === 1}
                                >
                                    <i className="fa-solid fa-chevron-left"></i>
                                </button>
                                <span>
                                    Page {currentPage} / {totalPages}
                                </span>
                                <button
                                    onClick={this.handleNextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    <i className="fa-solid fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <TemplateGlobal />
                        <div className={styles.container}>
                            <div className={styles.alignItems}>
                                <h1 className={styles.pageTitle}>Clients</h1>
                                <div className={styles.rightPart}>
                                    <button
                                        className={styles.addClient}
                                        onClick={this.openModal}
                                    >
                                        <i className="fa-solid fa-plus"></i>
                                        Ajouter un client
                                    </button>
                                </div>
                            </div>
                            <div className={styles.filterBar}>
                                <div className={styles.searchInput}>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                    <input
                                        type="text"
                                        id="search"
                                        name="search"
                                        placeholder="Rechercher"
                                        value={searchItem}
                                        onChange={this.handleSearchChange}
                                    />
                                </div>
                                <div className={styles.columnModalFilter}>
                                    <div
                                        className={styles.typeFilter}
                                        onClick={this.openCategoryModal}
                                    >
                                        <i className="fa-solid fa-filter"></i>
                                        <p>Type</p>
                                    </div>
                                    <div
                                        className={styles.typeFilter}
                                        onClick={this.handleResetFilter}
                                    >
                                        <i className="fa-solid fa-arrow-rotate-left"></i>
                                        <p>Réinitialiser</p>
                                    </div>
                                    {isCategoryModalOpen && (
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
                                                            this
                                                                .handleCategoryChange
                                                        }
                                                    />
                                                    <label htmlFor="all">
                                                        Tous
                                                    </label>
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
                                                            this
                                                                .handleCategoryChange
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
                                                            this
                                                                .handleCategoryChange
                                                        }
                                                    />
                                                    <label htmlFor="professionnels">
                                                        Professionnels
                                                    </label>
                                                </div>
                                                <button
                                                    onClick={
                                                        this.closeCategoryModal
                                                    }
                                                >
                                                    Fermer
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={styles.divider}></div>
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
                                        {currentFilteredClients.map(
                                            (client) => (
                                                <tr key={client.idClient}>
                                                    <td>C-{client.idClient}</td>
                                                    <td>
                                                        {this.getCategoryIndicator(
                                                            client.category
                                                        )}
                                                    </td>
                                                    <td
                                                        onClick={() =>
                                                            this.handleButtonClick(
                                                                client
                                                            )
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
                                                                {
                                                                    client.lastname
                                                                }{" "}
                                                                {
                                                                    client.firstname
                                                                }
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {client.address.address}
                                                        , <br />
                                                        {
                                                            client.address
                                                                .zipcode
                                                        }{" "}
                                                        {client.address.city}
                                                    </td>
                                                    <td
                                                        className={
                                                            styles.clientLinks
                                                        }
                                                    >
                                                        <a
                                                            href={`mailto:${client.email}`}
                                                        >
                                                            {client.email}
                                                        </a>
                                                    </td>
                                                    <td
                                                        className={
                                                            styles.clientLinks
                                                        }
                                                    >
                                                        <a
                                                            href={`tel:${client.phoneNumber}`}
                                                        >
                                                            {client.phoneNumber}
                                                        </a>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                                <div className={styles.pagination}>
                                    <button
                                        onClick={(e) =>
                                            this.handlePreviousPage(e)
                                        }
                                        disabled={currentPage === 1}
                                    >
                                        <i className="fa-solid fa-chevron-left"></i>
                                    </button>
                                    <button
                                        onClick={(e) => this.handleNextPage(e)}
                                        disabled={currentPage === totalPages}
                                    >
                                        <i className="fa-solid fa-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {isModalOpen && (
                            <>
                                <div className={styles.modalOverlay}>
                                    <div className={styles.modalContent}>
                                        <ClientForm onClose={this.closeModal} />
                                    </div>
                                </div>
                                <div className={styles.modalBackground}></div>
                            </>
                        )}
                    </>
                )}
            </>
        );
    }
}

export default ClientsPageWrapper;
