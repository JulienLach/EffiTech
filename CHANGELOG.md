# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

# [0.3.0] (2024-11-29)

## Changes

-   Complete style overhaul on all pages
-   Add employee initials to mobile view
-   Update Fontawesome CDN to latest

## Fixes

-   Fix create account page by adding createAccount api call to auth route and and missing parameters
-   Add missing fields in PDFGenerator component
-   Add missing company name field on mobile view

# [0.2.1] (2024-11-24)

## Changes

-   Change default number of events displayed on calendar to 20
-   Add logout button
-   Add employee initials displayed on profile top right

## Fixes

-   Change default react-big-calendar component height
-   Various CSS fixes

# [0.2.0] (2024-11-08)

## Changes

-   Add apidoc package and documented api.js file
-   Add sorting by client category button on client page
-   Add mobile calendar view with event cards displayed for technicians
-   Add Intervention form view for technician
-   Add jwt auth and redirections to access client side pages
-   Add jwt auth to displayed events for connected employees
    -   Display only events assigned to the connected employee
-   Add default coverage option to JEST test script
-   Add expenses page for technician on mobile

## Fixes

-   Refactor jwt auth server side in client login method
-   Fix redirect on company page with 404 error with employee connected
-   Fix JavaScript methods for touch handling on mobile in the signature canva component

# [0.1.2] (2024-11-05)

## Changes

-   Add highlighted sidebar menu for current page
-   Add first mobile view for technician
    -   Login page
    -   Calendar page on progress
-   Add JEST package for unit test purposes
    -   Add test files
-   Defined end to end test documented on readme.md

## Fixes

-   Hide fill intervention form button for event with no defined starting hour and ending hour

# [0.1.1] (2024-11-05)

## Changes

-   Add client and employee signatures to report
-   Add search bar to find client on create event form
-   Add API documentation generated with JSDOC intalled with npm
-   Add JEST installed with npm

## Fixes

-   Hide fill form button for unplaned appointment

# [0.1.0] (2024-11-03)

## Changes

-   Full events CRUD done both with appointments and interventions
    -   A completed intervention links directly to a validated report
-   Add default sorting by dates for events on calendar page
-   Add a new company
-   Full employees CRUD done
-   Full clients CRUD done
-   Add calendar paging

## Fixes

-   Various wrongly formatted dates and time in intervention, appointment, and report pages leading to wrong dates on CRUDs
-   Displayed buttons based on conditions in the intervention form
-   Company logo was not converted to base64 string
-   Various data methods missing properties for CRUDs

# [0.0.2] (2024-10-11)

## Changes

-   Add appointment alongside intervention object
    -   Create an appointment
    -   Fill appointment form
    -   Submit appointment form to add "work to do" to event object
-   Add JWT authentication to login page with token stored in cookie
-   Add create account function
-   Add company, employees and clients main views and all details views
-   Add react-big-calendar npm package to add a calendar view to calendar page
-   Add ESLint and Prettier configs for code quality and formatting
-   Refactor all functional components to Class components

# [0.0.1] (2024-09-06)

## Changes

-   Create an event
-   Fill intervention form
-   Submit intervention form to create a report
-   Download the PDF report
