<p align="center">
    <img alt="Logo" src="frontend/src/images/logo.svg" width=300 align="center">
</p>

<p align="center">
    <a href="https://github.com/JulienLach/EffiTech/releases">
        <img src="https://img.shields.io/badge/Release-0.9.3-red?logo=github" alt="Release" />
    </a>
    <a href="https://hub.docker.com/r/julienlach/effitech/tags">
        <img src="https://img.shields.io/badge/Docker-Hub-red?logo=docker&logoColor=white" alt="Docker Hub" />
    </a>
    <a href="#documentation">
        <img src="https://img.shields.io/badge/API-Documented-red" alt="API Documentation" />
    </a>
</p>

## Table of Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Requirements](#requirements)
-   [How to run the app](#how-to-run-the-app)
-   [Email configuration](#email-configuration)
-   [Testing](#testing)
-   [CI/CD](#cicd)
-   [Deployment with Ansible and Docker](#deployment-with-ansible-and-docker)
-   [Docker images](#docker-images)
-   [Documentation](#documentation)

### <a name="overview"></a> Overview

-   EffiTech is an intervention management application built as a Progressive Web App (PWA). Manage scheduling of interventions for technicians.

### <a name="features"></a> Features

-   Individual management of technicians on the move with scheduling.
-   Manage your employees and your clients
-   Creation of reports with details and client signature.
-   Assignment of qualified technicians by supervisors.
-   Access to necessary technical data before the intervention with documents

### <a name="requirements"></a> Requirements

-   PostgreSQL 17
-   Node.js 18 or above
-   React 18.3.1 or above
-   Docker

### <a name="how-to-run-the-app"></a> How to run the app

#### For Linux users

-   Install **Node.js 18** and **npm** :

```bash
# Add the NodeSource repository for Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Update the package list
sudo apt-get update

# Install Node.js (which includes npm)
sudo apt-get install -y nodejs

# Verify the installation
node -v
npm -v
```

-   Install **PostgreSQL 17** :

```bash
# Add the PostgreSQL Global Development Group (PGDG) repository
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo tee /usr/share/keyrings/pgdg.asc

# Add the PostgreSQL repository to your sources list
echo "deb [signed-by=/usr/share/keyrings/pgdg.asc] http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" | sudo tee /etc/apt/sources.list.d/pgdg.list

# Update the package list to include the new repository
sudo apt-get update

# Install PostgreSQL 17
sudo apt-get install -y postgresql-17

# Check the installation
psql --version

# Check the status of PostgreSQL service
sudo systemctl status postgresql

# Enable auto-start on boot
sudo systemctl enable postgresql
```

-   Install **pgAdmin4** :

```bash
sudo apt update && sudo apt upgrade -y

curl -fsS https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo gpg --dearmor -o /usr/share/keyrings/packages-pgadmin-org.gpg

sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/packages-pgadmin-org.gpg] https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list'

sudo apt update

sudo apt install pgadmin4-desktop -y
```

For Linux users, after installing pgadmin4 and postgreSQL you need to set password for postgres user. Be sure to set the same password in your `.env` file.

```bash
sudo -u postgres psql
```

```bash
ALTER USER postgres PASSWORD 'postgres';
```

-   Then open pgaAdmin and create a **new database**, run `database_script.sql` in SQL query field

To start a new server in pgadmin4, create a new server, add `127.0.0.1` to hostname, with postgres user and the password you set previous step, then click on save. Now the server should be connected and you can see the databases.

#### For Windows users

For windows users, you can download the lastest vresion of PostgreSQL from https://www.enterprisedb.com/downloads/postgres-postgresql-downloads and follow the installation steps. During the installation, you will be prompted to set a password for the `postgres` user. Make sure to remember this password as you will need it later.

Then you can download the official installer of pgAdmin from https://www.pgadmin.org/download/pgadmin-4-windows/ and follow the installation steps. After installation, you can open pgAdmin4 and create a new server with the same settings as above.

#### Configure the .env file

Create a `.env` file in the root of your backend project and add the following content, replacing newpassword with the password you set for the postgres user:

```bash
# Environment
NODE_ENV=development
PORT_BACKEND=3001
PORT_FRONTEND=3000

# Database
DB_USER=postgres
DB_HOST=localhost
DB_NAME=EffiTech
DB_PASSWORD=postgres
DB_PORT=5432
DATABASE_VERSION=x.x.x

# Authentication
JWT_SECRET=**********************

# Email SMTP
EMAIL=exemple@mail.com
MAILJET_API_KEY=*****************
MAILJET_SECRET_KEY=**************

# URLs
ORIGIN_URL=http://localhost:3000
SERVER_URL=http://localhost:3001
```

For `JWT_SECRET`, generate a random token and replace your_randomly_generated_token with it. You can use a command like the following to generate a secure token:

```bash
openssl rand -hex 64
```

For `DATABASE_VERSION`, you must set the latest release version of the application.

#### Install project dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

#### Start the PostgreSQL server

Ensure the PostgreSQL server is running :

```bash
sudo systemctl start postgresql
```

To launch the app run :

```bash
cd backend
npm start

cd frontend
npm start
```

And access the application at http://localhost:3000 or at the `ORIGIN_URL` defined in your `.env` file.

### <a name="email-configuration"></a> Email configuration

To configure email sending, you can use **Mailjet** or any other SMTP service. Just add your email created from your web hosting provider and API keys from your SMTP provider in the `.env` file as shown above.

### <a name="testing"></a> Testing

This project uses **Jest**, **ESLint**, and **Prettier**.

-   **JEST** for test scripts :
    -   Run `npm test` or `npx jest` to execute all tests written in the `/tests` folder. This will output all errors and a coverage report.
-   **ESLint** and **Prettier** for code quality and formatting :
    -   Run `npx eslint path/to/your/file` to check for code errors.

### <a name="cicd"></a> CI/CD

This project uses **GitHub Actions** to automate unit tests and create new releases.

-   **CI** is triggered when you push commits to the `develop` branch. It runs all unit tests.

-   To automatically run **CD** actions, follow these steps:

    -   Update `README.md` and `CHANGELOG.md` and `migration.js` with all new changes and fixes and add the new tag [x.x.x] (yyyy-dd-mm)
    -   Merge your current working branch into the `develop` branch
    -   Create a new pull request (PR) to merge `develop` into `main`, check all the code.
    -   Merge your PR `develop` into `main`
    -   Locally in your terminal, switch to the `main` branch:
        ```sh
        git checkout main
        ```
    -   Pull the latest changes from `main`:
        ```sh
        git pull origin main
        ```
    -   Create a new tag:
        ```sh
        git tag -a x.x.x -m "Release version x.x.x"
        ```
    -   Push the new tag:
        ```sh
        git push origin x.x.x
        ```

    After these steps, the release should be automatically created on GitHub, and the Docker images should be pushed to Docker Hub with the tag as defined in `cd.yml`.

-   If you need to delete a local and remote tag, use the following commands:
    -   List all tags:
        ```sh
        git tag
        ```
    -   Delete the local tag:
        ```sh
        git tag -d x.x.x
        ```
    -   Delete the remote tag:
        ```sh
        git push origin :refs/tags/x.x.x
        ```

### <a name="deployment-with-ansible-and-docker"></a> Deployment with Ansible and Docker

This project uses **Ansible** to deploy the application on a remote server.

For every new deployement with new version, you need to update the `migration.js`. For example :

```javascript
const migrations = [
    {
        version: "0.9.3", // Target version for this migration/release
        updateDatabase: async () => {
            // Add some SQL queries to update the database data
            // Then update the database version to the new version
            await client.query(`
                UPDATE companies SET database_version = '0.9.3';
            `);
        },
    },
];
```

Then in your `vars.yml` file, you need to update the `database_version` variable to the new version.

```yaml
database_version: "0.9.3"
```

To deploy the application with Ansible, use :

```bash
ansible-playbook -i inventory.ini deploy.yml --ask-vault-pass -e "ansible_tag_name=x.x.x" --become --become-user=root --ask-become-pass
```

Where:

-   `inventory.ini` defines targeted servers
-   `deploy.yml` contains the deployment playbook
-   `vars.yml` (encrypted with ansible-vault) contains environment variables
-   `x.x.x` is the latest release tag to deploy

The `vars.yml` file should be encrypted using `ansible-vault create vars.yml` and structured like this:

```yaml
# Environment
node_env: "docker" # Must be "docker" for production environment
port_backend: "3001"
port_frontend: "3000"

# Database
db_user: "myuser"
db_host: "db" # Always "db" when using Docker containers
db_name: "EffiTech"
db_password: "secure_password"
db_port: "5432"
database_version: "0.9.3" # Latest release version

# Authentication
jwt_secret: "*********************************"

# Email SMTP
email: "contact@yourdomain.com"
mailjet_api_key: "****************************"
mailjet_secret_key: "*************************"

# URLs
origin_url: "https://client.yourdomain.com"
server_url: "https://client.yourdomain.com"
```

This structure mirrors your local `.env` file but with production values. You can create or edit this file using:

```bash
# Create a new encrypted file
ansible-vault create vars.yml

# Edit an existing encrypted file
ansible-vault edit vars.yml

# View the content of an encrypted file
ansible-vault view vars.yml
```

### <a name="docker-images"></a> Docker

The app is divided into three images : for backend, frontend, and for the database.

You can run the app in Docker with `docker-compose up --build` or `docker-compose up --build -d`

To stop run `docker-compose down`

The `docker-compose.yml` file is used for local development and builds images from the project Dockerfiles :

```yaml
# Start the application in development environment
docker-compose up --build

# Detached container mode
docker-compose up --build -d

# Stop the application
docker-compose down
```

The `docker-compose.prod.yml` file is used for production deployment with Ansible and uses pre-built images from Docker Hub:

```yaml
# Structure of docker-compose.prod.yml file
services:
    backend:
        image: julienlach/effitech:backend-${TAG_NAME}
        # ...

    frontend:
        image: julienlach/effitech:frontend-${TAG_NAME}
        # ...

    db:
        image: julienlach/effitech:postgres-${TAG_NAME}
        # ...
```

-   Docker Hub latest images : https://hub.docker.com/r/julienlach/effitech/tags

### <a name="documentation"></a> Documentation

This project uses **JSDoc** and **apidoc** to generate documentation.

-   **JSDoc** : Move to `/backend` folder, run `npm run doc` to generate documentation for the `/data` files.
-   **apidoc** : Move to `/backend` folder, for API documentation written in the `/services/api.js` file, run `npm run apidoc`.

Then to see the documentation pages, run `index.html` from both folders with LiveServer VSCode extension for exemple.
