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
                console.log("Données du document récupérées:", data);
                this.setState({ document: data });
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

        //URI de la string base64 du PDF
        const pdfDataUri = `data:application/pdf;base64,${document.file}`;

        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}>
                    <div className={styles.documentInfo}>
                        <h1 className={styles.pageTitle}>Document</h1>
                        <div className={styles.alignBackButton}>
                            <div className={styles.names}></div>
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
                    <div className={styles.documentDetails}>
                        <p>Titre : {document.title}</p>
                        <p>Marque : {document.brand}</p>
                        <p>Modèle : {document.model}</p>
                    </div>
                    <div className={styles.pdfContainer}>
                        <embed
                            src={pdfDataUri}
                            type="application/pdf"
                            width="100%"
                            height="600px"
                        ></embed>
                    </div>
                </div>
            </>
        );
    }
}

export default DocumentDetailsPageWrapper;
