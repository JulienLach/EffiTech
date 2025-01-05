import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DocumentForm.module.css";
import { importDocument } from "../../services/api";

function DocumentFormWrapper(props) {
    const navigate = useNavigate();
    return <DocumentForm {...props} navigate={navigate} />;
}

class DocumentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            document: {
                idDocument: "",
                title: "",
                brand: "",
                model: "",
                file: null,
            },
            error: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            document: {
                ...prevState.document,
                [name]: value,
            },
        }));
    }

    handleFileChange(event) {
        const file = event.target.files[0];
        this.setState((prevState) => ({
            document: {
                ...prevState.document,
                file: file,
            },
        }));
    }

    handleSubmit(event) {
        event.preventDefault();
        const { document } = this.state;
        const formData = new FormData();
        formData.append("title", document.title);
        formData.append("brand", document.brand);
        formData.append("model", document.model);
        formData.append("file", document.file);

        console.log("Données du formulaire soumises:", formData);

        importDocument(formData, (error, newDocument) => {
            if (error) {
                console.error(
                    "Erreur lors de l'importation du document :",
                    error
                );
                this.setState({ error: error.message });
            } else {
                console.log("Document importé :", newDocument);
                this.props.onClose();
                this.props.navigate("/documents");
            }
        });
        window.location.reload();
    }

    render() {
        const { onClose } = this.props;
        const { document, error } = this.state;

        return (
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <h1 className={styles.modalHeader}>Nouveau document</h1>
                    <div className={styles.separation}></div>

                    {error && <p className={styles.error}>{error}</p>}
                    <form
                        className={styles.formElements}
                        onSubmit={this.handleSubmit}
                    >
                        <div className={styles.labelInput}>
                            <label htmlFor="title">Titre :</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={document.title}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="brand">
                                Marque de l'équipement :
                            </label>
                            <input
                                type="text"
                                id="brand"
                                name="brand"
                                value={document.brand}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="model">
                                Modèle de l'équipement :
                            </label>
                            <input
                                type="text"
                                id="model"
                                name="model"
                                value={document.model}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="file">Document PDF :</label>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                onChange={this.handleFileChange}
                            />
                        </div>

                        <div className={styles.separation}></div>

                        <div className={styles.buttonPosition}>
                            <button
                                type="reset"
                                className={styles.cancelButton}
                                onClick={onClose}
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
                </div>
            </div>
        );
    }
}

export default DocumentFormWrapper;
