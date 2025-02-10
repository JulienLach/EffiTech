import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./DocumentsPage.module.css";
import { getAllDocuments, downloadDocument } from "../../services/api";
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
            currentPage: 1,
            documentsPerPage: 10,
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePreviousPage = this.handlePreviousPage.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleTitleClick = this.handleButtonClick.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
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

    handlePageChange(event, pageNumber) {
        event.preventDefault();
        this.setState({ currentPage: pageNumber });
    }

    handleNextPage(event) {
        event.preventDefault();
        this.setState((prevState) => ({
            currentPage: Math.min(
                prevState.currentPage + 1,
                Math.ceil(
                    prevState.documents.length / prevState.documentsPerPage
                )
            ),
        }));
    }

    handlePreviousPage(event) {
        event.preventDefault();
        this.setState((prevState) => ({
            currentPage: Math.max(prevState.currentPage - 1, 1),
        }));
    }

    handleButtonClick(document) {
        this.props.navigate("/document-details", {
            state: { document: document },
        });
    }

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

    handleDownload(idDocument) {
        downloadDocument(idDocument, (error, data) => {
            if (error) {
                this.setState({ error: error.message });
            } else {
                // Créer un lien pour télécharger le fichier
                const blob = new Blob([data], { type: "application/pdf" });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `document_${idDocument}.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }
        });
    }

    handleSubmit() {}

    handleSearchChange() {}

    render() {
        const { isModalOpen, documents, currentPage, documentsPerPage } =
            this.state;

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
                                Importer un document
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
                    <div className={styles.divider}></div>
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
                                    <tr key={document.idDocument}>
                                        <td>D-{document.idDocument}</td>
                                        <td>
                                            <a
                                                className={styles.titleLink}
                                                onClick={() =>
                                                    this.handleButtonClick(
                                                        document
                                                    )
                                                }
                                            >
                                                {document.title}
                                            </a>
                                        </td>
                                        <td>{document.brand}</td>
                                        <td>{document.model}</td>
                                        <td>
                                            <a
                                                onClick={() =>
                                                    this.handleDownload(
                                                        document.idDocument
                                                    )
                                                }
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
                                <i className="fa-solid fa-chevron-left"></i>
                            </button>
                            <button>
                                <i className="fa-solid fa-chevron-right"></i>
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
