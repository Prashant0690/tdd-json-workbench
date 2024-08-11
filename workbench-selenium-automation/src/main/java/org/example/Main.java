package org.example;

import org.example.model.RequestResponse;
import org.example.util.SeleniumUtils;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {


    public static void main(String[] args) {
        ApiAutomation automation = new ApiAutomation();
        automation.openApplication("http://localhost:3000");

        try {
            // Add a new API
            testCase1(automation);
        } catch (Exception e) {
            System.out.println("An error occurred during execution.");
            e.printStackTrace();
        } finally {
            // Close the application
            automation.closeApplication();
        }
    }

    public static void testCase1(ApiAutomation automation) {
        System.out.println("Starting: Add a new API");
        automation.addApi("Test API", "http://example.com", "default");
        System.out.println("Completed: Add a new API");

        // Update API URL
        SeleniumUtils.waitForSeconds(1);
        System.out.println("Starting: Update API URL");
        automation.updateApiUrl("Test API", "http://newexample.com");
        System.out.println("Completed: Update API URL");

        SeleniumUtils.waitForSeconds(1);
        // Add a new Endpoint
        System.out.println("Starting: Add a new Endpoint");
        automation.addEndpoint("Test API", "New Endpoint");
        System.out.println("Completed: Add a new Endpoint");

        SeleniumUtils.waitForSeconds(1);
        System.out.println("Starting: Add a new Endpoint");
        automation.addEndpoint("Test API", "New Endpoint2");
        System.out.println("Completed: Add a new Endpoint");

        // Update Endpoint Name
        SeleniumUtils.waitForSeconds(1);
        System.out.println("Starting: Update Endpoint Name");
        automation.updateEndpointName("Test API", "New Endpoint", "Updated Endpoint");
        System.out.println("Completed: Update Endpoint Name");

        // Add a Test Case
        SeleniumUtils.waitForSeconds(1);
        System.out.println("Starting: Add a Test Case");
        automation.addTest("Test API", "Updated Endpoint", "New Test Case");
        System.out.println("Completed: Add a Test Case");

        // Add a Test Case
        SeleniumUtils.waitForSeconds(1);
        System.out.println("Starting: Add a Test Case");
        automation.addTest("Test API", "Updated Endpoint", "New Test Case2");
        System.out.println("Completed: Add a Test Case");

        // Add a Test Case
        SeleniumUtils.waitForSeconds(1);
        System.out.println("Starting: Add a Test Case");
        automation.addTest("Test API", "Updated Endpoint", "New Test Case3");
        System.out.println("Completed: Add a Test Case");

        // View and Print Test Details
        SeleniumUtils.waitForSeconds(1);
        System.out.println("Starting: View and Print Test Details");
        //automation.viewAndPrintTestDetails("Test API", "Updated Endpoint", "New Test Case2");
        System.out.println("Completed: View and Print Test Details");

        // Add and Update Request/Response for a Test Case
        // Add and Update Request/Response for a Test Case
        RequestResponse data = new RequestResponse.Builder()
                .setPath("/new/path/{id}")
                .setMethod("POST")
                .addHeader("Content-Type", "application/json")
                .addHeader("Authorization", "token")
                .addPathParam("id", "100")
                .addQueryParam("query", "filter")
                .addQueryParam("page", "10")
                .setBody("{\"key\":\"value\"}")
                .setStatus(202)
                .addResponseHeader("Content-Type", "application/json")
                .setResponseBody("{\"responseKey\":\"responseValue\"}")
                .build();

        automation.editRequestResponse.updateRequestResponse("Test API", "Updated Endpoint", "New Test Case", data);

        // Json Preview
        automation.openJsonPreviewAndClose();
        // Update Test Case Name
        SeleniumUtils.waitForSeconds(1);
        System.out.println("Starting: Update Test Case Name");
        automation.updateTestName("Test API", "Updated Endpoint", "New Test Case", "Updated Test Case");
        System.out.println("Completed: Update Test Case Name");

        // Delete the Test Case
        SeleniumUtils.waitForSeconds(1);
        System.out.println("Starting: Delete the Test Case");
        automation.deleteTest("Test API", "Updated Endpoint", "Updated Test Case");
        System.out.println("Completed: Delete the Test Case");

        // Delete the Endpoint
        SeleniumUtils.waitForSeconds(1);
        System.out.println("Starting: Delete the Endpoint");
        automation.deleteEndpoint("Test API", "Updated Endpoint");
        System.out.println("Completed: Delete the Endpoint");

        // Delete the API
        SeleniumUtils.waitForSeconds(1);
        System.out.println("Starting: Delete the API");
        automation.deleteApi("Test API");
        System.out.println("Completed: Delete the API");
    }

}