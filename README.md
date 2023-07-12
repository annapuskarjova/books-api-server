## Overview

This repository contains code for impementation of interview home assignment for test automation engineer role (AQA). 

**Task 1**

Create simple REST API for library using node.js with such endpoints:
- [POST] endpoint/books (add book to library)
- [GET] endpoint/books  (list books)
- [GET] endpoint/books:id (list book)
- [PUT] endpoint/books:id (update book information)
- [DELETE] endpoint/books:id (move book from library)

Schema should be as follows

```
const bookSchema = new Schema({
  name: String,
  author: String,
  year: String,
  available: Number
});
```

**Task 2**

Create a simple test solution and write end user tests for REST API that was created in Task 1.

## Solution Description

As there was no strict requirement on programming language I have chosen JavaScript as the more convenient option. I implemented Book API server at very basics, with state managed in-memory. I have used `express-js` as web server engine. 

I created two basic modules

- `server` to instantiate engine
- `model` to operate on book model and storage

Application antry point and rest enpoint logic is implemented in `app.js`

For the testing part I have chosen [Cypress](https://www.cypress.io) test automation framework. To my view this framework is best suitable for Node based web application testing, although it can be successfully applied for testing web applications based on other tech stack. I my example Cypress is integrated with project as npm dependency so installing it doesn't requiring nothing more than `npm install`.

Test specifications and details can be found in `cypress/e2e/books-api.cy.js`. Tests seed data is stored in `cypress/e2e/books-test-data.json`. Other notable files are `support\comands.js` and `cypress.config.js` that contains test suite configuration and helper functions. 

## Setup Instructions

1. Install node and npm. I was using node v20.4.0 and npm 9.7.2 while working on the project.

2. Run `npm install` to download dependencies.

3. Start server with `npm start` or `npm run start-dev` for nodemon.

4. Open new terminal, swith to the project folder an run `npm run cy:run` to execute E2E tests. To run tests interactively run `npm run cy:open`
When book-api-server will be opened, press E2E testing and click 'Start E2E testing with Electron'. After that click on `books-api.cy.js` and you will see all tests.

The app server will is running on port 3000 by default. Please make sure there are no other applications or services running on that port. 

## Tests

API tests grouped by the tested methods (POST, PUT, GET, DELETE)
Tests are located in books-api.cy.js file

![E2E Tests](/e2e-tests.png)

In case of failure you can see where the test failed, on which row and what is the reason:

![E2E Test Failure](/e2e-test-failure.png)
