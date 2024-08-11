# TDD JSON Workbench - Selenium Automation Project

## Overview

This project is a Selenium-based automation framework designed to test and demonstrate the TDD JSON Workbench application. It allows for automated interaction with the TDD JSON Workbench UI to manage APIs, endpoints, and test cases, as well as perform request and response validation.

## Project Structure

- **`ApiAutomation.java`**: The main driver class that handles browser setup, API operations (CRUD), and utility functions for interacting with the TDD JSON Workbench.
- **`EditRequestResponse.java`**: A service class responsible for editing and updating the request and response data within a test case modal.
- **`SeleniumUtils.java`**: A utility class that provides common Selenium actions such as scrolling, waiting, clicking elements using JavaScript, handling alerts, and taking screenshots.

## Selenium Elements and IDs

The framework interacts with the TDD JSON Workbench using specific element IDs and XPaths. Below are some of the key elements used in the automation scripts:

- **API Management**
    - **Add New API**: `add-new-api-button`
    - **API Name Input**: `api-name-input`
    - **URL Input**: `url-input`
    - **Submit API**: `submit-add-api-button`

- **Endpoint Management**
    - **Add Endpoint**: `add-endpoint-{apiName}`
    - **Endpoint Name Input**: `new-endpoint-name-{apiName}`
    - **Submit Endpoint**: `submit-add-new-endpoint-{apiName}`

- **Test Case Management**
    - **Add Test**: `add-test-{endpointName}`
    - **Test Name Input**: `new-test-name-{endpointName}`
    - **Submit Test**: `submit-add-new-test-{endpointName}`
    - **Clone Test**: `clone-test-{apiName}-{endpointName}-{testName}`

- **Theming**
    - **Theme Toggle Button**: `theme-toggle-btn`
    - **Sun Icon (Light Theme)**: `theme-icon-sun`
    - **Moon Icon (Dark Theme)**: `theme-icon-moon`

- **Modal Management**
    - **Test Case Title**: `test-case-title-{testName}`
    - **Close JSON Preview**: `close-json-preview-button`

## Installation

This is a Java Maven project. 

## Supported Methods

The following methods are supported by the automation framework:

- **API Operations**
    - `addApi(String apiName, String url, String endpointName)`
    - `updateApiUrl(String apiName, String newUrl)`
    - `deleteApi(String apiName)`

- **Endpoint Operations**
    - `addEndpoint(String apiName, String endpointName)`
    - `updateEndpointName(String apiName, String oldEndpointName, String newEndpointName)`
    - `deleteEndpoint(String apiName, String endpointName)`
    - `moveToEndpoint(String apiName, String endpointName)`

- **Test Case Operations**
    - `addTest(String apiName, String endpointName, String testName)`
    - `updateTestName(String apiName, String endpointName, String oldTestName, String newTestName)`
    - `deleteTest(String apiName, String endpointName, String testName)`
    - `cloneTestCase(String apiName, String endpointName, String testName)`
    - `viewAndPrintTestDetails(String apiName, String endpointName, String testName)`

- **Theming and UI Operations**
    - `toggleTheme()`
    - `openJsonPreviewAndClose()`

- **Request/Response Operations**
    - `updateRequestResponse(String apiName, String endpointName, String testName, RequestResponse data)`

## License

This project is licensed under the MIT License. See the LICENSE file for details.
