const axios = require('axios');
const assert = require('chai').assert;

const scenarios = require('../java/api_scenarios.json');

// Validation function
const validateResponse = (scenario, response) => {
    // Assert response status code
    assert.strictEqual(response.status, scenario.response.status, 'Status code does not match!');

    // Assert response body if it exists
    if (scenario.response.body) {
        let expectedBody = JSON.parse(scenario.response.body);
        for (let key in expectedBody) {
            assert.deepEqual(response.data[key], expectedBody[key], `Mismatch in key: ${key}`);
        }
    }
};

describe('API tests', function() {
    scenarios.forEach((scenario) => {
        let identifier = `${scenario.apiName}::${scenario.endPointName}::${scenario.testName}::${scenario.request.method}`;

        describe(identifier, function() {
            it(scenario.testName, function(done) { // note the done parameter
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
                        done();  // signal that the test is complete
                    } catch (error) {
                        done(error);  // pass the error to done
                    }
                }).catch(error => {
                    if (error.response) {
                        try {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            validateResponse(scenario, error.response);
                            done();  // the status code matched the expected error status code
                        } catch (error) {
                            done(error);  // pass the error to done
                        }
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.error('Error', error.message);
                        done(error);  // pass the error to done
                    }
                });
            });
        });
    });
});
