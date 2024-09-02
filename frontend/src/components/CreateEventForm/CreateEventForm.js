import React, { useState, useEffect } from "react";
import styles from "./CreateEventForm.module.css";
import { getAllClients } from "../../services/api";

const CreateEventForm = ({ closeModal }) => { // mettre en props la fonction closeModal pour ouvrir et fermer le modal
    
    const [clients, setClients] = useState([]); // définir

    useEffect(() => {
        // Faire une requête pour récupérer les clients
        getAllClients((error, data) => {
            if (error) {
                console.error('Erreur lors de la récupération des clients', error);
            } else {
                setClients(data);
            }
        });
    }, []);

    
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
                    {clients.map(client =>
                        <option key={client.idClient} value={client.idClient}>
                            {client.firstname} {client.lastname}
                        </option>
                    )}
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
  Ici dan          </div>
        </form>
    );
};

export default CreateEventForm;