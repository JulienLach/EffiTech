const API_URL = "http://localhost:3001";

function getAllEvents(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${API_URL}/events`);
    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error("Erreur de récupération des events", xhr.statusText);
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send();
}

function getAllClients(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${API_URL}/clients`);
    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error("Erreur de récupération des clients", xhr.statusText);
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send();
}

function getAllEmployees(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${API_URL}/employees`);
    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error(
                "Erreur de récupération des employés",
                xhr.statusText
            );
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send();
}

function createEvent(eventData, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}/events`);
    xhr.setRequestHeader("Content-Type", "application/json"); // définir le contenu de la requête est en JSON
    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
            console.log("Evénement créé");
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error("Erreur de création de l'événement", xhr.statusText);
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send(JSON.stringify(eventData)); // envoyer les données au serveur
}

function createReport(newReport, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}/reports`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
            console.log("Rapport créé");
            console.log(newReport);
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error("Erreur de création du rapport", xhr.statusText);
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send(JSON.stringify(newReport));
}

function getReportById(idEvent, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${API_URL}/reports/${idEvent}`);
    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error("Erreur de récupération du rapport", xhr.statusText);
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send();
}

function updateEvent(eventData, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `${API_URL}/events/${eventData.idEvent}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("Evénement mis à jour");
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error(
                "Erreur de mise à jour de l'événement",
                xhr.statusText
            );
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send(JSON.stringify(eventData));
}

function createAccount(employeeData, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}/employees`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
            console.log("Compte employée créé");
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error("Erreur de création du compte", xhr.statusText);
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send(JSON.stringify(employeeData));
}

function loginEmployee(credentials, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}/employees/login`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.withCredentials = true; //les cookies sont envoyés avec la requête http
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("Connexion réussie");
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error("Erreur de connexion", xhr.statusText);
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send(JSON.stringify(credentials));
}

function getEmployeeById(idEmployee, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${API_URL}/employees/${idEmployee}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send();
}

function getClientById(idClient, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${API_URL}/clients/${idClient}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send();
}

export {
    getAllEvents,
    getAllClients,
    getAllEmployees,
    createEvent,
    createReport,
    getReportById,
    updateEvent,
    createAccount,
    loginEmployee,
    getEmployeeById,
    getClientById,
};
