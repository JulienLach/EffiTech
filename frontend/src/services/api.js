const API_URL = "http://localhost:3001";

/**
 * @api {get} /events Get all events
 * @apiName GetAllEvents
 * @apiGroup Events
 * @apiVersion 1.0.0
 * @apiSuccess {Object[]} events List of events.
 * @apiSuccess {Number} events.idEvent Event ID.
 * @apiSuccess {String} events.title Event title.
 * @apiSuccess {String} events.description Event description.
 * @apiSuccess {Number} events.status Event status.
 * @apiSuccess {Boolean} events.isPlanned Indicates if the event is planned.
 * @apiSuccess {String} events.type Event type.
 * @apiSuccess {Object} events.client Client associated with the event.
 * @apiSuccess {Object} events.address Event address.
 * @apiSuccess {String} events.address.address Event address.
 * @apiSuccess {String} events.address.city Event city.
 * @apiSuccess {String} events.address.zipcode Event zipcode.
 * @apiSuccess {String} events.startingDate Event starting date.
 * @apiSuccess {String} events.startingHour Event starting hour.
 * @apiSuccess {String} events.endingHour Event ending hour.
 * @apiSuccess {Object} events.employee Employee associated with the event.
 * @apiSuccess {String} events.workToDo Work to be done during the event.
 * @apiError {String} error Error message.
 */
function getAllEvents(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${API_URL}/events`);
    xhr.withCredentials = true; // les cookies sont envoyés avec la requête http
    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            window.location.href = "http://localhost:3000/login";
            console.error("Erreur de récupération des events", xhr.statusText);
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send();
}

/**
 * @api {get} /clients Get all clients
 * @apiName GetAllClients
 * @apiGroup Clients
 * @apiVersion 1.0.0
 * @apiSuccess {Object[]} clients List of clients.
 * @apiSuccess {Number} clients.idClient Client ID.
 * @apiSuccess {String} clients.category Client category.
 * @apiSuccess {String} clients.firstname Client first name.
 * @apiSuccess {String} clients.lastname Client last name.
 * @apiSuccess {String} clients.email Client email.
 * @apiSuccess {Object} clients.address Client address.
 * @apiSuccess {String} clients.address.address Client address.
 * @apiSuccess {String} clients.address.city Client city.
 * @apiSuccess {String} clients.address.zipcode Client zipcode.
 * @apiSuccess {String} clients.phoneNumber Client phone number.
 * @apiSuccess {String} clients.company Client company.
 * @apiError {String} error Error message.
 */
function getAllClients(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${API_URL}/clients`);
    xhr.withCredentials = true;
    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            window.location.href = "http://localhost:3000/login";
            console.error("Erreur de récupération des clients", xhr.statusText);
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send();
}
/**
 * @api {get} /employees Get all employees
 * @apiName GetAllEmployees
 * @apiGroup Employees
 * @apiVersion 1.0.0
 * @apiSuccess {Object[]} employees List of employees.
 * @apiSuccess {Number} employees.idEmployee Employee ID.
 * @apiSuccess {String} employees.firstname Employee first name.
 * @apiSuccess {String} employees.lastname Employee last name.
 * @apiSuccess {String} employees.job Employee job.
 * @apiSuccess {String} employees.phoneNumber Employee phone number.
 * @apiSuccess {String} employees.email Employee email.
 * @apiSuccess {Boolean} employees.isAdmin Indicates if the employee is an administrator.
 * @apiSuccess {String} employees.password Employee password.
 * @apiSuccess {String} employees.speciality Employee speciality.
 * @apiError {String} error Error message.
 */
