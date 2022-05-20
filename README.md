# Employee Attendance and Payroll Management System

Radio Frequency Identification (RFID) initially is of great use in the marketing field render
billing easy. An object within the range of 20 feet can be easily tracked with the aid of its
unique barcode using RFID chip. It is sophisticated than the primitive barcode techniques
as there is no need of positioning of the scanner. Cloud computing is a system which
provides access to all software’s without installation, for a desired time period, at a
specific cost, only with the help of a single web browser.. Interfacing RFID with cloud
computing would be more beneficiary in solving current issues. So We are providing
solution for Companies to enable RFID enabled attendance management system.

# Project Outcomes

- Using Wi-Fi enabled RFID reading machines from all locations to connect attendance data to a cloud central database in real-time. Linking this database to a web-based and mobile based application that in real-time displays required attendance data to administration and managers.
- Incorporating incentive or penalty reporting by factory supervisors into the mobile application. This will require the app to scan a barcode printed on employee's RFID card to identify the employee, contain some drop-downs, text-fields and photo
- capture features for the supervisor to fill in details about why he/she is awarding an incentive or penalising an employee.
- Web-application to incorporate salary calculation logic used by FE, to auto-calculate each employee's weekly salary. If possible, auto-generate employee-wise downloadable salary statements.

# Frontend Details

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

It uses Sass (with .scss). The styles are loaded at the template level with `node-sass-chokidar` css preprocessor

Dependencies are handled by *npm*.

## Stack

- React.js
- CoreUI Admin Template
- Formik

## Usage

`npm i` - to install dependencies

## Sctipts

`npm start` for developing (it runs webpack-dev-server)  
`npm run build` to run a dev build

## Directory Structure

    .
    ├── CHANGELOG.md
    ├── ISSUE_TEMPLATE.md
    ├── jsconfig.json
    ├── LICENSE
    ├── migration.md
    ├── package.json
    ├── package-lock.json
    ├── public
    │   ├── avatars
    │   ├── favicon.ico
    │   ├── index.html
    │   └── manifest.json
    ├── REACT.md
    ├── README.md
    └── src
        ├── apis
        ├── App.js
        ├── App.test.js
        ├── assets
        ├── components
        ├── constants
        ├── containers
        ├── customHooks
        ├── index.js
        ├── polyfill.js
        ├── redux
        ├── reusable
        ├── routes.js
        ├── scss
        ├── serviceWorker.js
        ├── setupTests.js
        ├── store.js
        ├── utils
        └── views

14 directories, 20 files

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_API_BASE_URL` - Base URL for APIs (Backend)