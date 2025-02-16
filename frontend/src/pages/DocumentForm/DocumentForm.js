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
            errors: {},
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
        const reader = new FileReader();
        reader.onloadend = () => {
            this.setState((prevState) => ({
                document: {
                    ...prevState.document,
                    file: reader.result.split(",")[1],
                },
            }));
        };
        reader.readAsDataURL(file);
    }

    handleSubmit(event) {
        event.preventDefault();
        const { document } = this.state;
        const formData = new FormData();
        formData.append("title", document.title);
        formData.append("brand", document.brand);
        formData.append("model", document.model);
        formData.append("file", document.file);

        const errors = {};
        if (!document.title) {
            errors.title = "* Champ obligatoire";
        } else if (!/^[a-zA-Z0-9\s-'`]+$/.test(document.title)) {
            errors.title =
                "* Ne doit contenir que des lettres, des chiffres, des espaces, des traits d'union ou des apostrophes";
        }
        if (!document.brand) {
            errors.brand = "* Champ obligatoire";
        } else if (!/^[a-zA-Z0-9\s-]+$/.test(document.brand)) {
            errors.brand =
                "* Ne doit contenir que des lettres, des chiffres, des espaces ou des traits d'union";
        }
        if (!document.model) {
            errors.model = "* Champ obligatoire";
        } else if (!/^[a-zA-Z0-9\s-]+$/.test(document.model)) {
            errors.model =
                "* Ne doit contenir que des lettres, des chiffres, des espaces ou des traits d'union";
        }
        if (!document.file) {
            errors.file = "* Champ obligatoire";
        }
        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }

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
        const { document, errors } = this.state;

        return (
            <>
                <div className={styles.modalBackground}></div>
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h1 className={styles.modalHeader}>Nouveau document</h1>
                        <div className={styles.separation}></div>
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
                                {errors.title && (
                                    <span className={styles.error}>
                                        {errors.title}
                                    </span>
                                )}
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
                                {errors.brand && (
                                    <span className={styles.error}>
                                        {errors.brand}
                                    </span>
                                )}
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
                                {errors.model && (
                                    <span className={styles.error}>
                                        {errors.model}
                                    </span>
                                )}
                            </div>
                            <div className={styles.labelInput}>
                                <label htmlFor="file">Document PDF :</label>
                                <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    onChange={this.handleFileChange}
                                />
                                {errors.file && (
                                    <span className={styles.error}>
                                        {errors.file}
                                    </span>
                                )}
                            </div>

                            <div className={styles.separation}></div>

                            <div className={styles.buttonPosition}>
                                <button
                                    type="reset"
                                    className={styles.cancelButton}
                                    onClick={onClose}
                                >
                                    <i className="fa-solid fa-xmark"></i>{" "}
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className={styles.submitButton}
                                >
                                    <i className="fa-solid fa-check"></i>{" "}
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default DocumentFormWrapper;
