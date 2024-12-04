CREATE TABLE employees(
   id_employee INT,
   firstname VARCHAR(50) NOT NULL,
   lastname VARCHAR(50) NOT NULL,
   job VARCHAR(50) NOT NULL,
   speciality VARCHAR(50),
   phone_number VARCHAR(20) NOT NULL,
   email VARCHAR(50) NOT NULL,
   is_admin LOGICAL NOT NULL,
   password VARCHAR(128) NOT NULL,
   PRIMARY KEY(id_employee)
);

CREATE TABLE clients(
   id_client INT,
   category VARCHAR(50) NOT NULL,
   company VARCHAR(100),
   firstname VARCHAR(50) NOT NULL,
   lastname VARCHAR(50) NOT NULL,
   email VARCHAR(50) NOT NULL,
   phone_number VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_client)
);

CREATE TABLE documents(
   id_document INT,
   title VARCHAR(100) NOT NULL,
   brand VARCHAR(50) NOT NULL,
   model VARCHAR(50) NOT NULL,
   file BLOB,
   PRIMARY KEY(id_document)
);

CREATE TABLE invoices(
   id_invoice INT,
   amount_including_tax DECIMAL(7,2) NOT NULL,
   amount_without_tax DECIMAL(7,2) NOT NULL,
   invoice_date DATE NOT NULL,
   file BLOB NOT NULL,
   id_client INT NOT NULL,
   PRIMARY KEY(id_invoice),
   FOREIGN KEY(id_client) REFERENCES clients(id_client)
);

CREATE TABLE notifications(
   id_notification INT,
   action VARCHAR(50) NOT NULL,
   type VARCHAR(50) NOT NULL,
   title VARCHAR(50) NOT NULL,
   creation_date DATETIME NOT NULL,
   creation_hour TIME NOT NULL,
   id_employee INT NOT NULL,
   PRIMARY KEY(id_notification),
   FOREIGN KEY(id_employee) REFERENCES employees(id_employee)
);

CREATE TABLE addresses(
   id_address INT,
   address_street VARCHAR(100) NOT NULL,
   zipcode VARCHAR(50) NOT NULL,
   city VARCHAR(50) NOT NULL,
   id_client INT,
   PRIMARY KEY(id_address),
   FOREIGN KEY(id_client) REFERENCES clients(id_client)
);

CREATE TABLE events(
   id_event INT,
   title VARCHAR(50) NOT NULL,
   status INT NOT NULL,
   is_planned LOGICAL,
   type VARCHAR(50) NOT NULL,
   starting_date DATE NOT NULL,
   starting_hour TIME NOT NULL,
   ending_hour TIME NOT NULL,
   description TEXT NOT NULL,
   work_to_do TEXT,
   id_client INT NOT NULL,
   id_address INT NOT NULL,
   id_employee INT NOT NULL,
   PRIMARY KEY(id_event),
   FOREIGN KEY(id_client) REFERENCES clients(id_client),
   FOREIGN KEY(id_address) REFERENCES addresses(id_address),
   FOREIGN KEY(id_employee) REFERENCES employees(id_employee)
);

CREATE TABLE reports(
   id_report INT,
   breakdown TEXT NOT NULL,
   work_done TEXT NOT NULL,
   reschedule LOGICAL,
   starting_date DATE NOT NULL,
   starting_hour TIME NOT NULL,
   ending_hour TIME NOT NULL,
   duration TIME NOT NULL,
   client_signature BLOB NOT NULL,
   employee_signature BLOB NOT NULL,
   id_event INT NOT NULL,
   PRIMARY KEY(id_report),
   UNIQUE(id_event),
   FOREIGN KEY(id_event) REFERENCES events(id_event)
);

CREATE TABLE companies(
   id_company INT,
   phone_number VARCHAR(50),
   siret VARCHAR(50),
   vat_number VARCHAR(50),
   capital VARCHAR(50),
   logo LONGBINARY NOT NULL,
   database_version VARCHAR(50),
   id_address INT NOT NULL,
   PRIMARY KEY(id_company),
   UNIQUE(id_address),
   FOREIGN KEY(id_address) REFERENCES addresses(id_address)
);
