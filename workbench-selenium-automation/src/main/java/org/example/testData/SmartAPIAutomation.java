package org.example.testData;

import org.example.ApiAutomation;
import org.example.model.RequestResponse;
import org.example.util.SeleniumUtils;

public class SmartAPIAutomation {

    public static void runSmartApiTests(ApiAutomation automation) {
        // Add a new API for SmartAPI Place Orders
        SeleniumUtils.waitForHalfSeconds();
        System.out.println("Starting: Add a new API");
        automation.addApi("SmartAPI", "https://apiconnect.angelbroking.com", "");
        System.out.println("Completed: Add a new API");

        // Update Default Endpoint to Place Orders
        SeleniumUtils.waitForHalfSeconds();
        System.out.println("Starting: Update endpoint name from DefaultEndpoint to a new Endpoint");
        automation.updateEndpointName("SmartAPI", "DefaultEndpoint", "Place Orders");
        System.out.println("Completed: Update Endpoint name");

        // Add a new Endpoint for Cancel Orders
        SeleniumUtils.waitForHalfSeconds();
        System.out.println("Starting: Add a new Endpoint");
        automation.addEndpoint("SmartAPI", "Cancel Orders");
        System.out.println("Completed: Add a new Endpoint");

        // Add a Test Case for Place Order - Successful response
        SeleniumUtils.waitForHalfSeconds();
        System.out.println("Starting: Add a Test Case for Place Order - Successful response");
        automation.addTest("SmartAPI", "Place Orders", "Successful Place Order");

        // Add a Test Case for Cancel Order - Successful response
        SeleniumUtils.waitForHalfSeconds();
        System.out.println("Starting: Add a Test Case for Cancel Order - Successful response");
        automation.addTest("SmartAPI", "Cancel Orders", "Successful Cancel Order");

        // Add and Update Request/Response for a successful Place Order Test Case
        RequestResponse successPlaceOrderData = new RequestResponse.Builder()
                .setPath("/rest/secure/angelbroking/order/v1/placeOrder")
                .setMethod("POST")
                .addHeader("Content-Type", "application/json")
                .addHeader("Authorization", "Bearer AUTHORIZATION_TOKEN")
                .addHeader("Accept", "application/json")
                .setBody("{\n" +
                        "    \"exchange\": \"NSE\",\n" +
                        "    \"tradingsymbol\": \"INFY-EQ\",\n" +
                        "    \"quantity\": 5,\n" +
                        "    \"disclosedquantity\": 3,\n" +
                        "    \"transactiontype\": \"BUY\",\n" +
                        "    \"ordertype\": \"MARKET\",\n" +
                        "    \"variety\": \"NORMAL\",\n" +
                        "    \"producttype\": \"INTRADAY\"\n" +
                        "}")
                .setStatus(200)
                .setResponseBody("{\n" +
                        "    \"status\": true,\n" +
                        "    \"message\": \"SUCCESS\",\n" +
                        "    \"errorcode\": \"\",\n" +
                        "    \"data\": {\n" +
                        "        \"script\": \"SBIN-EQ\",\n" +
                        "        \"orderid\": \"200910000000111\",\n" +
                        "        \"uniqueorderid\": \"34reqfachdfih\"\n" +
                        "    }\n" +
                        "}")
                .build();

        automation.editRequestResponse.updateRequestResponse("SmartAPI", "Place Orders", "Successful Place Order", successPlaceOrderData);

        // Add and Update Request/Response for a successful Cancel Order Test Case
        RequestResponse successCancelOrderData = new RequestResponse.Builder()
                .setPath("/rest/secure/angelbroking/order/v1/cancelOrder")
                .setMethod("POST")
                .addHeader("Content-Type", "application/json")
                .addHeader("Authorization", "Bearer AUTHORIZATION_TOKEN")
                .addHeader("Accept", "application/json")
                .setBody("{\n" +
                        "    \"variety\": \"NORMAL\",\n" +
                        "    \"orderid\": \"201020000000080\"\n" +
                        "}")
                .setStatus(200)
                .setResponseBody("{\n" +
                        "    \"status\": true,\n" +
                        "    \"message\": \"SUCCESS\",\n" +
                        "    \"errorcode\": \"\",\n" +
                        "    \"data\": {\n" +
                        "        \"orderid\": \"201020000000080\",\n" +
                        "        \"uniqueorderid\": \"34reqfachdfih\"\n" +
                        "    }\n" +
                        "}")
                .build();

        automation.editRequestResponse.updateRequestResponse("SmartAPI", "Cancel Orders", "Successful Cancel Order", successCancelOrderData);

        // Clone the "Successful Cancel Order" test case and rename it
        SeleniumUtils.waitForHalfSeconds();
        System.out.println("Starting: Clone the Test Case for Cancel Order - Successful response");
        automation.cloneTestCase("SmartAPI", "Cancel Orders", "Successful Cancel Order");
        System.out.println("Completed: Clone the Test Case");

        // Update the cloned Test Case's name
        SeleniumUtils.waitForHalfSeconds();
        System.out.println("Starting: Update Cloned Test Case Name");
        automation.updateTestName("SmartAPI", "Cancel Orders", "Successful Cancel Order-Copy", "Failed Cancel Order Not Found");
        System.out.println("Completed: Update Cloned Test Case Name");

        // Update the request/response for the cloned test case - Order Not Found
        RequestResponse failedCancelOrderNotFound = new RequestResponse.Builder()
                .setPath("/rest/secure/angelbroking/order/v1/cancelOrder")
                .setMethod("POST")
                .addHeader("Content-Type", "application/json")
                .addHeader("Authorization", "Bearer AUTHORIZATION_TOKEN")
                .addHeader("Accept", "application/json")
                .setBody("{\n" +
                        "    \"variety\": \"NORMAL\",\n" +
                        "    \"orderid\": \"INVALID_ORDER_ID\"\n" +
                        "}")
                .setStatus(404)
                .setResponseBody("{\n" +
                        "    \"status\": false,\n" +
                        "    \"message\": \"Order not found\",\n" +
                        "    \"errorcode\": \"AB1013\",\n" +
                        "    \"data\": null\n" +
                        "}")
                .build();

        automation.editRequestResponse.updateRequestResponse("SmartAPI", "Cancel Orders", "Failed Cancel Order Not Found", failedCancelOrderNotFound);

        // Json Preview
        automation.openJsonPreviewAndClose();

        // Update Test Case Name
        SeleniumUtils.waitForHalfSeconds();
        System.out.println("Starting: Update Test Case Name");
        automation.updateTestName("SmartAPI", "Place Orders", "Successful Place Order", "Updated Successful Place Order");
        System.out.println("Completed: Update Test Case Name");


        // Preview the JSON and keep open for 5 seconds
        automation.openJsonPreviewAndClose();
        SeleniumUtils.waitForSeconds(5);
    }
}