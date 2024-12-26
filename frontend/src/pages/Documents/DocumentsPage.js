import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./DocumentsPage.module.css";
import { getAllDocuments } from "../../services/api";
import DocumentForm from "../DocumentForm/DocumentForm";

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
        const { isModalOpen, documents } = this.state;

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
                            <button>
                                <i className="fa fa-arrow-left"></i>
                            </button>
                            <button>
                                <i className="fa fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
                {isModalOpen && (
                    <DocumentForm
                        onClose={this.closeModal}
                        onSubmit={this.handleSubmit}
                        handleFileChange={this.handleFileChange}
                    />
                )}
            </>
        );
    }
}

export default DocumentsPageWrapper;