function getAllEmployees(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${API_URL}/employees`);
    xhr.withCredentials = true;
    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            window.location.href = "http://localhost:3000/login";
            console.error(
                "Erreur de récupération des employés",
                xhr.statusText
            );
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send();
}

/**
 * @api {post} /events Create a new event
 * @apiName CreateEvent
 * @apiGroup Events
 * @apiVersion 1.0.0
 * @apiParam {String} title Event title.
 * @apiParam {String} description Event description.
 * @apiParam {Number} status Event status.
 * @apiParam {Boolean} isPlanned Indicates if the event is planned.
 * @apiParam {String} type Event type.
 * @apiParam {Number} idClient The ID of the client associated with the event.
 * @apiParam {Number} idAddress The ID of the address of the event.
 * @apiParam {String} startingDate Event starting date.
 * @apiParam {String} startingHour Event starting hour.
 * @apiParam {String} endingHour Event ending hour.
 * @apiParam {Number} idEmployee The ID of the employee associated with the event.
 * @apiParam {String} workToDo Work to be done during the event.
 * @apiSuccess {Object} event Created event object.
 * @apiSuccess {Number} event.idEvent Event ID.
 * @apiSuccess {String} event.title Event title.
 * @apiSuccess {String} event.description Event description.
 * @apiSuccess {Number} event.status Event status.
 * @apiSuccess {Boolean} event.isPlanned Indicates if the event is planned.
 * @apiSuccess {String} event.type Event type.
 * @apiSuccess {Number} event.idClient Client ID associated with the event.
 * @apiSuccess {Number} event.idAddress Address ID associated with the event.
 * @apiSuccess {String} event.startingDate Event starting date.
 * @apiSuccess {String} event.startingHour Event starting hour.
 * @apiSuccess {String} event.endingHour Event ending hour.
 * @apiSuccess {Number} event.idEmployee Employee ID associated with the event.
 * @apiError {String} error Error message.
 */
function createEvent(eventData, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}/events`);
    xhr.withCredentials = true;
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

/**
 * @api {post} /reports Create a new report
 * @apiName CreateReport
 * @apiGroup Reports
 * @apiVersion 1.0.0
 * @apiParam {String} breakdown The reported breakdown.
 * @apiParam {String} workDone The work done.
 * @apiParam {Boolean} reschedule Indicates if rescheduling is necessary.
 * @apiParam {String} startingDate The starting date of the intervention.
 * @apiParam {String} startingHour The starting hour of the intervention.
 * @apiParam {String} endingHour The ending hour of the intervention.
 * @apiParam {Number} duration The duration of the intervention.
 * @apiParam {String} clientSignature The client's signature.
 * @apiParam {String} employeeSignature The employee's signature.
 * @apiParam {Number} idEvent The ID of the associated event.
 * @apiSuccess {Object} report Created report object.
 * @apiSuccess {Number} report.idReport Report ID.
 * @apiSuccess {String} report.breakdown The reported breakdown.
 * @apiSuccess {String} report.workDone The work done.
 * @apiSuccess {Boolean} report.reschedule Indicates if rescheduling is necessary.
 * @apiSuccess {String} report.startingDate The starting date of the intervention.
 * @apiSuccess {String} report.startingHour The starting hour of the intervention.
 * @apiSuccess {String} report.endingHour The ending hour of the intervention.
 * @apiSuccess {Number} report.duration The duration of the intervention.
 * @apiSuccess {String} report.clientSignature The client's signature.
 * @apiSuccess {String} report.employeeSignature The employee's signature.
 * @apiSuccess {Number} report.idEvent The ID of the associated event.
 * @apiError {String} error Error message.
 */
function createReport(newReport, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}/reports`);
    xhr.withCredentials = true;
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

/**
 * @api {get} /reports/:idEvent Get report by ID
 * @apiName GetReportById
 * @apiGroup Reports
 * @apiVersion 1.0.0
 * @apiParam {Number} idEvent The ID of the associated event.
 * @apiSuccess {Object} report The report object.
 * @apiSuccess {Number} report.idReport Report ID.
 * @apiSuccess {String} report.breakdown The reported breakdown.
 * @apiSuccess {String} report.workDone The work done.
 * @apiSuccess {Boolean} report.reschedule Indicates if rescheduling is necessary.
 * @apiSuccess {String} report.startingDate The starting date of the intervention.
 * @apiSuccess {String} report.startingHour The starting hour of the intervention.
 * @apiSuccess {String} report.endingHour The ending hour of the intervention.
 * @apiSuccess {Number} report.duration The duration of the intervention.
 * @apiSuccess {String} report.clientSignature The client's signature.
 * @apiSuccess {String} report.employeeSignature The employee's signature.
 * @apiSuccess {Number} report.idEvent The ID of the associated event.
 * @apiError {String} error Error message.
 */
function getReportById(idEvent, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${API_URL}/reports/${idEvent}`);
    xhr.withCredentials = true;
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

