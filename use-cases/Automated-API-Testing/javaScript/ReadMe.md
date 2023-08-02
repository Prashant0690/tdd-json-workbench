# JavaScript API Testing with Dynamic JSON Scenarios

This project showcases a way to implement API testing in JavaScript using a JSON file to define test scenarios. The core idea behind the project is to create a maintainable and scalable test suite that is easy to understand and can be extended with new test scenarios by simply adding more entries to the JSON file.

## Key Technologies

1. **Node.js** - The runtime environment for executing our JavaScript code.
2. **Axios** - Used for making HTTP requests.
3. **Mocha** - The testing framework that orchestrates our tests.
4. **Chai** - Assertion library for verifying our test results.

## Overview

Our project leverages the flexibility of JSON and the power of JavaScript to perform API testing based on dynamic scenarios.

Each scenario is a separate test case and is fully described by a JSON object in the JSON array present in `api_scenarios.json` file. A scenario includes an API name, endpoint name, test name, request details (including method, headers, path parameters, and body), and expected response (including status and body).

Our main script (`api_test.js`) reads these scenarios and uses Axios to send HTTP requests based on the information in each scenario. The received responses are then validated against the expected responses defined in the scenarios using Chai assertions.

## Project Files

- `api_scenarios.json`: The JSON file containing our test scenarios.
- `api_test.js`: Our main testing script that reads the scenarios and performs the tests.

## Code Overview

```javascript
// Import necessary libraries
const axios = require('axios');
const assert = require('chai').assert;

const scenarios = require('./api_scenarios.json'); // Load our test scenarios

// Function to validate the received response against the expected one
const validateResponse = (scenario, response) => {
    assert.strictEqual(response.status, scenario.response.status, 'Status code does not match!');
    if (scenario.response.body) {
        let expectedBody = JSON.parse(scenario.response.body);
        for (let key in expectedBody) {
            assert.deepEqual(response.data[key], expectedBody[key], `Mismatch in key: ${key}`);
        }
    }
    if (scenario.response.headers) {
        for (let header in scenario.response.headers) {
            assert.strictEqual(response.headers[header], scenario.response.headers[header], `Mismatch in header: ${header}`);
        }
    }
};

// Define our tests
describe('API tests', function() {
    scenarios.forEach((scenario) => {
        let identifier = `${scenario.apiName}::${scenario.endPointName}::${scenario.testName}::${scenario.request.method}`;

        describe(identifier, function() {
            it(scenario.testName, function(done) {
                let url = `${scenario.url}${scenario.request.path}`;

                // Replace path parameters in URL
                for (let key in scenario.request.pathParams) {
                    url = url.replace(`{${key}}`, scenario.request.pathParams[key]);
                }

                axios({
                    method: scenario.request.method,
                    url: url,
                    headers: scenario.request.headers,
                    params: scenario.request.queryParams,
                    data: scenario.request.body ? JSON.parse(scenario.request.body) : null,
                }).then(response => {
                    try {
                        validateResponse(scenario, response);
                        done();
                    } catch (error) {
                        done(error);
                    }
                }).catch(error => {
                    if (error.response) {
                        try {
                            validateResponse(scenario, error.response);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    } else {
                        console.error('Error', error.message);
                        done(error);
                    }
                });
            });
        });
    });
});
```

## Getting Started

You'll need Node.js and NPM installed on your machine. To install the required packages, navigate to the project directory and run:

```
npm install
```

This will install Axios, Mocha, and Chai. After that, you can run the tests with:

```
npm test
```

## Contributing

Feel free to add more scenarios to the `api_scenarios.json` file or enhance the testing script (`api_test.js`) to support more types of requests, validations, or any other improvements you can think of. Contributions are always welcome!
