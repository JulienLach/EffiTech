# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## Changes

-   Add Interventions and contact details tabs to employee details
-   Refactoring frontend pages with utils methods
-   Add Progressive Web App feature

## Fix

-   various UI/UX fixes

# [0.8.3] (2025-09-03)

## Changes

-   Add send by email button on mobile report page
-   Add search field to employee page
-   Add contact support by email

# [0.8.2] (2025-07-03)

## Fixes

-   Fix Event object import in utils
-   Add Select react library to invoice form for client selector

# [0.8.1] (2025-02-03)

## Changes

-   Revised .env variables to improve the deployment process
-   UI updates
-   Add more option to paging on calendar page

## Fixes

-   Fix event unit tests
-   Fix employee unit tests
-   Add Appointment and Intervention classes unit tests

# [0.8.0] (2025-21-02)

## Changes

-   Add paging on notifications page
-   Add notification on mobile for employee
-   Add profile page on mobile
-   Add to be planned events tab on calendar page
-   Add employee selector to update intervention form
-   Add employee filters on calendar component for admin
-   Add event modal displayed on event card click on calendar component
-   Add create client on global create button

## Fixes

-   Hide unplaned event assigned to employee
-   UI updates

# [0.7.0] (2025-18-02)

## Changes

-   Add option to create an unscheduled intervention when the technician validates the intervention form
-   Add notifications for creating, updating, deleting, and validating events with employee and date details
-   Send employee credentials by email when creating an employee account
-   Add clickable employee card to see employee profile
-   Change default calendar mobile view to day view
-   Add react-select npm package in create event form for client selector
-   Add erase button on client and technician signature

## Fixes

-   Remove userAgentData condition for mobile view and and react-device-detect package
-   Fix signature component to avoid scrolling while signing report on mobile
-   Fix to hande redirection for report and client details pages when access it directly in url
-   Add search item to reset filter method to clean search bar on reset button click
-   Desktop and Mobile UI updates

# [0.6.1] (2025-15-02)

## Changes

-   Add search field for documents
-   Add paging for documents page
-   Add paging for invoices page
-   Add my profile link for current connected user
-   Add send report PDF to client by email
-   Add MailJet api keys with free SMTP server
-   Add success message when report is sent to client by email
-   Add option to create an unscheduled intervention when the technician validates the appointment form

# [0.6.0] (2025-04-02)

## Changes

-   Add company name
-   Add basic notification for create events
-   Add statistics page with basic graphs
-   Add current month event stats card
-   Add events by employee stats card
-   Add download document link
-   Add tel and mail link to table clients
-   Add reset filter to clients and calendar pages
-   Add import invoice form

## Fixes

-   Various CSS fixes
-   Fix client form
-   Add missing all type to sort type filter
-   Fix to update ending hour for appointment event
-   Fix to update ending hour for intervention event

# [0.5.3] (2025-17-01)

## Changes

-   Add global button in top menu to create event form everywhere
-   Add link to client email on client page to open local email app
-   Add invoices page

## Fixes

-   Add regex to all forms
-   Add sanitize methods to all entries on server side

# [0.5.2] (2025-15-01)

## Fixes

-   Fix cd pipeline

# [0.5.1] (2025-15-01)

## Fixes

-   Fix cd pipeline

# [0.5.0] (2025-15-01)

## Changes

-   Add upload document to documents page
-   Display selected document with PDF view
-   Add error message to missing fields in all forms
-   Add Notifications page
-   Events can be sorted by multiples filters status and by clients or employee first and last names
-   Add sorting by event type on calendar page
-   Add calendar view to calendar page on mobile
-   Add a link to open google maps on mobile on client page

# [0.4.0] (2024-12-05)

## Changes

-   Add employee name to report PDF
-   Add company data and logo to report PDF
-   Add dynamic title page on mobile
-   Add Dockerfile to frontend/backend folders and add a docker-compose.yml file to run the app with Docker
-   Add client details page to mobile
-   Update add company forms
-   Update CD pipeline to upload updated images for each release

# [0.3.4] (2024-12-03)

## Changes

-   Update report clients and report page on mobile
-   Add links to mobile menu

# [0.3.3] (2024-12-02)

## Fixes

-   Fix cd.yml file for automatic release with github actions

# [0.3.2] (2024-12-02)

## Changes

-   Add CI unit tests with GitHub Actions
-   Add CD file to automaticaly create a new release

## Fixes

-   Various CSS fixes

# [0.3.1] (2024-11-30)

## Changes

-   Add paging to client page with 10 clients per page
-   Add calendar as home link to logo
-   Add colors on card events for each employees on calendar view
-   Add more info on card events on calendar view
-   Add search client function to client search field
-   Add search event/employee function to event search field
-   Add EffiTech small logo to mobile title header

## Fixes

-   Various CSS fixes

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
