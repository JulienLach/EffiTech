import React, { useState, useEffect } from "react";
import styles from "./CreateEventForm.module.css";
import { getAllClients, getAllEmployees, createEvent } from "../../services/api";

const CreateEventForm = ({ closeModal }) => {
    const [clients, setClients] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [address, setAddress] = useState("");
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [title, setTitle] = useState("");
    const [startingDate, setStartingDate] = useState("");
    const [startingHour, setStartingHour] = useState("");
    const [endingHour, setEndingHour] = useState("");
    const [description, setDescription] = useState("");
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
    
    // utilisation de useEffect pour récupérer la liste des employés
    useEffect(() => {
        getAllEmployees((error, data) => {
            if (error) {
                console.error('Erreur lors de la récupération des employés', error);
            } else {
                setEmployees(data);
            }
        });
    }, []);

    // utilisation de useEffect pour mettre à jour l'adresse du client sélectionné
    useEffect(() => {
        if (selectedClient) {
            const addressDetails = selectedClient.address;
            const fullAddress = `${addressDetails.idAddress} ${addressDetails.address}, ${addressDetails.city}, ${addressDetails.zipcode}`;
            setAddress(fullAddress);
            console.log('Adresse complète:', fullAddress);
        }
    }, [selectedClient]);

    // Gestions des changements de valeurs des champs clients et employés
    function handleClientChange(event) {
        const clientId = event.target.value;
        const client = clients.find(client => client.idClient.toString() === clientId);
        setSelectedClient(client);
    }

    function handleEmployeeChange(event) {
        setSelectedEmployee(event.target.value);
    }

    // Gestion de l'envoi du formulaire et création de l'événement
    useEffect(() => {
        setIsPlanned(startingDate && startingHour && endingHour ? true : false);
    }, [startingDate, startingHour, endingHour]);

    function handleSubmit() {
        const eventData = {
            title: title,
            description: description,
            status: 2, // à changer car plus utile
            isPlanned: isPlanned,
            type: "Intervention", // a changer avec ajout de RDV
            idClient: selectedClient.idClient,
            idAddress: selectedClient.address.idAddress,
            startingDate: startingDate,
            startingHour: startingHour,
            endingHour: endingHour,
            idEmployee: selectedEmployee
        };
    
        createEvent(eventData, (error, newEvent) => {
            if (error) {
                console.error('Error creating event:', error);
            } else {
                console.log('Event created successfully:', newEvent);
                closeModal();
            }
            window.location.reload();
        });
    }

    return (
        <form className={`${styles.modal} ${styles.open}`}>
            <div>
                <label>Titre</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Date d'intervention</label>
                <input type="date" value={startingDate} onChange={(e) => setStartingDate(e.target.value)} />
            </div>
            <div>
                <label>Heure de début</label>
                <input type="time" value={startingHour} onChange={(e) => setStartingHour(e.target.value)} />
            </div>
            <div>
                <label>Heure de fin</label>
                <input type="time" value={endingHour} onChange={(e) => setEndingHour(e.target.value)} />
            </div>
            <div>
                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
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
                <button type="button" onClick={handleSubmit}>Créer</button>
            </div>
        </form>
    );
};

export default CreateEventForm;