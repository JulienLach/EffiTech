import React from "react";
import styles from "./DocumentForm.module.css";

const DocumentForm = ({ onClose, onSubmit, handleFileChange }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h1 className={styles.modalHeader}>Nouveau document</h1>
                <div className={styles.separation}></div>

                <form className={styles.formElements} onSubmit={onSubmit}>
                    <div className={styles.labelInput}>
                        <label htmlFor="title">Titre :</label>
                        <input type="text" id="title" name="title" />
                    </div>
                    <div className={styles.labelInput}>
                        <label htmlFor="brand">Marque de l'équipement :</label>
                        <input type="text" id="brand" name="brand" />
                    </div>
                    <div className={styles.labelInput}>
                        <label htmlFor="model">Modèle de l'équipement :</label>
                        <input type="text" id="model" name="model" />
                    </div>
                    <div className={styles.labelInput}>
                        <label htmlFor="model">Document PDF :</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
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
                        <button type="submit" className={styles.submitButton}>
                            Ajouter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DocumentForm;
