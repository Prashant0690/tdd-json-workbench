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
package org.example.testData;

import org.example.ApiAutomation;
import org.example.model.RequestResponse;
import org.example.util.SeleniumUtils;

public class KlarnaApiAutomation {

    private static final String JSON_BODY = "{\n" +
            "  \"billing_address\": {\n" +
            "    \"attention\": \"Attn\",\n" +
            "    \"city\": \"London\",\n" +
            "    \"country\": \"GB\",\n" +
            "    \"email\": \"test.sam@test.com\",\n" +
            "    \"family_name\": \"Andersson\",\n" +
            "    \"given_name\": \"Adam\",\n" +
            "    \"organization_name\": \"string\",\n" +
            "    \"phone\": \"+44795465131\",\n" +
            "    \"postal_code\": \"W1G 0PW\",\n" +
            "    \"region\": \"OH\",\n" +
            "    \"street_address\": \"33 Cavendish Square\",\n" +
            "    \"street_address2\": \"Floor 22 / Flat 2\",\n" +
            "    \"title\": \"Mr.\"\n" +
            "  },\n" +
            "  \"customer\": {\n" +
            "    \"date_of_birth\": \"1978-12-31\",\n" +
            "    \"gender\": \"male\"\n" +
            "  },\n" +
            "  \"description\": \"string\",\n" +
            "  \"intended_use\": \"SUBSCRIPTION\",\n" +
            "  \"locale\": \"en-GB\",\n" +
            "  \"purchase_country\": \"GB\",\n" +
            "  \"purchase_currency\": \"GBP\"\n" +
            "}";

    public static void runKlarnaApiTests(ApiAutomation automation) {
            // Add a new API for Klarna Payments
            SeleniumUtils.waitForHalfSeconds();
            System.out.println("Starting: Add a new API");
            automation.addApi("KlarnaAPI", "https://api.klarna.com", "");
            System.out.println("Completed: Add a new API");

            // Update API URL
            SeleniumUtils.waitForHalfSeconds();
            System.out.println("Starting: Update API URL");
            automation.updateApiUrl("KlarnaAPI", "https://api.klarna.com/payments/v1/authorizations/{authorizationToken}/customer-token");
            System.out.println("Completed: Update API URL");

            // Add a new Endpoint for Customer Token
            SeleniumUtils.waitForHalfSeconds();
            System.out.println("Starting: Add a new Endpoint");
            automation.addEndpoint("KlarnaAPI", "Customer Token");
            System.out.println("Completed: Add a new Endpoint");

            // Add a Test Case for Customer Token - Successful response
            SeleniumUtils.waitForHalfSeconds();
            System.out.println("Starting: Add a Test Case for Customer Token - Successful response");
            automation.addTest("KlarnaAPI", "Customer Token", "Successful Customer Token");

            // Add a Test Case for Customer Token - Failed request due to field constraint
            SeleniumUtils.waitForHalfSeconds();
            System.out.println("Starting: Add a Test Case for Customer Token - Failed request due to field constraint");
            automation.addTest("KlarnaAPI", "Customer Token", "Failed Customer Token Field Constraint");

            // Add a Test Case for Customer Token - Unauthorized
            SeleniumUtils.waitForHalfSeconds();
            System.out.println("Starting: Add a Test Case for Customer Token - Unauthorized");
            automation.addTest("KlarnaAPI", "Customer Token", "Unauthorized Customer Token");

            // Add and Update Request/Response for a successful Customer Token Test Case
            RequestResponse successCustomerTokenData = new RequestResponse.Builder()
                    .setPath("/payments/v1/authorizations/{authorizationToken}/customer-token")
                    .setMethod("POST")
                    .addHeader("Content-Type", "application/json")
                    .setBody(JSON_BODY)
                    .setStatus(200)
                    .setResponseBody("{\n" +
                            "  \"billing_address\": {\n" +
                            "    \"attention\": \"Attn\",\n" +
                            "    \"city\": \"London\",\n" +
                            "    \"country\": \"GB\",\n" +
                            "    \"email\": \"test.sam@test.com\",\n" +
                            "    \"family_name\": \"Andersson\",\n" +
                            "    \"given_name\": \"Adam\",\n" +
                            "    \"organization_name\": \"string\",\n" +
                            "    \"phone\": \"+44795465131\",\n" +
                            "    \"postal_code\": \"W1G 0PW\",\n" +
                            "    \"region\": \"OH\",\n" +
                            "    \"street_address\": \"33 Cavendish Square\",\n" +
                            "    \"street_address2\": \"Floor 22 / Flat 2\",\n" +
                            "    \"title\": \"Mr.\"\n" +
                            "  },\n" +
                            "  \"customer\": {\n" +
                            "    \"date_of_birth\": \"1978-12-31\",\n" +
                            "    \"gender\": \"male\"\n" +
                            "  },\n" +
                            "  \"payment_method_reference\": \"0b1d9815-165e-42e2-8867-35bc03789e00\",\n" +
                            "  \"redirect_url\": \"https://credit.klarna.com/v1/sessions/0b1d9815-165e-42e2-8867-35bc03789e00/redirect\",\n" +
                            "  \"token_id\": \"0b1d9815-165e-42e2-8867-35bc03789e00\"\n" +
                            "}")
                    .build();

            automation.editRequestResponse.updateRequestResponse("KlarnaAPI", "Customer Token", "Successful Customer Token", successCustomerTokenData);

            // Add and Update Request/Response for a failed Customer Token Test Case - Field Constraint
            RequestResponse failedCustomerTokenFieldConstraint = new RequestResponse.Builder()
                    .setPath("/payments/v1/authorizations/{authorizationToken}/customer-token")
                    .setMethod("POST")
                    .addHeader("Content-Type", "application/json")
                    .setBody(JSON_BODY)
                    .setStatus(400)
                    .setResponseBody("{\n" +
                            "  \"success\": false,\n" +
                            "  \"error\": {\n" +
                            "    \"code\": 400,\n" +
                            "    \"message\": \"We were unable to create a customer token with the provided data. Some field constraint was violated.\"\n" +
                            "  }\n" +
                            "}")
                    .build();

            automation.editRequestResponse.updateRequestResponse("KlarnaAPI", "Customer Token", "Failed Customer Token Field Constraint", failedCustomerTokenFieldConstraint);

            // Add and Update Request/Response for an Unauthorized Customer Token Test Case
            RequestResponse unauthorizedCustomerToken = new RequestResponse.Builder()
                    .setPath("/payments/v1/authorizations/{authorizationToken}/customer-token")
                    .setMethod("POST")
                    .addHeader("Content-Type", "application/json")
                    .setBody(JSON_BODY)
                    .setStatus(403)
                    .setResponseBody("{\n" +
                            "  \"success\": false,\n" +
                            "  \"error\": {\n" +
                            "    \"code\": 403,\n" +
                            "    \"message\": \"You were not authorized to execute this operation.\"\n" +
                            "  }\n" +
                            "}")
                    .build();

            automation.editRequestResponse.updateRequestResponse("KlarnaAPI", "Customer Token", "Unauthorized Customer Token", unauthorizedCustomerToken);

            // Json Preview
            automation.openJsonPreviewAndClose();

            // Keep JSON preview open for 5 seconds
            SeleniumUtils.waitForSeconds(5);

    }
}