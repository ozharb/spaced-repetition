# Spaced Repetition Capstone
Language learning app that uses the spaced repetition learning technique to help you memorize a foreign language. The app displays 10 words in French, and asks you to recall the corresponding word in English.

## User Stories:
- User can register an account with their name, user name, and custom password
- User can login with their credentials
- Upon login, user sees their dashboard with their words to practice along with their total score and indiviaual scores for each word
- User can start practicing at the top of the list or where they left off since their last session.
- User gets feedback after each guess that includes whether they were right or wrong, their new total score, and info about the next word to practice.

## Technology

#### Front End

* React
  * Create React App
  * React Router
* HTML5
* CSS3 (from scratch - no frameworks)
* Cypress

#### Back End

* Deployed via Heroku. 
* Repo can be found at https://git.heroku.com/oz-spaced-repetition-api.git


#### Production

* Deployed via Vercel

## Setup

To setup the application

1. Fork and clone the project to your machine
2. `npm install`. This will also install the application *Cypress.io* for running browser integration tests

The project expects you have the Spaced repetition API project setup and running on http://localhost:8000.

Find instructions to setup the API here https://github.com/Thinkful-Ed/spaced-repetition-api.

## Running project

This is a `create-react-app` project so `npm start` will start the project in development mode with hot reloading by default.

## Running the tests

This project uses [Cypress IO](https://docs.cypress.io) for integration testing using the Chrome browser.

Cypress has the following expectations:

- You have cypress installed (this is a devDependency of the project)
- You have your application running at http://localhost:3000.
  - You can change the address of this expectation in the `./cypress.json` file.
- Your `./src/config.js` is using http://localhost:8000/api as the `API_ENDPOINT`

To start the tests run the command:

```bash
npm run cypress:open
```

On the first run of this command, the cypress application will verify its install. Any other runs after this, the verification will be skipped.

The command will open up the Cypress application which reads tests from the `./cypress/integration/` directory. You can then run individual tests by clicking on the file names or run all tests by clicking the "run all tests" button in the cypress GUI.

Tests will assert against your running localhost client application.

You can also start all of the tests in the command line only (not using the GUI) by running the command:

```bash
npm run cypress:run
```

This will save video recordings of the test runs in the directory `./cypress/videos/`.