/**
 * @api {put} /events/:idEvent Update an existing event
 * @apiName UpdateEvent
 * @apiGroup Events
 * @apiVersion 1.0.0
 * @apiParam {Number} idEvent The ID of the event.
 * @apiParam {String} title The title of the event.
 * @apiParam {String} description The description of the event.
 * @apiParam {Number} status The status of the event.
 * @apiParam {Boolean} isPlanned Indicates if the event is planned.
 * @apiParam {String} type The type of the event.
 * @apiParam {Number} idClient The ID of the client associated with the event.
 * @apiParam {Number} idAddress The ID of the address of the event.
 * @apiParam {String} startingDate The starting date of the event.
 * @apiParam {String} startingHour The starting hour of the event.
 * @apiParam {String} endingHour The ending hour of the event.
 * @apiParam {Number} idEmployee The ID of the employee associated with the event.
 * @apiParam {String} workToDo The work to be done during the event.
 * @apiSuccess {Object} event The updated event object.
 * @apiSuccess {Number} event.idEvent Event ID.
 * @apiSuccess {String} event.title Event title.
 * @apiSuccess {String} event.description Event description.
 * @apiSuccess {Number} event.status Event status.
 * @apiSuccess {Boolean} event.isPlanned Indicates if the event is planned.
 * @apiSuccess {String} event.type Event type.
 * @apiSuccess {Object} event.client Client associated with the event.
 * @apiSuccess {Object} event.address Event address.
 * @apiSuccess {String} event.startingDate Event starting date.
 * @apiSuccess {String} event.startingHour Event starting hour.
 * @apiSuccess {String} event.endingHour Event ending hour.
 * @apiSuccess {Object} event.employee Employee associated with the event.
 * @apiSuccess {String} event.workToDo Work to be done during the event.
 * @apiError {String} error Error message.
 */
function updateEvent(eventData, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `${API_URL}/events/${eventData.idEvent}`);
    xhr.withCredentials = true;
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

/**
 * @api {post} /employees Create a new employee account
 * @apiName CreateEmployee
 * @apiGroup Employees
 * @apiVersion 1.0.0
 * @apiParam {String} firstname The first name of the employee.
 * @apiParam {String} lastname The last name of the employee.
 * @apiParam {String} job The job title of the employee.
 * @apiParam {String} phoneNumber The phone number of the employee.
 * @apiParam {String} email The email of the employee.
 * @apiParam {Boolean} [isAdmin=false] Indicates if the employee is an administrator.
 * @apiParam {String} [password=""] The password of the employee.
 * @apiParam {String} speciality The speciality of the employee.
 * @apiSuccess {Object} employee The created employee object.
 * @apiSuccess {Number} employee.idEmployee Employee ID.
 * @apiSuccess {String} employee.firstname Employee first name.
 * @apiSuccess {String} employee.lastname Employee last name.
 * @apiSuccess {String} employee.job Employee job title.
 * @apiSuccess {String} employee.phoneNumber Employee phone number.
 * @apiSuccess {String} employee.email Employee email.
 * @apiSuccess {Boolean} employee.isAdmin Indicates if the employee is an administrator.
 * @apiSuccess {String} employee.password Employee password.
 * @apiSuccess {String} employee.speciality Employee speciality.
 * @apiError {String} error Error message.
 */
