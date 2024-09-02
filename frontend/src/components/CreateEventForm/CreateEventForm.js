import React, { useState, useEffect } from "react";
import styles from "./CreateEventForm.module.css";
import { getAllClients, getAllEmployees, getAddressById } from "../../services/api"; // Assurez-vous que le chemin est correct

const CreateEventForm = ({ closeModal }) => { // mettre en props la fonction closeModal pour ouvrir et fermer le modal
    
    const [clients, setClients] = useState([]); // définir la variable des clients avec le useSat
    const [employees, setEmployees] = useState([]);
    const [address, setAddress] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);

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

    useEffect(() => {
        getAllEmployees((error, data) => {
            if (error) {
                console.error('Erreur lors de la récupération des employés', error);
            } else {
                setEmployees(data);
            }
        });
    }, []);

    useEffect(() => {
        if (selectedClient) {
            const addressDetails = selectedClient.idAddress;
            const fullAddress = `${addressDetails.street}, ${addressDetails.city}, ${addressDetails.zipcode}`;
            setAddress(fullAddress);            
        }
    }, [selectedClient]);
    
    const handleClientChange = (selectClient) => {
        const clientId = selectClient.target.value;
        const client = clients.find(client => client.idClient.toString() === clientId);
        setSelectedClient(client);
    };

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
                <select onChange={handleClientChange}>
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
                <input type="text" value={address} readOnly />
            </div>
            <div>
                <label>Sélectionner un technicien</label>
                <select>
                    <option value="">Sélectionner un technicien</option>
                    {employees.map(employee =>
                        <option key={employee.idEmployee} value={employee.idEmployee}>
                            {employee.firstname} {employee.lastname}
                        </option>
                    )}
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