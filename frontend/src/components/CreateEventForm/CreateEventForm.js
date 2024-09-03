import React, { useState, useEffect } from "react";
import styles from "./CreateEventForm.module.css";
import { getAllClients, getAllEmployees } from "../../services/api";

const CreateEventForm = ({ closeModal }) => {
    const [clients, setClients] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [address, setAddress] = useState("");
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    // const [title, setTitle] = useState("");
    // const [startingDate, setStartingDate] = useState("");
    // const [startingHour, setStartingHour] = useState("");
    // const [endingHour, setEndingHour] = useState("");
    // const [description, setDescription] = useState("");
    const [isPlanned, setIsPlanned] = useState(false);

    useEffect(() => {
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
            const addressDetails = selectedClient.address;
            const fullAddress = `${addressDetails.idAddress} ${addressDetails.address}, ${addressDetails.city}, ${addressDetails.zipcode}`;
            setAddress(fullAddress);
            console.log('Adresse complète:', fullAddress);
        }
    }, [selectedClient]);

    const handleClientChange = (event) => {
        const clientId = event.target.value;
        const client = clients.find(client => client.idClient.toString() === clientId);
        setSelectedClient(client);
    };

    const handleEmployeeChange = (event) => {
        setSelectedEmployee(event.target.value);
    };

    return (
        <form className={`${styles.modal} ${styles.open}`}>
            <div>
                <label>Titre</label>
                <input type="text" name="title" />
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
                <select value={selectedEmployee} onChange={handleEmployeeChange}>
                    <option value="">Sélectionner un technicien</option>
                    {employees.map(employee =>
                        <option key={employee.idEmployee} value={employee.idEmployee}>
                            {employee.firstname} {employee.lastname}
                        </option>
                    )}
                </select>
            </div>
            <div>
                <input type="hidden" value={isPlanned ? 'true' : 'false'} />
            </div>
            <div>
                <button type="button" onClick={closeModal}>Annuler</button>
                <button type="button" >Créer</button>
            </div>
        </form>
    );
};

export default CreateEventForm;