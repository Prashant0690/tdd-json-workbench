/*
TDD-JSON-Workbench
Copyright (C) 2023 Prashant Tiwari

This program is a personal project and free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
package org.example.service;

import org.example.model.RequestResponse;
import org.example.util.SeleniumUtils;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.Map;

public class EditRequestResponse {
    private final WebDriver driver;
    private final WebDriverWait wait;

    public EditRequestResponse(WebDriver driver, WebDriverWait wait) {
        this.driver = driver;
        this.wait = wait;
    }

    public void updateRequestResponse(String apiName, String endpointName, String testName, RequestResponse data) {
        openTestModal(apiName, endpointName, testName);
        openEditRequestResponseTab(testName);
        updateRequest(testName, data);
        updateResponse(testName, data);
        saveAndCloseModal();
    }

    private void openTestModal(String apiName, String endpointName, String testName) {
        WebElement testCaseButton = wait.until(ExpectedConditions.elementToBeClickable(By.id("test-item-" + apiName + "-" + endpointName + "-" + testName)));
        testCaseButton.click();

        WebElement modalHeader = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("test-case-title-" + testName)));
        System.out.println("Test Case Title: " + modalHeader.getText());
    }

    private void openEditRequestResponseTab(String testName) {
        WebElement editRequestResponseTab = wait.until(ExpectedConditions.elementToBeClickable(By.id("test-case-tabs-" + testName + "-tab-apiRequestResponse")));
        // SeleniumUtils.scrollToElement(driver, editRequestResponseTab);
        SeleniumUtils.waitForHalfSeconds();
        editRequestResponseTab.click();
    }

    private void openRequestTab(String testName) {
        WebElement requestTab = wait.until(ExpectedConditions.elementToBeClickable(By.id("request-response-tabs-" + testName + "-tab-request")));
        //SeleniumUtils.scrollToElement(driver, requestTab);
        SeleniumUtils.waitForHalfSeconds();
        requestTab.click();
    }

    private void updateRequest(String testName, RequestResponse data) {
        openRequestTab(testName);
        updateRequestPath(testName, data.getPath());
        updateRequestMethod(testName, data.getMethod());
        updateRequestHeaders(testName, data.getHeaders());
        updateQueryParams(testName, data.getQueryParams());
        updatePathParams(testName, data.getPathParams());
        updateRequestBody(testName, data.getBody());
    }

    private void updateResponse(String testName, RequestResponse data) {
        openResponseTab(testName);
        updateResponseStatus(testName, data.getStatus());
        updateResponseHeaders(testName, data.getResponseHeaders());
        updateResponseBody(testName, data.getResponseBody());
    }

    private void openResponseTab(String testName) {
        WebElement responseTab = wait.until(ExpectedConditions.elementToBeClickable(By.id("request-response-tabs-" + testName + "-tab-response")));
        //SeleniumUtils.scrollToElement(driver, responseTab);
        SeleniumUtils.waitForHalfSeconds();
        responseTab.click();
    }

    private void updateRequestPath(String testName, String path) {
        if (path != null) {
            WebElement urlMethodTab = wait.until(ExpectedConditions.elementToBeClickable(By.id("request-tabs-" + testName + "-tab-url_method")));
            //SeleniumUtils.scrollToElement(driver, urlMethodTab);
            SeleniumUtils.waitForHalfSeconds();
            urlMethodTab.click();
            WebElement requestPathInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("request-path-" + testName)));
            requestPathInput.clear();
            requestPathInput.sendKeys(path);
        }
    }

    private void updateRequestMethod(String testName, String method) {
        if (method != null) {
            WebElement requestMethodSelect = driver.findElement(By.id("request-method-" + testName));
            Select methodSelect = new Select(requestMethodSelect);
            methodSelect.selectByVisibleText(method);
        }
    }

    private void updateRequestHeaders(String testName, Map<String, String> headers) {
        if (headers != null && !headers.isEmpty()) {
            WebElement headersTab = driver.findElement(By.id("request-tabs-" + testName + "-tab-headers"));
            // SeleniumUtils.scrollToElement(driver, headersTab);
            SeleniumUtils.waitForHalfSeconds();
            headersTab.click();
            for (Map.Entry<String, String> entry : headers.entrySet()) {
                addKeyValue("header-add-key", "header-add-value", entry.getKey(), entry.getValue());
            }
        }
    }

    private void updateQueryParams(String testName, Map<String, String> queryParams) {
        if (queryParams != null && !queryParams.isEmpty()) {
            WebElement queryParamsTab = driver.findElement(By.id("request-tabs-" + testName + "-tab-queryParams"));
            //SeleniumUtils.scrollToElement(driver, queryParamsTab);
            SeleniumUtils.waitForHalfSeconds();
            queryParamsTab.click();
            for (Map.Entry<String, String> entry : queryParams.entrySet()) {
                addKeyValue("queryParam-add-key", "queryParam-add-value", entry.getKey(), entry.getValue());
            }
        }
    }

    private void updatePathParams(String testName, Map<String, String> pathParams) {
        if (pathParams != null && !pathParams.isEmpty()) {
            WebElement pathParamsTab = driver.findElement(By.id("request-tabs-" + testName + "-tab-pathParams"));
            //SeleniumUtils.scrollToElement(driver, pathParamsTab);
            SeleniumUtils.waitForHalfSeconds();
            pathParamsTab.click();
            for (Map.Entry<String, String> entry : pathParams.entrySet()) {
                addKeyValue("pathParam-add-key", "pathParam-add-value", entry.getKey(), entry.getValue());
            }
        }
    }

    private void updateRequestBody(String testName, String body) {
        if (body != null) {
            WebElement bodyTab = driver.findElement(By.id("request-tabs-" + testName + "-tab-body"));
            //SeleniumUtils.scrollToElement(driver, bodyTab);
            SeleniumUtils.waitForHalfSeconds();
            bodyTab.click();
            //SeleniumUtils.waitForSeconds(1);
            SeleniumUtils.waitForHalfSeconds();
            WebElement requestBodyInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("request-body-json-textarea")));
            requestBodyInput.clear();
            requestBodyInput.sendKeys(body);

            WebElement formatButton = wait.until(ExpectedConditions.elementToBeClickable(By.id("request-body-format-validate-button")));
            //SeleniumUtils.scrollToElement(driver, formatButton);
            SeleniumUtils.waitForHalfSeconds();
            formatButton.click();
        }
    }

    private void updateResponseStatus(String testName, int status) {
        if (status != 0) {
            WebElement statusTab = driver.findElement(By.id("response-tabs-" + testName + "-tab-status"));
            //SeleniumUtils.scrollToElement(driver, statusTab);
            SeleniumUtils.waitForHalfSeconds();
            statusTab.click();
            SeleniumUtils.waitForHalfSeconds();
            WebElement responseStatusSelect = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("response-status-" + testName)));
            Select statusSelect = new Select(responseStatusSelect);
            selectStatusByVisibleText(statusSelect, status);
        }
    }

    private void selectStatusByVisibleText(Select select, int status) {
        String statusText = String.valueOf(status);
        for (WebElement option : select.getOptions()) {
            if (option.getText().startsWith(statusText)) {
                select.selectByVisibleText(option.getText());
                break;
            }
        }
    }

    private void updateResponseHeaders(String testName, Map<String, String> responseHeaders) {
        if (responseHeaders != null && !responseHeaders.isEmpty()) {
            WebElement responseHeadersTab = driver.findElement(By.id("response-tabs-" + testName + "-tab-headers"));
            //SeleniumUtils.scrollToElement(driver, responseHeadersTab);
            SeleniumUtils.waitForHalfSeconds();
            responseHeadersTab.click();
            for (Map.Entry<String, String> entry : responseHeaders.entrySet()) {
                addKeyValue("responseHeader-add-key", "responseHeader-add-value", entry.getKey(), entry.getValue());
            }
        }
    }

    private void updateResponseBody(String testName, String responseBody) {
        if (responseBody != null) {
            WebElement responseBodyTab = driver.findElement(By.id("response-tabs-" + testName + "-tab-body"));
            //SeleniumUtils.scrollToElement(driver, responseBodyTab);
            SeleniumUtils.waitForHalfSeconds();
            responseBodyTab.click();
            SeleniumUtils.waitForHalfSeconds();
            WebElement responseBodyInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("response-body-json-textarea")));
            responseBodyInput.clear();
            responseBodyInput.sendKeys(responseBody);

            WebElement formatButton = wait.until(ExpectedConditions.elementToBeClickable(By.id("response-body-format-validate-button")));
            //SeleniumUtils.scrollToElement(driver, formatButton);
            SeleniumUtils.waitForHalfSeconds();
            formatButton.click();
        }
    }

    private void addKeyValue(String keySelector, String valueSelector, String key, String value) {
        SeleniumUtils.waitForHalfSeconds();
        WebElement keyInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(keySelector)));
        WebElement valueInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(valueSelector)));
        keyInput.clear();
        keyInput.sendKeys(key);
        valueInput.clear();
        valueInput.sendKeys(value);
        String buttonId = valueSelector.replace("value", "button");
        WebElement addButton = wait.until(ExpectedConditions.elementToBeClickable(By.id(buttonId)));
        //SeleniumUtils.scrollToElement(driver, addButton);
        SeleniumUtils.waitForHalfSeconds();
        addButton.click();
    }

    private void saveAndCloseModal() {
        WebElement submitButton = driver.findElement(By.cssSelector("button[type='submit'].btn-primary"));
        //SeleniumUtils.scrollToElement(driver, submitButton);
        SeleniumUtils.waitForHalfSeconds();
        submitButton.click();
    }
}