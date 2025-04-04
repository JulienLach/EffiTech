<p align="center">
 <img alt="Logo" src="frontend/src/images/logo.svg" width=400 align="center">
</p>

<p align="center">
    <a href="https://github.com/JulienLach/EffiTech/releases">
        <img src="https://img.shields.io/badge/Release-0.9.0-red?logo=github" alt="Release" />
    </a>
</p>

## Table of Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Requirements](#requirements)
-   [How to run the app](#how-to-run-the-app)
-   [Testing](#testing)
-   [CI/CD](#cicd)
-   [Docker](#docker)
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

-   PostgreSQL 15.10
-   Node.js 18.19.0
-   React 18.3.1
-   Docker

### <a name="how-to-run-the-app"></a> How to run the app

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

-   Install **PostgreSQL 15** :

```bash
# Add the PostgreSQL APT repository
echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" | sudo tee /etc/apt/sources.list.d/pgdg.list

# Import the repository signing key
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

# Update the package list
sudo apt-get update

# Install PostgreSQL 15
sudo apt-get install -y postgresql-15

# Verify the installation
psql --version
```

-   Install **pgAdmin4** to manage the database, please follow official doc at https://www.pgadmin.org/download/pgadmin-4-apt/
-   Create a **new database** and run `database_script.sql` in **pgAdmin4** in SQL query field

For Linux/Debian OS, after installing pgadmin4 and postgreSQL you need to set password for postgres user. Besure to set the same password in your `.env` file.

```bash
sudo -u postgres psql
```

```bash
ALTER USER postgres PASSWORD 'postgres';
```

To start a new server in pgadmin4, create a new server, add `127.0.0.1` to hostname, with postgres user and the password you set previous step, then click on save. Now to database and the server are running.

#### Configure the .env file

Create a `.env` file in the root of your backend project and add the following content, replacing newpassword with the password you set for the postgres user:

```bash
# Environment
NODE_ENV=development
PORT=3001

# Database
DB_USER=postgres
DB_HOST=localhost
DB_NAME=EffiTech
DB_PASSWORD=postgres
DB_PORT=5432
DATABASE_VERSION=x.x.x

# Authentication
JWT_SECRET=**************

# Email SMTP
EMAIL=exemple@mail.com
MAILJET_API_KEY=***************
MAILJET_SECRET_KEY=**************

# URLs
ORIGIN_URL=http://localhost:3000
SERVER_URL=http://localhost:3001
```

For `JWT_SECRET`, generate a random token and replace your_randomly_generated_token with it. You can use a command like the following to generate a secure token:

```bash
openssl rand -base64 32
```

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

And access the application at http://localhost:3000

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

    -   Update `README.md` and `CHANGELOG.md` with all new changes and fixes and add the new tag [x.x.x] (yyyy-dd-mm)
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

### <a name="docker"></a> Docker

The app is divided into three images: one for the backend, one for the frontend, and one for the database.

You can run the app in Docker with `docker-compose up --build` or `docker-compose up --build -d`

To stop run `docker-compose down`

Docker Hub latest images : https://hub.docker.com/r/julienlach/effitech/tags

### <a name="documentation"></a> Documentation

This project uses **JSDoc** and **apidoc** to generate documentation.

-   **JSDoc** : Move to `/backend` folder, run `npm run doc` to generate documentation for the `/data` files.
-   **apidoc** : Move to `/backend` folder, for API documentation written in the `/services/api.js` file, run `npm run apidoc`.

Then to see the documentation pages, run `index.html` from both folders with LiveServer VSCode extension for exemple.