function createAccount(employeeData, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}/auth/create-account`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
            console.log("Compte employé créé");
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error("Erreur de création du compte", xhr.statusText);
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send(JSON.stringify(employeeData));
}

/**
 * @api {post} /employees/login Employee login
 * @apiName LoginEmployee
 * @apiGroup Employees
 * @apiVersion 1.0.0
 * @apiParam {String} email The email of the employee.
 * @apiParam {String} password The password of the employee.
 * @apiSuccess {String} token The authentication token.
 * @apiSuccess {Object} employee The logged-in employee object.
 * @apiSuccess {Number} employee.idEmployee Employee ID.
 * @apiSuccess {String} employee.firstname Employee first name.
 * @apiSuccess {String} employee.lastname Employee last name.
 * @apiSuccess {String} employee.job Employee job title.
 * @apiSuccess {String} employee.phoneNumber Employee phone number.
 * @apiSuccess {String} employee.email Employee email.
 * @apiSuccess {Boolean} employee.isAdmin Indicates if the employee is an administrator.
 * @apiSuccess {String} employee.speciality Employee speciality.
 * @apiError {String} error Error message.
 */
function loginEmployee(credentials, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}/auth/login`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.withCredentials = true;
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            // Stocker le firstname et lastname dans le localStorage
            if (response.firstname && response.lastname) {
                localStorage.setItem("firstname", response.firstname);
                localStorage.setItem("lastname", response.lastname);
                localStorage.setItem("idEmployee", response.idEmployee);
            }

            callback(null, response);
        } else {
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send(JSON.stringify(credentials));
}

/**
 * @api {get} /employees/:idEmployee Get employee by ID
 * @apiName GetEmployeeById
 * @apiGroup Employees
 * @apiVersion 1.0.0
 * @apiParam {Number} idEmployee The ID of the employee.
 * @apiSuccess {Object} employee The employee object.
 * @apiSuccess {Number} employee.idEmployee Employee ID.
 * @apiSuccess {String} employee.firstname Employee first name.
 * @apiSuccess {String} employee.lastname Employee last name.
 * @apiSuccess {String} employee.job Employee job title.
 * @apiSuccess {String} employee.phoneNumber Employee phone number.
 * @apiSuccess {String} employee.email Employee email.
 * @apiSuccess {Boolean} employee.isAdmin Indicates if the employee is an administrator.
 * @apiSuccess {String} employee.speciality Employee speciality.
 * @apiError {String} error Error message.
 */
function getEmployeeById(idEmployee, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${API_URL}/employees/${idEmployee}`);
    xhr.withCredentials = true;
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

/**
 * @api {get} /clients/:idClient Get client by ID
 * @apiName GetClientById
 * @apiGroup Clients
 * @apiVersion 1.0.0
 * @apiParam {Number} idClient The ID of the client.
 * @apiSuccess {Object} client The client object.
 * @apiSuccess {Number} client.idClient Client ID.
 * @apiSuccess {String} client.category Client category.
 * @apiSuccess {String} client.firstname Client first name.
 * @apiSuccess {String} client.lastname Client last name.
 * @apiSuccess {String} client.email Client email.
 * @apiSuccess {Object} client.address Client address.
 * @apiSuccess {String} client.address.address Client address.
 * @apiSuccess {String} client.address.city Client city.
 * @apiSuccess {String} client.address.zipcode Client zipcode.
 * @apiSuccess {String} client.phoneNumber Client phone number.
 * @apiSuccess {String} client.company Client company.
 * @apiError {String} error Error message.
 */
function getClientById(idClient, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${API_URL}/clients/${idClient}`);
    xhr.withCredentials = true;
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

