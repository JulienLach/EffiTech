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

function getAddressById(idAddress, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/addresses/${idAddress}`);
    xhr.onload = function() {
        if (xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error('Erreur de récupération de l\'adresse', xhr.statusText);
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send();
}

function createEvent() {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `${API_URL}/events`);
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Evénement créé');
        } else {
            console.error('Erreur de création de l\'événement', xhr.statusText);
        }
    };
    xhr.send();
}

export { getAllEvents, getAllClients, getAllEmployees, getAddressById, createEvent };