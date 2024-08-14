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
package org.example;

import org.example.service.EditRequestResponse;
import org.example.util.SeleniumUtils;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import io.github.bonigarcia.wdm.WebDriverManager;

import java.time.Duration;

import static org.example.util.SeleniumUtils.*;

public class ApiAutomation {

    public final WebDriver driver;
    public final WebDriverWait wait;
    public EditRequestResponse editRequestResponse;

    public ApiAutomation() {
        WebDriverManager.firefoxdriver().setup();

        // Set Firefox Developer Edition binary path
        FirefoxOptions options = new FirefoxOptions();
        options.setBinary("/Applications/Firefox Developer Edition.app/Contents/MacOS/firefox");

        driver = new FirefoxDriver(options);
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(5)); // Increased wait time
        editRequestResponse = new EditRequestResponse(driver, wait);
    }

    public void openApplication(String url) {
        driver.get(url);
    }

    public void closeApplication() {
        driver.quit();
    }

    public void toggleTheme() {
        try {
            // Wait for the theme toggle button to be visible
            WebElement themeToggleButton = driver.findElement(By.id("theme-toggle-btn"));
            WebElement themeIcon = themeToggleButton.findElement(By.tagName("i"));

            // Check the current icon to determine the current theme
            String iconClass = themeIcon.getAttribute("class");
            boolean isLightTheme = iconClass.contains("fa-sun"); // Assuming sun icon indicates light theme

            // Click the button to toggle the theme
            themeToggleButton.click();

            // Wait for the theme to change (this might involve waiting for a specific element to update)
            if (isLightTheme) {
                // Wait for the moon icon to appear, indicating dark theme
                wait.until(ExpectedConditions.attributeContains(themeIcon, "class", "fa-moon"));
            } else {
                // Wait for the sun icon to appear, indicating light theme
                wait.until(ExpectedConditions.attributeContains(themeIcon, "class", "fa-sun"));
            }

            System.out.println("Theme toggled successfully.");
        } catch (Exception e) {
            System.out.println("Error in toggling theme: " + e.getMessage());
        }
    }

    public void addApi(String apiName, String url, String endpointName) {
        // WebElement addNewApiButton = wait.until(ExpectedConditions.elementToBeClickable(By.id("add-new-api-button")));
        WebElement addNewApiButton = driver.findElement(By.id("add-new-api-button"));
        scrollToElement(driver, addNewApiButton);
        addNewApiButton.click();
        WebElement apiNameInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("api-name-input")));
        WebElement urlInput = driver.findElement(By.id("url-input"));
        WebElement endpointNameInput = driver.findElement(By.id("endpoint-name-input"));
        WebElement submitAddApiButton = driver.findElement(By.id("submit-add-api-button"));

        apiNameInput.sendKeys(apiName);
        waitForHalfSeconds();
        urlInput.sendKeys(url);
        waitForHalfSeconds();
        endpointNameInput.sendKeys(endpointName);
        waitForHalfSeconds();
        submitAddApiButton.click();
        waitForSeconds(1);
        SeleniumUtils.handleAlert(driver, wait);
    }

    public void updateApiUrl(String apiName, String newUrl) {
        WebElement editUrlButton = wait.until(ExpectedConditions.elementToBeClickable(By.id("edit-url-" + apiName)));
        // Scroll the element into view and click it using JavaScript
        scrollToElement(driver, editUrlButton);
        SeleniumUtils.clickElementUsingJS(driver, editUrlButton);
        WebElement apiUrlInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("api-url-" + apiName)));
        apiUrlInput.clear();
        waitForHalfSeconds();
        apiUrlInput.sendKeys(newUrl);
        waitForHalfSeconds();
        WebElement updateUrlButton = driver.findElement(By.id("update-url-" + apiName));

        // Scroll the element into view and click it using JavaScript
        scrollToElement(driver, updateUrlButton);
        SeleniumUtils.clickElementUsingJS(driver, updateUrlButton);
    }

    public void addEndpoint(String apiName, String endpointName) {
        try {
            // WebElement apiCard = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h2[contains(text(),'" + apiName + "')]/..")));
            WebElement apiCard = driver.findElement(By.xpath("//h2[contains(text(),'" + apiName + "')]/.."));
            scrollToElement(driver, apiCard);
            WebElement addEndpointButton = apiCard.findElement(By.id("add-endpoint-" + apiName));
            scrollToElement(driver, addEndpointButton);

            addEndpointButton.click();
            System.out.println("Clicked 'Add Endpoint' button for API: " + apiName);

            WebElement newEndpointNameInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("new-endpoint-name-" + apiName)));
            newEndpointNameInput.clear();
            newEndpointNameInput.sendKeys(endpointName);
            waitForHalfSeconds();

            WebElement submitAddEndpointButton = driver.findElement(By.id("submit-add-new-endpoint-" + apiName));
            submitAddEndpointButton.click();
            System.out.println("Added Endpoint: " + endpointName + " to API: " + apiName);

            // Adding wait after clicking the submit button
            SeleniumUtils.waitForHalfSeconds();

            moveToEndpoint(apiName, endpointName);
        } catch (Exception e) {
            System.out.println("Error in addEndpoint: " + e.getMessage());
        }
    }

    public void moveToEndpoint(String apiName, String endpointName) {
        try {
            WebElement endpointCard = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(@id,'endpoint-card-" + endpointName + "')]")));
            scrollToElement(driver, endpointCard);
        } catch (Exception e) {
            System.out.println("Error in updateEndpointName: " + e.getMessage());
        }
    }

    public void updateEndpointName(String apiName, String oldEndpointName, String newEndpointName) {
        try {
            WebElement endpointCard = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(@id,'endpoint-card-" + oldEndpointName + "')]")));
            WebElement editEndpointButton = endpointCard.findElement(By.id("edit-endpoint-" + oldEndpointName));
            scrollToElement(driver, editEndpointButton);
            editEndpointButton.click();
            System.out.println("Clicked 'Edit Endpoint' button for Endpoint: " + oldEndpointName);

            WebElement newEndpointNameInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("new-endpoint-name-" + oldEndpointName)));
            newEndpointNameInput.clear();
            newEndpointNameInput.sendKeys(newEndpointName);

            WebElement submitUpdateEndpointButton = driver.findElement(By.id("submit-update-endpoint-name-" + oldEndpointName));
            submitUpdateEndpointButton.click();
            System.out.println("Updated Endpoint Name: " + oldEndpointName + " to " + newEndpointName);
            SeleniumUtils.handleAlert(driver, wait);
            // Adding wait after clicking the submit button
            SeleniumUtils.waitForHalfSeconds();

        } catch (Exception e) {
            System.out.println("Error in updateEndpointName: " + e.getMessage());
        }
    }

    public void addTest(String apiName, String endpointName, String testName) {
        try {
            WebElement endpointCard = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(@id,'endpoint-card-" + endpointName + "')]")));
            WebElement addTestButton = endpointCard.findElement(By.id("add-test-" + endpointName));
            scrollToElement(driver, addTestButton);
            addTestButton.click();
            System.out.println("Clicked 'Add Test' button for Endpoint: " + endpointName);

            WebElement newTestNameInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("new-test-name-" + endpointName)));
            newTestNameInput.clear();
            newTestNameInput.sendKeys(testName);
            waitForHalfSeconds();

            WebElement submitAddTestButton = driver.findElement(By.id("submit-add-new-test-" + endpointName));
            submitAddTestButton.click();
            System.out.println("Added Test: " + testName + " to Endpoint: " + endpointName);

            // Adding wait after clicking the submit button
            SeleniumUtils.waitForHalfSeconds();
            moveToTestName(apiName, endpointName, testName);

        } catch (Exception e) {
            System.out.println("Error in addTest: " + e.getMessage());
        }
    }

    public void cloneTestCase(String apiName, String endpointName, String testName) {
        try {
            // Construct the ID for the clone button based on the provided API, endpoint, and test names
            String cloneButtonId = "clone-test-" + apiName + "-" + endpointName + "-" + testName;

            // Wait for the clone button to be clickable
            WebElement cloneButton = wait.until(ExpectedConditions.elementToBeClickable(By.id(cloneButtonId)));

            // Click the clone button to initiate the cloning process
            cloneButton.click();

            // Wait for a short duration to allow the cloning process to complete
            SeleniumUtils.waitForSeconds(1);

            handleAlert(driver, wait);

            System.out.println("Test case '" + testName + "' under endpoint '" + endpointName + "' in API '" + apiName + "' cloned successfully.");
        } catch (Exception e) {
            System.out.println("Error in cloning test case '" + testName + "': " + e.getMessage());
        }
    }

    public void moveToTestName(String apiName, String endpointName, String testName) {
        try {
            WebElement endpointCard = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(@id,'endpoint-card-" + endpointName + "')]")));
            System.out.println("edit-test-"+ apiName  + "-" + testName);
            String id = "edit-test-"+apiName+"-"+endpointName+"-"+testName;
            WebElement editTestButton = endpointCard.findElement(By.id(id));
            scrollToElement(driver, editTestButton);
        } catch (Exception e) {
            System.out.println("Error in updateTestName: " + e.getMessage());
        }
    }

    public void updateTestName(String apiName, String endpointName, String oldTestName, String newTestName) {
        try {
            // String id = "test-item-"+apiName+"-"+endpointName+"-"+oldTestName;
            // WebElement endpointCard = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(id)));
            System.out.println("edit-test-"+ apiName  + "-" + oldTestName);
            // edit-test-SmartAPI-Cancel Orders-Successful Cancel Order-Copy
            //id="edit-test-OpenWeather API-DefaultEndpoint-A"
            String id = "edit-test-"+apiName+"-"+endpointName+"-"+oldTestName;

            WebElement editTestButton = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(id)));
            scrollToElement(driver, editTestButton);
            editTestButton.click();
            System.out.println("Clicked 'Edit Test' button for Test: " + oldTestName);

            WebElement newTestNameInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("newTestName-" + apiName + "-" + endpointName + "-" + oldTestName)));
            newTestNameInput.clear();
            newTestNameInput.sendKeys(newTestName);

            WebElement submitUpdateTestButton = driver.findElement(By.id("submit-test-name-update-" + apiName + "-" + endpointName + "-" + oldTestName));
            submitUpdateTestButton.click();
            System.out.println("Updated Test Name: " + oldTestName + " to " + newTestName);
            SeleniumUtils.handleAlert(driver, wait);
            // Adding wait after clicking the submit button
            SeleniumUtils.waitForHalfSeconds();

        } catch (Exception e) {
            System.out.println("Error in updateTestName: " + e.getMessage());
        }
    }

    public void deleteTest(String apiName, String endpointName, String testName) {
        try {
            WebElement endpointCard = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(@id,'endpoint-card-" + endpointName + "')]")));
            // delete-test-Test API-Updated Endpoint-Updated Test Case
            String id = "delete-test-"+apiName+"-"+endpointName+"-"+testName;
            WebElement deleteTestButton = endpointCard.findElement(By.id(id));
            scrollToElement(driver, deleteTestButton);
            deleteTestButton.click();
            System.out.println("Clicked 'Delete Test' button for Test: " + testName);
            SeleniumUtils.handleAlert(driver, wait);
        } catch (Exception e) {
            System.out.println("Error in deleteTest: " + e.getMessage());
        }
    }

    public void deleteEndpoint(String apiName, String endpointName) {
        try {
            WebElement endpointCard = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(@id,'endpoint-card-" + endpointName + "')]")));
            WebElement deleteEndpointButton = endpointCard.findElement(By.id("delete-endpoint-" + endpointName));
            deleteEndpointButton.click();
            System.out.println("Clicked 'Delete Endpoint' button for Endpoint: " + endpointName);
            SeleniumUtils.handleAlert(driver, wait);
        } catch (Exception e) {
            System.out.println("Error in deleteEndpoint: " + e.getMessage());
        }
    }

    public void deleteApi(String apiName) {
        try {
            WebElement apiCard = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h2[contains(text(),'" + apiName + "')]/..")));
            WebElement deleteApiButton = apiCard.findElement(By.id("delete-api-" + apiName));
            deleteApiButton.click();
            System.out.println("Clicked 'Delete API' button for API: " + apiName);
            SeleniumUtils.handleAlert(driver, wait);
        } catch (Exception e) {
            System.out.println("Error in deleteApi: " + e.getMessage());
        }
    }

    public void viewAndPrintTestDetails(String apiName, String endpointName, String testName) {
        try {
            String buttonId = "test-item-" + apiName + "-" + endpointName + "-" + testName;
            WebElement testButton = wait.until(ExpectedConditions.elementToBeClickable(By.id(buttonId)));
            testButton.click();
            System.out.println("Clicked test case button: " + testName);

            SeleniumUtils.waitForHalfSeconds();

            String modalTitleId = "test-case-title-" + testName;
            WebElement modalTitle = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(modalTitleId)));
            System.out.println("Test case title: " + modalTitle.getText());

            // Click each tab
            clickTab(testName, "fullTest");
            clickTab(testName, "request");
            clickTab(testName, "response");

            // Optional tabs for specific methods (like POST or PUT)
            clickTab(testName, "requestBody");
            clickTab(testName, "apiRequestResponse");

            // Close the modal
            closeModal();

        } catch (Exception e) {
            System.out.println("Error in viewAndPrintTestDetails: " + e.getMessage());
        }
    }

    private void clickTab(String testName, String tabKey) throws InterruptedException {
        try {
            String tabId = "test-case-tabs-" + testName + "-tab-" + tabKey;
            WebElement tabButton = wait.until(ExpectedConditions.elementToBeClickable(By.id(tabId)));
            tabButton.click();
            System.out.println("Clicked tab: " + tabKey);
            SeleniumUtils.waitForHalfSeconds();
        } catch (Exception e) {
            System.out.println("Tab not found or not clickable: " + tabKey);
        }
    }

    private void closeModal() {
        try {
            WebElement closeButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button.btn-close")));
            closeButton.click();
            System.out.println("Closed the modal.");
            SeleniumUtils.waitForHalfSeconds();
        } catch (Exception e) {
            System.out.println("Error in closeModal: " + e.getMessage());
        }
    }

    public void openJsonPreviewAndClose() {
        // Click the button to open the modal
        WebElement showJsonPreviewButton = wait.until(ExpectedConditions.elementToBeClickable(By.id("show-json-preview-button")));
        scrollToElement(driver, showJsonPreviewButton);
        showJsonPreviewButton.click();

        // Wait for the modal to be displayed
        WebElement modal = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".modal.show")));

        // Scroll to the bottom of the modal
        scrollToElement(driver, modal);

        // Click the button to close the modal
        WebElement closeJsonPreviewButton = wait.until(ExpectedConditions.elementToBeClickable(By.id("close-json-preview-button")));
        closeJsonPreviewButton.click();
    }

}