/**
 * @api {get} /company Get company information
 * @apiName GetCompany
 * @apiGroup Company
 * @apiVersion 1.0.0
 * @apiSuccess {Object} company The company object.
 * @apiSuccess {Number} company.idCompany Company ID.
 * @apiSuccess {String} company.name Company name.
 * @apiSuccess {String} company.phoneNumber Company phone number.
 * @apiSuccess {Object} company.idAddress Company address.
 * @apiSuccess {String} company.idAddress.address Company address.
 * @apiSuccess {String} company.idAddress.city Company city.
 * @apiSuccess {String} company.idAddress.zipcode Company zipcode.
 * @apiSuccess {String} company.siret Company SIRET number.
 * @apiSuccess {String} company.vatNumber Company VAT number.
 * @apiSuccess {Number} company.capital Company capital.
 * @apiSuccess {String} company.logo Company logo in base64.
 * @apiSuccess {String} company.databaseVersion Company database version.
 * @apiError {String} error Error message.
 */
function getCompany(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${API_URL}/company`);
    xhr.withCredentials = true; // les cookies sont envoyés avec la requête http
    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText));
        } else if (xhr.status === 404 && xhr.withCredentials === false) {
            console.error(
                "Erreur de récupération des informations de la société",
                xhr.statusText
            );
            callback(new Error(xhr.statusText), null);
        } else if (xhr.status === 403) {
            // Rediriger vers la page d'erreur 403 si l'utilisateur n'est pas autorisé
            window.location.href = "http://localhost:3000/login";
        } else {
            console.error(
                "Erreur de récupération des informations de la société",
                xhr.statusText
            );
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send();
}

/**
 * @api {delete} /events/:idEvent Delete an event
 * @apiName DeleteEvent
 * @apiGroup Events
 * @apiVersion 1.0.0
 * @apiParam {Number} idEvent The ID of the event.
 * @apiSuccess {Object} event The deleted event object.
 * @apiSuccess {Number} event.idEvent Event ID.
 * @apiSuccess {String} event.title Event title.
 * @apiSuccess {String} event.description Event description.
 * @apiSuccess {Number} event.status Event status.
 * @apiSuccess {Boolean} event.isPlanned Indicates if the event is planned.
 * @apiSuccess {String} event.type Event type.
 * @apiSuccess {Number} event.idClient Client ID associated with the event.
 * @apiSuccess {Number} event.idAddress Address ID associated with the event.
 * @apiSuccess {String} event.startingDate Event starting date.
 * @apiSuccess {String} event.startingHour Event starting hour.
 * @apiSuccess {String} event.endingHour Event ending hour.
 * @apiSuccess {Number} event.idEmployee Employee ID associated with the event.
 * @apiError {String} error Error message.
 */
function deleteEvent(idEvent, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `${API_URL}/events/${idEvent}`);
    xhr.withCredentials = true;
    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error(
                "Erreur de suppression de l'événement",
                xhr.statusText
            );
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send();
}

/**
 * @api {put} /company Update company information
 * @apiName UpdateCompany
 * @apiGroup Company
 * @apiVersion 1.0.0
 * @apiParam {Number} idCompany The ID of the company.
 * @apiParam {String} name The name of the company.
 * @apiParam {String} phoneNumber The phone number of the company.
 * @apiParam {Object} idAddress The address of the company.
 * @apiParam {String} idAddress.address The address of the company.
 * @apiParam {String} idAddress.city The city of the company.
 * @apiParam {String} idAddress.zipcode The zipcode of the company.
 * @apiParam {String} siret The SIRET number of the company.
 * @apiParam {String} vatNumber The VAT number of the company.
 * @apiParam {Number} capital The capital of the company.
 * @apiParam {String} logo The logo of the company in base64.
 * @apiParam {String} databaseVersion The database version of the company.
 * @apiSuccess {Object} company The updated company object.
 * @apiSuccess {Number} company.idCompany Company ID.
 * @apiSuccess {String} company.phoneNumber Company phone number.
 * @apiSuccess {Object} company.idAddress Company address.
 * @apiSuccess {String} company.idAddress.address Company address.
 * @apiSuccess {String} company.idAddress.city Company city.
 * @apiSuccess {String} company.idAddress.zipcode Company zipcode.
 * @apiSuccess {String} company.siret Company SIRET number.
 * @apiSuccess {String} company.vatNumber Company VAT number.
 * @apiSuccess {Number} company.capital Company capital.
 * @apiSuccess {String} company.logo Company logo in base64.
 * @apiSuccess {String} company.databaseVersion Company database version.
 * @apiError {String} error Error message.
 */
function updateCompany(companyData, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `${API_URL}/company`);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("Informations de la société mises à jour");
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error(
                "Erreur de mise à jour des informations de la société",
                xhr.statusText
            );
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send(JSON.stringify(companyData));
}

/**
 * @api {put} /employees/:idEmployee Update employee information
 * @apiName UpdateEmployee
 * @apiGroup Employees
 * @apiVersion 1.0.0
 * @apiParam {Number} idEmployee The ID of the employee.
 * @apiParam {String} firstname The first name of the employee.
 * @apiParam {String} lastname The last name of the employee.
 * @apiParam {String} job The job title of the employee.
 * @apiParam {String} phoneNumber The phone number of the employee.
 * @apiParam {String} email The email of the employee.
 * @apiParam {Boolean} isAdmin Indicates if the employee is an administrator.
 * @apiParam {String} password The password of the employee.
 * @apiParam {String} speciality The speciality of the employee.
 * @apiSuccess {Object} employee The updated employee object.
 * @apiSuccess {Number} employee.idEmployee Employee ID.
 * @apiSuccess {String} employee.firstname Employee first name.
 * @apiSuccess {String} employee.lastname Employee last name.
 * @apiSuccess {String} employee.job Employee job title.
 * @apiSuccess {String} employee.phoneNumber Employee phone number.
 * @apiSuccess {String} employee.email Employee email.
 * @apiSuccess {Boolean} employee.isAdmin Indicates if the employee is an administrator.
 * @apiSuccess {String} employee.password Employee password.
 * @apiSuccess {String} employee.speciality Employee speciality.
 * @apiError {String} error Error message.
 */
function updateEmployee(employeeData, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `${API_URL}/employees/${employeeData.idEmployee}`);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("Informations de l'employé mises à jour");
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error(
                "Erreur de mise à jour des informations de l'employé",
                xhr.statusText
            );
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send(JSON.stringify(employeeData));
}

/**
 * @api {put} /clients/:idClient Update client information
 * @apiName UpdateClient
 * @apiGroup Clients
 * @apiVersion 1.0.0
 * @apiParam {Number} idClient The ID of the client.
 * @apiParam {String} category The category of the client.
 * @apiParam {String} firstname The first name of the client.
 * @apiParam {String} lastname The last name of the client.
 * @apiParam {String} email The email of the client.
 * @apiParam {String} phoneNumber The phone number of the client.
 * @apiParam {String} company The company of the client.
 * @apiParam {Object} addressDetails The address details of the client.
 * @apiParam {String} addressDetails.address The address of the client.
 * @apiParam {String} addressDetails.city The city of the client.
 * @apiParam {String} addressDetails.zipcode The zipcode of the client.
 * @apiSuccess {Object} client The updated client object.
 * @apiSuccess {Number} client.idClient Client ID.
 * @apiSuccess {String} client.category Client category.
 * @apiSuccess {String} client.firstname Client first name.
 * @apiSuccess {String} client.lastname Client last name.
 * @apiSuccess {String} client.email Client email.
 * @apiSuccess {Object} client.address Client address.
 * @apiSuccess {String} client.address.address Client address.
 * @apiSuccess {String} client.address.city Client city.
 * @apiSuccess {String} client.address.zipcode Client zipcode.
 * @apiSuccess {String} client.phoneNumber Client phone number.
 * @apiSuccess {String} client.company Client company.
 * @apiError {String} error Error message.
 */
function updateClient(clientData, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `${API_URL}/clients/${clientData.idClient}`);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error(
                "Erreur de mise à jour des informations du client",
                xhr.statusText
            );
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send(JSON.stringify(clientData));
}

/**
 * @api {post} /clients Create a new client
 * @apiName CreateClient
 * @apiGroup Clients
 * @apiVersion 1.0.0
 * @apiParam {String} category The category of the client.
 * @apiParam {String} company The company of the client.
 * @apiParam {String} firstname The first name of the client.
 * @apiParam {String} lastname The last name of the client.
 * @apiParam {String} email The email of the client.
 * @apiParam {Object} addressDetails The address details of the client.
 * @apiParam {String} addressDetails.address The address of the client.
 * @apiParam {String} addressDetails.city The city of the client.
 * @apiParam {String} addressDetails.zipcode The zipcode of the client.
 * @apiParam {String} phoneNumber The phone number of the client.
 * @apiSuccess {Object} client The created client object.
 * @apiSuccess {Number} client.idClient Client ID.
 * @apiSuccess {String} client.category Client category.
 * @apiSuccess {String} client.firstname Client first name.
 * @apiSuccess {String} client.lastname Client last name.
 * @apiSuccess {String} client.email Client email.
 * @apiSuccess {Object} client.address Client address.
 * @apiSuccess {String} client.address.address Client address.
 * @apiSuccess {String} client.address.city Client city.
 * @apiSuccess {String} client.address.zipcode Client zipcode.
 * @apiSuccess {String} client.phoneNumber Client phone number.
 * @apiSuccess {String} client.company Client company.
 * @apiError {String} error Error message.
 */
function createClient(clientData, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}/clients`);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
            console.log("Client créé");
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error("Erreur de création du client", xhr.statusText);
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send(JSON.stringify(clientData));
}

