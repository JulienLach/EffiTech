import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./DocumentsPage.module.css";
import { getAllDocuments } from "../../services/api";

// Composant wrapper pour utiliser les hooks
const DocumentsPageWrapper = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return <DocumentsPage navigate={navigate} location={location} />;
};

class DocumentsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            documents: [],
            isModalOpen: false,
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePreviousPage = this.handlePreviousPage.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentDidMount() {
        getAllDocuments((error, data) => {
            if (error) {
                this.setState({ error: error.message });
            } else {
                this.setState({ documents: data });
                console.log("Données des documents récupérées:", data);
            }
        });
    }

    handlePageChange() {}

    handleNextPage() {}

    handlePreviousPage() {}

    handleButtonClick() {}

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

    handleSubmit() {}

    handleSearchChange() {}

    render() {
        const {
            //     clients,
            isModalOpen,
            documents,
            //     isCategeoryModalOpen,
            //     selectedCategory,
            //     currentPage,
            //     clientsPerPage,
            //     searchItem,
        } = this.state;

        // Filtrer les clients en fonction de la catégorie sélectionnée et de la recherche
        // const filteredClients = clients.filter((client) => {
        //     const matchesCategory =
        //         selectedCategory === "All" ||
        //         client.category === selectedCategory;
        //     const matchesSearchItem =
        //         (client.lastname &&
        //             client.lastname
        //                 .toLowerCase()
        //                 .includes(searchItem.toLowerCase())) ||
        //         (client.firstname &&
        //             client.firstname
        //                 .toLowerCase()
        //                 .includes(searchItem.toLowerCase())) ||
        //         (client.company &&
        //             client.company
        //                 .toLowerCase()
        //                 .includes(searchItem.toLowerCase()));
        //     return matchesCategory && matchesSearchItem;
        // });

        // Calculer les clients à afficher pour la page actuelle
        // const indexOfLastClient = currentPage * clientsPerPage;
        // const indexOfFirstClient = indexOfLastClient - clientsPerPage;
        // const currentFilteredClients = filteredClients.slice(
        //     indexOfFirstClient,
        //     indexOfLastClient
        // );

        // Calculer le nombre total de pages
        // const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}>
                    <div className={styles.alignItems}>
                        <h1 className={styles.pageTitle}>Documents</h1>
                        <div className={styles.rightPart}>
                            <button
                                className={styles.addClient}
                                onClick={this.openModal}
                            >
                                <i className="fa-solid fa-plus"></i>
                                Ajouter un document
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
                                placeholder="Recherche"
                                onChange={this.handleSearchChange}
                            />
                        </div>
                        <div className={styles.columnModalFilter}>
                            <div
                                className={styles.typeFilter}
                                onClick={this.openCategoryModal}
                            >
                                <i className="fa-solid fa-tag"></i>
                                <p>Marque</p>
                            </div>
                            {/* {isCategeoryModalOpen && (
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
                            )} */}
                        </div>
                    </div>

                    <div>
                        <table>
                            <thead className={styles.stickyThead}>
                                <tr>
                                    <th>Référence</th>
                                    <th>Titre</th>
                                    <th>Marque</th>
                                    <th>Modèle</th>
                                    <th>Télécharger</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((document) => (
                                    <tr key={document.id}>
                                        <td>D-{document.idDocument}</td>
                                        <td>{document.title}</td>
                                        <td>{document.brand}</td>
                                        <td>{document.model}</td>
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
                        <div className={styles.pagination}>
                            <button
                            // onClick={(e) => this.handlePreviousPage(e)}
                            // disabled={currentPage === 1}
                            >
                                <i className="fa fa-arrow-left"></i>
                            </button>
                            <button
                            // onClick={(e) => this.handleNextPage(e)}
                            // disabled={currentPage === totalPages}
                            >
                                <i className="fa fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
                {isModalOpen && (
                    <Modal onClose={this.closeModal}>
                        <h1 className={styles.modalHeader}>Nouveau document</h1>
                        <div className={styles.separation}></div>

                        <form
                            className={styles.formElements}
                            onSubmit={this.handleSubmit}
                        >
                            <div className={styles.labelInput}>
                                <label htmlFor="title">Titre :</label>
                                <input type="text" id="title" name="title" />
                            </div>
                            <div className={styles.labelInput}>
                                <label htmlFor="brand">
                                    Marque de l'équipement :
                                </label>
                                <input type="text" id="brand" name="brand" />
                            </div>
                            <div className={styles.labelInput}>
                                <label htmlFor="model">
                                    Modèle de l'équipement :
                                </label>
                                <input type="text" id="model" name="model" />
                            </div>
                            <div className={styles.labelInput}>
                                <label htmlFor="model">Document PDF :</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={this.handleFileChange}
                                />
                            </div>

                            <div className={styles.separation}></div>

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
                                    Ajouter
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

export default DocumentsPageWrapper;
