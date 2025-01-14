import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./DocumentDetailsPage.module.css";
import { getDocumentById } from "../../services/api";

// Composant wrapper pour utiliser les hooks
function DocumentDetailsPageWrapper() {
    const navigate = useNavigate();
    const location = useLocation();
    return <DocumentDetailsPage navigate={navigate} location={location} />;
}

class DocumentDetailsPage extends Component {
    constructor(props) {
        super(props);
        const { document } = this.props.location.state;
        this.state = {
            document: document,
            idDocument: document.idDocument,
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    componentDidMount() {
        const { idDocument } = this.state;
        getDocumentById(idDocument, (error, data) => {
            if (error) {
                console.error(
                    "Erreur lors de la récupération du document",
                    error
                );
                this.setState({ error: error.message });
            } else {
                this.setState({ document: data });
                console.log("Données du document récupérées:", data);
            }
        });
    }

    handleButtonClick = () => {
        this.props.navigate("/document-form", {
            state: { document: this.state.document },
        });
    };

    render() {
        const { document, error } = this.state;

        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}>
                    <div className={styles.documentInfo}>
                        <h1 className={styles.pageTitle}>Document</h1>
                        <div className={styles.alignBackButton}>
                            <div className={styles.names}>
                                <p className={styles.title}>{document.title}</p>
                            </div>
                            <button
                                type="button"
                                className={styles.backButton}
                                onClick={() =>
                                    this.props.navigate("/documents")
                                }
                            >
                                <i className="fa-solid fa-arrow-right"></i>
                                Retour
                            </button>
                        </div>
                    </div>
                    <div className={styles.separation}></div>
                    <h2>Informations</h2>
                    <div className={styles.documentDetails}>
                        <p>Marque : {document.brand}</p>
                        <p>Modèle : {document.model}</p>
                    </div>
                </div>
            </>
        );
    }
}

export default DocumentDetailsPageWrapper;
