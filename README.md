# Intervention management platform

## Table of Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Requirements](#requirements)
-   [Environment variables configuration](#environment-variables-configuration)
-   [Testing](#testing)
-   [CI/CD](#cicd)
-   [Docker](#docker)
-   [Documentation](#documentation)
-   [End-to-End Functional Test](#end-to-end-functional-test)
-   [Other Functionalities](#other-functionalities)

## <a name="overview"></a> Overview

-   Manage scheduling of interventions for technicians.

## <a name="features"></a> Features

-   Individual management of technicians on the move with scheduling.
-   Manage your employees and your clients
-   Creation of reports with details and client signature.
-   Assignment of qualified technicians by supervisors.
-   Access to necessary technical data before the intervention with documents

## <a name="requirements"></a> Requirements

-   PostgreSQL 15.10
-   Node.js 18.19.0
-   React 18.3.1
-   Docker

## <a name="environment-variables-configuration"></a> Environment variables configuration

You need to create a `.env` file at the root of the project with the following :

-   NODE_ENV=development
-   DB_USER=
-   DB_HOST=
-   DB_NAME=
-   DB_PASSWORD=
-   DB_PORT=
-   PORT=
-   JWT_SECRET=

## <a name="testing"></a> Testing

This project uses **Jest**, **ESLint**, and **Prettier**.

-   **JEST** for test scripts :
    -   Run `npm test` or `npx jest` to execute all tests written in the `/tests` folder. This will output all errors and a coverage report.
-   **ESLint** and **Prettier** for code quality and formatting :
    -   Run `npx eslint path/to/your/file` to check for code errors.

## <a name="cicd"></a> CI/CD

This project uses **GitHub Actions** to automate unit tests and create new releases.

-   **CI** is triggered when you push commits to the `develop` branch. It runs all unit tests.

-   To automatically run **CD** actions, follow these steps:

    -   Merge your current working branch into the `develop` branch.
    -   Create a new pull request (PR) to merge `develop` into `main`.
    -   Don't forget to update de `CHANGELOG.md` file before your `devlop` into `main` PR
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

    After these steps, the release should be automatically created.

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

## <a name="docker"></a> Docker

The app is divided into three images: one for the backend, one for the frontend, and one for the database.

You can run the app in Docker with `docker-compose up --build`.

To stop run `docker-compose down`

## <a name="documentation"></a> Documentation

This project uses **JSDoc** and **apidoc** to generate documentation.

-   **JSDoc**: Move to `/backend` folder, run `npm run doc` to generate documentation for the `/data` files.
-   **apidoc**: Move to `/backend` folder, for API documentation written in the `/services/api.js` file, run `npm run apidoc`.

## <a name="end-to-end-functional-test"></a> End-to-End Functional Test

<details>
<summary>Scenario 1: Plan and Assign Initial Intervention</summary>

1. **Supervisor receives a call from a client reporting a machine failure.**

2. **Supervisor logs into the EffiTech app.**

    - Enters client details (if not already in the system).
    - Creates a new intervention event for initial assessment.
    - Assigns a technician for the initial visit.
    - Ensures client details are correctly recorded.

3. **Technician performs the initial assessment.**
    - Technician logs into the app.
    - Views the schedule and client details for the intervention.
    - Visits the client, assesses the issue, and fills out an initial report.
    - Obtains the client’s electronic signature on the report.
    - Submits the report to the supervisor.

</details>

## <a name="other-functionalities"></a> Other Functionalities

<details>
<summary>Enter Company Data</summary>

1. **Admin logs into the EffiTech app.**
    - Navigates to the company settings section.
    - Enters and saves company details such as:
        - Address
        - Contact information
        - Logo
        - Various company informations
    - Confirms that the entered information is displayed correctly in the company page.

</details>

<details>
<summary>Create Employee Profiles</summary>

1. **Admin logs into the EffiTech app.**
    - Navigates to the employee management section.
    - Clicks on "Add New Employee."
    - Enters employee details, including:
        - Firstname, lastname
        - Job and speciality
        - Phone number
        - Credentials (e.g., email, password)
    - Saves the new employee profile.
    - Verifies that the new employee can log in and access the app according to their role.

</details>