/**
 * @api {post} /employees Create a new employee
 * @apiName CreateEmployee
 * @apiGroup Employees
 * @apiVersion 1.0.0
 * @apiParam {String} firstname The first name of the employee.
 * @apiParam {String} lastname The last name of the employee.
 * @apiParam {String} job The job title of the employee.
 * @apiParam {String} phoneNumber The phone number of the employee.
 * @apiParam {String} email The email of the employee.
 * @apiParam {Boolean} [isAdmin=false] Indicates if the employee is an administrator.
 * @apiParam {String} [password=""] The password of the employee.
 * @apiParam {String} speciality The speciality of the employee.
 * @apiSuccess {Object} employee The created employee object.
 * @apiSuccess {Number} employee.idEmployee Employee ID.
 * @apiSuccess {String} employee.firstname Employee first name.
 * @apiSuccess {String} employee.lastname Employee last name.
 * @apiSuccess {String} employee.job Employee job title.
 * @apiSuccess {String} employee.phoneNumber Employee phone number.
 * @apiSuccess {String} employee.email Employee email.
 * @apiSuccess {Boolean} employee.isAdmin Indicates if the employee is an administrator.
 * @apiSuccess {String} employee.password Employee password.
 * @apiSuccess {String} employee.speciality Employee speciality.
 * @apiError {String} error Error message.
 */
