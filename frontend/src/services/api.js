const API_URL = 'http://localhost:3001';

function getAllEvents(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/events`);
    xhr.onload = function() {
        if (xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error('Erreur de récupération des events', xhr.statusText);
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send();
}

function getAllClients(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/clients`);
    xhr.onload = function() {
        if (xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error('Erreur de récupération des clients', xhr.statusText);
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send();
}

function getAllEmployees(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/employees`);
    xhr.onload = function() {
        if (xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error('Erreur de récupération des employés', xhr.statusText);
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send();
}

function createEvent(eventData) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_URL}/events`);
    xhr.setRequestHeader('Content-Type', 'application/json'); // Définir le contenu de la requête est en JSON
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Evénement créé');
            closeModal();
        } else {
            console.error('Erreur de création de l\'événement', xhr.statusText);
        }
    };
    console.log('Données envoyées:', eventData); // Ajouter un log pour vérifier les données envoyées
    xhr.send(JSON.stringify(eventData)); // Convertir les données en JSON
}

export { getAllEvents, getAllClients, getAllEmployees, createEvent };