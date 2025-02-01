import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import TemplateGlobalMobile from "../Template/TemplateGlobalMobile";
import styles from "./ClientsPage.module.css";
import stylesMobile from "./ClientsPageMobile.module.css";
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
            category: "Particulier",
            company: "",
            isCategeoryModalOpen: false,
            selectedCategory: "All",
            currentPage: 1,
            clientsPerPage: 10,
            searchItem: "",
            errors: {},
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleModalCategoryChange =
            this.handleModalCategoryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePreviousPage = this.handlePreviousPage.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
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
            this.props.navigate(`/client-details/`, {
                state: { client },
            });
        } else {
            console.error("Données du client non définies");
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

        const errors = {};
        if (!data.company && data.category === "Professionnel") {
            errors.company = "* Champ obligatoire";
        }
        if (!data.firstname) {
            errors.firstname = "* Champ obligatoire";
        } else if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(data.firstname)) {
            errors.firstname =
                "* Ne doit contenir que des lettres et des tirets";
        }
        if (!data.lastname) {
            errors.lastname = "* Champ obligatoire";
        } else if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(data.lastname)) {
            errors.lastname =
                "* Ne doit contenir que des lettres et des tirets";
        }
        if (!data.addressDetails.address) {
            errors.address = "* Champ obligatoire";
        } else if (!/^[a-zA-ZÀ-ÿ\d\s-]+$/.test(data.addressDetails.address)) {
            errors.address =
                "* Ne doit contenir que des lettres, des chiffres, des espaces et des tirets";
        }
        if (!data.addressDetails.zipcode) {
            errors.zipcode = "* Champ obligatoire";
        } else if (!/^\d{5}$/.test(data.addressDetails.zipcode)) {
            errors.zipcode = "* Doit contenir exactement 5 chiffres";
        }
        if (!data.addressDetails.city) {
            errors.city = "* Champ obligatoire";
        } else if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(data.addressDetails.city)) {
            errors.city =
                "* Ne doit contenir que des lettres, des espaces et des tirets";
        }
        if (!data.email) {
            errors.email = "* Champ obligatoire";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = "* Adresse email invalide";
        }
        if (!data.phoneNumber) {
            errors.phone = "* Champ obligatoire";
        } else if (!/^[\d\s]+$/.test(data.phoneNumber)) {
            errors.phone = "* Ne doit contenir que des chiffres et des espaces";
        }

        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }

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

    handleSearchChange(event) {
        this.setState({ searchItem: event.target.value });
    }

    render() {
        const {
            clients,
            isModalOpen,
            isCategeoryModalOpen,
            selectedCategory,
            currentPage,
            clientsPerPage,
            searchItem,
            errors,
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

        //Variable pour savoir si c'est mobile ou desktop
        const isMobile = window.navigator.userAgentData;

        return (
            <>
                {isMobile.mobile ? (
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
                                    {isCategeoryModalOpen && (
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
                                            {client.address.city},{" "}
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
                        </div>
                        {isModalOpen && (
                            <Modal onClose={this.closeModal}>
                                <h1 className={stylesMobile.modalHeader}>
                                    Nouveau client
                                </h1>
                                <div className={stylesMobile.separation}></div>

                                <form
                                    className={stylesMobile.formElements}
                                    onSubmit={this.handleSubmit}
                                >
                                    <div
                                        className={
                                            stylesMobile.selectedCategory
                                        }
                                    >
                                        <label
                                            className={stylesMobile.labelRadio}
                                        >
                                            Type de client:
                                        </label>
                                        <div>
                                            <label
                                                className={
                                                    stylesMobile.radioParticulier
                                                }
                                            >
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
                                                className={
                                                    stylesMobile.radioProfessionnel
                                                }
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

                                    {this.state.category ===
                                        "Professionnel" && (
                                        <div
                                            className={stylesMobile.labelInput}
                                        >
                                            <label htmlFor="company">
                                                Nom de l'entreprise :{" "}
                                            </label>
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
                                    <div className={stylesMobile.labelInput}>
                                        <label htmlFor="lastname">Nom :</label>
                                        <input
                                            type="text"
                                            id="lastname"
                                            name="lastname"
                                        />
                                    </div>
                                    <div className={stylesMobile.labelInput}>
                                        <label htmlFor="firstname">
                                            Prénom :
                                        </label>
                                        <input
                                            type="text"
                                            id="firstname"
                                            name="firstname"
                                        />
                                    </div>
                                    <div className={stylesMobile.labelInput}>
                                        <label htmlFor="address">
                                            Adresse :
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                        />
                                    </div>
                                    <div className={stylesMobile.labelInput}>
                                        <label htmlFor="zipcode">
                                            Code postal :
                                        </label>
                                        <input
                                            type="text"
                                            id="zipcode"
                                            name="zipcode"
                                        />
                                    </div>
                                    <div className={stylesMobile.labelInput}>
                                        <label htmlFor="city">Ville :</label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                        />
                                    </div>
                                    <div className={stylesMobile.labelInput}>
                                        <label htmlFor="mail">Email :</label>
                                        <input
                                            type="email"
                                            id="mail"
                                            name="mail"
                                        />
                                    </div>
                                    <div className={stylesMobile.labelInput}>
                                        <label htmlFor="phone">
                                            Téléphone :
                                        </label>
                                        <input
                                            type="text"
                                            id="phone"
                                            name="phone"
                                        />
                                    </div>
                                    <div
                                        className={stylesMobile.separation}
                                    ></div>

                                    <div
                                        className={stylesMobile.buttonPosition}
                                    >
                                        <button
                                            type="reset"
                                            className={
                                                stylesMobile.cancelButton
                                            }
                                            onClick={this.closeModal}
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            type="submit"
                                            className={
                                                stylesMobile.submitButton
                                            }
                                        >
                                            Enregister
                                        </button>
                                    </div>
                                </form>
                            </Modal>
                        )}
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
                                                    <td>{client.email}</td>
                                                    <td>
                                                        {client.phoneNumber}
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
                                <Modal onClose={this.closeModal}>
                                    <h1 className={styles.modalHeader}>
                                        Nouveau client
                                    </h1>
                                    <div className={styles.separation}></div>

                                    <form
                                        className={styles.formElements}
                                        onSubmit={this.handleSubmit}
                                    >
                                        <div
                                            className={styles.selectedCategory}
                                        >
                                            <label
                                                className={styles.labelRadio}
                                            >
                                                Type de client:
                                            </label>
                                            <div>
                                                <label
                                                    className={
                                                        styles.radioParticulier
                                                    }
                                                >
                                                    <input
                                                        className={
                                                            styles.radioForm
                                                        }
                                                        type="radio"
                                                        name="category"
                                                        value="Particulier"
                                                        checked={
                                                            this.state
                                                                .category ===
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
                                                    className={
                                                        styles.radioProfessionnel
                                                    }
                                                >
                                                    <input
                                                        className={
                                                            styles.radioForm
                                                        }
                                                        type="radio"
                                                        name="category"
                                                        value="Professionnel"
                                                        checked={
                                                            this.state
                                                                .category ===
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

                                        {this.state.category ===
                                            "Professionnel" && (
                                            <div className={styles.labelInput}>
                                                <label htmlFor="company">
                                                    Nom de l'entreprise :{" "}
                                                </label>
                                                <input
                                                    type="text"
                                                    id="company"
                                                    name="company"
                                                    value={this.state.company}
                                                    onChange={(e) =>
                                                        this.setState({
                                                            company:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                                {errors.company && (
                                                    <span
                                                        className={styles.error}
                                                    >
                                                        {errors.company}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        <div className={styles.labelInput}>
                                            <label htmlFor="lastname">
                                                Nom :
                                            </label>
                                            <input
                                                type="text"
                                                id="lastname"
                                                name="lastname"
                                            />
                                            {errors.lastname && (
                                                <span className={styles.error}>
                                                    {errors.lastname}
                                                </span>
                                            )}
                                        </div>
                                        <div className={styles.labelInput}>
                                            <label htmlFor="firstname">
                                                Prénom :
                                            </label>
                                            <input
                                                type="text"
                                                id="firstname"
                                                name="firstname"
                                            />
                                            {errors.firstname && (
                                                <span className={styles.error}>
                                                    {errors.firstname}
                                                </span>
                                            )}
                                        </div>
                                        <div className={styles.labelInput}>
                                            <label htmlFor="address">
                                                Adresse :
                                            </label>
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                            />
                                            {errors.address && (
                                                <span className={styles.error}>
                                                    {errors.address}
                                                </span>
                                            )}
                                        </div>
                                        <div className={styles.labelInput}>
                                            <label htmlFor="zipcode">
                                                Code postal :
                                            </label>
                                            <input
                                                type="text"
                                                id="zipcode"
                                                name="zipcode"
                                            />
                                            {errors.zipcode && (
                                                <span className={styles.error}>
                                                    {errors.zipcode}
                                                </span>
                                            )}
                                        </div>
                                        <div className={styles.labelInput}>
                                            <label htmlFor="city">
                                                Ville :
                                            </label>
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                            />
                                            {errors.city && (
                                                <span className={styles.error}>
                                                    {errors.city}
                                                </span>
                                            )}
                                        </div>
                                        <div className={styles.labelInput}>
                                            <label htmlFor="mail">
                                                Email :
                                            </label>
                                            <input
                                                type="email"
                                                id="mail"
                                                name="mail"
                                            />
                                            {errors.email && (
                                                <span className={styles.error}>
                                                    {errors.email}
                                                </span>
                                            )}
                                        </div>
                                        <div className={styles.labelInput}>
                                            <label htmlFor="phone">
                                                Téléphone :
                                            </label>
                                            <input
                                                type="text"
                                                id="phone"
                                                name="phone"
                                            />
                                            {errors.phone && (
                                                <span className={styles.error}>
                                                    {errors.phone}
                                                </span>
                                            )}
                                        </div>
                                        <div
                                            className={styles.separation}
                                        ></div>

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
                                <div className={styles.modalBackground}></div>
                            </>
                        )}
                    </>
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
