CREATE TABLE employees(
   id_employee SERIAL PRIMARY KEY,
   firstname VARCHAR(50) NOT NULL,
   lastname VARCHAR(50) NOT NULL,
   job VARCHAR(50),
   speciality VARCHAR(50),
   phone_number VARCHAR(20) NOT NULL,
   email VARCHAR(50) NOT NULL,
   is_admin BOOLEAN NOT NULL,
   password VARCHAR(128) NOT NULL
);

CREATE TABLE clients(
   id_client SERIAL PRIMARY KEY,
   category VARCHAR(50) NOT NULL,
   company VARCHAR(100),
   firstname VARCHAR(50) NOT NULL,
   lastname VARCHAR(50) NOT NULL,
   email VARCHAR(50) NOT NULL,
   phone_number VARCHAR(50) NOT NULL
);

CREATE TABLE documents(
   id_document SERIAL PRIMARY KEY,
   title VARCHAR(100) NOT NULL,
   brand VARCHAR(50) NOT NULL,
   model VARCHAR(50) NOT NULL,
   file BYTEA
);

CREATE TABLE invoices(
   id_invoice SERIAL PRIMARY KEY,
   amount_including_tax DECIMAL(7,2) NOT NULL,
   amount_without_tax DECIMAL(7,2) NOT NULL,
   invoice_date DATE NOT NULL,
   file BYTEA NOT NULL,
   id_client INT NOT NULL,
   FOREIGN KEY(id_client) REFERENCES clients(id_client)
);

CREATE TABLE notifications(
   id_notification SERIAL PRIMARY KEY,
   action VARCHAR(50) NOT NULL,
   type VARCHAR(50) NOT NULL,
   title VARCHAR(50) NOT NULL,
   creation_date TIMESTAMP NOT NULL,
   creation_hour TIME NOT NULL,
   id_employee INT NOT NULL,
   FOREIGN KEY(id_employee) REFERENCES employees(id_employee)
);

CREATE TABLE addresses(
   id_address SERIAL PRIMARY KEY,
   address VARCHAR(100) NOT NULL,
   zipcode VARCHAR(50) NOT NULL,
   city VARCHAR(50) NOT NULL,
   id_client INT,
   FOREIGN KEY(id_client) REFERENCES clients(id_client)
);

CREATE TABLE events(
   id_event SERIAL PRIMARY KEY,
   title VARCHAR(50) NOT NULL,
   status INT NOT NULL,
   is_planned BOOLEAN,
   type VARCHAR(50) NOT NULL,
   starting_date DATE NULL,
   starting_hour TIME NULL,
   ending_hour TIME NULL,
   description TEXT NOT NULL,
   work_to_do TEXT,
   id_client INT NOT NULL,
   id_address INT NOT NULL,
   id_employee INT NOT NULL,
   FOREIGN KEY(id_client) REFERENCES clients(id_client),
   FOREIGN KEY(id_address) REFERENCES addresses(id_address),
   FOREIGN KEY(id_employee) REFERENCES employees(id_employee)
);

CREATE TABLE reports(
   id_report SERIAL PRIMARY KEY,
   breakdown TEXT NOT NULL,
   work_done TEXT NOT NULL,
   reschedule BOOLEAN,
   starting_date DATE NOT NULL,
   starting_hour TIME NOT NULL,
   ending_hour TIME NOT NULL,
   duration TIME NOT NULL,
   client_signature BYTEA NOT NULL,
   employee_signature BYTEA NOT NULL,
   id_event INT NOT NULL,
   UNIQUE(id_event),
   FOREIGN KEY(id_event) REFERENCES events(id_event)
);

CREATE TABLE companies(
   id_company SERIAL PRIMARY KEY,
   name VARCHAR(100),
   phone_number VARCHAR(50),
   siret VARCHAR(50),
   vat_number VARCHAR(50),
   capital VARCHAR(50),
   logo BYTEA NOT NULL,
   database_version VARCHAR(50),
   id_address INT NOT NULL,
   UNIQUE(id_address),
   FOREIGN KEY(id_address) REFERENCES addresses(id_address)
);

-- Insérer un utilisateur par défaut
INSERT INTO employees (firstname, lastname, job, phone_number, email, is_admin, password, speciality)
VALUES ('test', 'test', '', '', 'test@gmail.com', true, 'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff', '');