function createEmployee(employeeData, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}/employees`);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
            console.log("Employé créé");
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error("Erreur de création de l'employé", xhr.statusText);
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send(JSON.stringify(employeeData));
}

/**
 * @api {post} /company Create a new company
 * @apiName CreateCompany
 * @apiGroup Company
 * @apiVersion 1.0.0
 * @apiParam {String} phoneNumber The phone number of the company.
 * @apiParam {Object} idAddress The address of the company.
 * @apiParam {String} idAddress.address The address of the company.
 * @apiParam {String} idAddress.city The city of the company.
 * @apiParam {String} idAddress.zipcode The zipcode of the company.
 * @apiParam {String} siret The SIRET number of the company.
 * @apiParam {String} vatNumber The VAT number of the company.
 * @apiParam {Number} capital The capital of the company.
 * @apiParam {String} logo The logo of the company in base64.
 * @apiParam {String} databaseVersion The database version of the company.
 * @apiSuccess {Object} company The created company object.
 * @apiSuccess {Number} company.idCompany Company ID.
 * @apiSuccess {String} company.phoneNumber Company phone number.
 * @apiSuccess {String} company.phoneNumber Company phone number.
 * @apiSuccess {Object} company.idAddress Company address.
 * @apiSuccess {String} company.idAddress.address Company address.
 * @apiSuccess {String} company.idAddress.city Company city.
 * @apiSuccess {String} company.idAddress.zipcode Company zipcode.
 * @apiSuccess {String} company.siret Company SIRET number.
 * @apiSuccess {String} company.vatNumber Company VAT number.
 * @apiSuccess {Number} company.capital Company capital.
 * @apiSuccess {String} company.logo Company logo in base64.
 * @apiSuccess {String} company.databaseVersion Company database version.
 * @apiError {String} error Error message.
 */
function createCompany(companyData, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}/company`);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
            console.log("Société créée");
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error("Erreur de création de la société", xhr.statusText);
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send(JSON.stringify(companyData));
}

