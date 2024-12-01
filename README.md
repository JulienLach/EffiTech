# Intervention management platform

## Overview

-   Manage scheduling of interventions for craftsmen, industrial technicians, and heating engineers.

## Features

-   Individual management of technicians on the move with scheduling.
-   Manage your employees and your clients
-   Access to necessary technical data before the intervention with documents.
-   Creation of detailed reports with text, and electronic client signature.
-   Assignment of qualified technicians by supervisors.
-   Recording of client and equipment information from the first appointment.

## Stack

-   PostgreSQL, Node.js, JavaScript.

## Environment variables configuration

You need to create a `.env.development.local` file at the root of the project with the following :

-   DB_USER=
-   DB_HOST=
-   DB_NAME=
-   DB_PASSWORD=
-   DB_PORT=
-   PORT=
-   JWT_SECRET=

## Testing

-   **JEST** for test scripts
    -   Run `test path/to/your/file` to display test errors
-   **ESLint** and **Prettier** for code quality and formatting
    -   Run `npx eslint path/to/your/file` to check for errors

## Documentation

-   **JSDOC**: In the `/backend` folder, run `npm run doc` to generate documentation for the `/data` files.

-   **apidoc**: In the `/backend` folder, for API documentation written in the `/services/api.js` file, run `npm run apidoc`

## End-to-End Functional Test

<details>
<summary>Scenario 1: Plan and Assign Initial Intervention</summary>

#### User Story: Planification des premières interventions de constatation de la panne

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

## Other Functionalities

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
