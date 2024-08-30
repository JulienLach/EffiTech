import React from "react";
import styles from "./CreateEventForm.module.css";

const CreateEventForm = ({ closeModal }) => {
    return (
        <form className={`${styles.modal} ${styles.open}`}>
            <div>
                <label>Titre</label>
                <input type="text" />
            </div>
            <div>
                <label>Date d'intervention</label>
                <input type="date" />
            </div>
            <div>
                <label>Heure de début</label>
                <input type="time" />
            </div>
            <div>
                <label>Heure de fin</label>
                <input type="time" />
            </div>
            <div>
                <label>Description</label>
                <textarea />
            </div>
            <div>
                <label>Sélectionner un client</label>
                <select>
                    <option value="">Sélectionner un client</option>
                    <option value="client1">Client 1</option>
                    <option value="client2">Client 2</option>
                    <option value="client3">Client 3</option>
                </select>
            </div>
            <div>
                <label>Adresse</label>
                <input type="text" />
            </div>
            <div>
                <label>Sélectionner un technicien</label>
                <select>
                    <option value="">Sélectionner un technicien</option>
                    <option value="technician1">Technicien 1</option>
                    <option value="technician2">Technicien 2</option>
                    <option value="technician3">Technicien 3</option>
                </select>
            </div>
            <div>
                <button type="button" onClick={closeModal}>Annuler</button>
                <button type="button">Créer</button>
            </div>
        </form>
    );
};

export default CreateEventForm;