/**
 * @api {get} /documents Get all documents
 * @apiName GetAllDocuments
 * @apiGroup Documents
 * @apiVersion 1.0.0
 * @apiSuccess {Object[]} documents List of documents.
 * @apiSuccess {Number} documents.idDocument Document ID.
 * @apiSuccess {String} documents.title Document title.
 * @apiSuccess {String} documents.brand Document brand.
 * @apiSuccess {String} documents.model Document model.
 * @apiSuccess {String} documents.file URL to download the document.
 * @apiError {String} error Error message.
 */
function getAllDocuments(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${API_URL}/documents`);
    xhr.withCredentials = true;
    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            window.location.href = "http://localhost:3000/login";
            console.error(
                "Erreur de récupération des document",
                xhr.statusText
            );
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send();
}

function importDocument(formData, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}/documents`);
    xhr.withCredentials = true;
    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
            console.log("Document importé");
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error("Erreur d'importation du document", xhr.statusText);
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send(formData);
}

function getDocumentById(idDocument, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${API_URL}/documents/${idDocument}`);
    xhr.withCredentials = true;
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

function getAllNotifications(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${API_URL}/notifications`);
    xhr.withCredentials = true;
    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error(
                "Erreur de récupération des notifications",
                xhr.statusText
            );
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send();
}

function createNotification(notificationData, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}/notifications`);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
            console.log("Notification créée");
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error(
                "Erreur de création de la notification",
                xhr.statusText
            );
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send(JSON.stringify(notificationData));
}

function getAllEventStatistics(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${API_URL}/statistics`);
    xhr.withCredentials = true;
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(JSON.parse(xhr.responseText));
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error(
                "Erreur de récupération des statistiques",
                xhr.statusText
            );
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send();
}

function downloadDocument(idDocument, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${API_URL}/documents/download/${idDocument}`);
    xhr.withCredentials = true;
    xhr.responseType = "blob";
    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(null, xhr.response);
        } else {
            console.error(
                "Erreur de téléchargement du document",
                xhr.statusText
            );
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send();
}

function getAllInvoices(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${API_URL}/invoices`);
    xhr.withCredentials = true;
    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error(
                "Erreur de récupération des factures",
                xhr.statusText
            );
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send();
}

function importInvoice(formData, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}/invoices`);
    xhr.withCredentials = true;
    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
            console.log("Facture importée");
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error("Erreur d'importation de la facture", xhr.statusText);
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send(formData);
}

function sendReport(emailData, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}/email`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.withCredentials = true;
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(JSON.parse(xhr.responseText));
            callback(null, JSON.parse(xhr.responseText));
        } else {
            console.error("Erreur d'envois du mail", xhr.statusText);
            callback(new Error(xhr.statusText), null);
        }
    };
    xhr.send(JSON.stringify(emailData));
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
    getCompany,
    deleteEvent,
    updateCompany,
    updateEmployee,
    updateClient,
    createClient,
    createEmployee,
    createCompany,
    getAllDocuments,
    importDocument,
    getDocumentById,
    createNotification,
    getAllNotifications,
    getAllEventStatistics,
    downloadDocument,
    getAllInvoices,
    importInvoice,
    sendReport,
};
