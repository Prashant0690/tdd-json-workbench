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

public class OpenWeatherApiAutomation {

    public static void runOpenWeatherApiTests(ApiAutomation automation) {
        SeleniumUtils.waitForHalfSeconds();
        System.out.println("Starting: Add a new API");
        automation.addApi("OpenWeather API", "https://api.openweathermap.org/data/3.0/onecall", "");
        System.out.println("Completed: Add a new API");

        // Update API URL
        SeleniumUtils.waitForHalfSeconds();
        System.out.println("Starting: Update API URL");
        automation.updateApiUrl("OpenWeather API", "https://api.openweathermap.org/data/3.0/onecall");
        System.out.println("Completed: Update API URL");

        // Add a new Endpoint for Weather Overview
        SeleniumUtils.waitForHalfSeconds();
        System.out.println("Starting: Add a new Endpoint");
        automation.addEndpoint("OpenWeather API", "Weather Overview");
        System.out.println("Completed: Add a new Endpoint");

        // Add a Test Case for successful response
        SeleniumUtils.waitForHalfSeconds();
        System.out.println("Starting: Add a Test Case for successful response");
        automation.addTest("OpenWeather API", "Weather Overview", "Successful Weather Overview");

        // Add a Test Case for error response - Not Found
        SeleniumUtils.waitForHalfSeconds();
        System.out.println("Starting: Add a Test Case for error response - Not Found");
        automation.addTest("OpenWeather API", "Weather Overview", "Error Not Found");

        // Add and Update Request/Response for a successful Test Case
        RequestResponse successData = new RequestResponse.Builder()
                .setPath("/overview?lon=-11.8092&lat=51.509865&appid={API_KEY}")
                .setMethod("GET")
                .addHeader("Content-Type", "application/json")
                .setStatus(200)
                .setResponseBody("{\n" +
                        "   \"lat\": 51.509865,\n" +
                        "   \"lon\": -0.118092,\n" +
                        "   \"tz\": \"+01:00\",\n" +
                        "   \"date\": \"2024-05-13\",\n" +
                        "   \"units\": \"metric\",\n" +
                        "   \"weather_overview\": \"The current weather is overcast with a temperature of 16°C and a feels-like temperature of 16°C. The wind speed is 4 meter/sec with gusts up to 6 meter/sec coming from the west-southwest direction. The air pressure is at 1007 hPa with a humidity level of 79%. The dew point is at 12°C and the visibility is 10000 meters. The UV index is at 4, indicating moderate risk from the sun's UV rays. The sky is covered with overcast clouds, and there is no precipitation expected at the moment. Overall, it is a moderately cool and cloudy day with light to moderate winds from the west-southwest.\"\n" +
                        "}")
                .build();

        automation.editRequestResponse.updateRequestResponse("OpenWeather API", "Weather Overview", "Successful Weather Overview", successData);

        // Add and Update Request/Response for an error Test Case - Not Found
        RequestResponse errorNotFound = new RequestResponse.Builder()
                .setPath("/overview?lon=0&lat=0&appid={API_KEY}")
                .setMethod("GET")
                .addHeader("Content-Type", "application/json")
                .setStatus(404)
                .setResponseBody("{\n" +
                        "    \"cod\": 404,\n" +
                        "    \"message\": \"Data not found\"\n" +
                        "}")
                .build();

        automation.editRequestResponse.updateRequestResponse("OpenWeather API", "Weather Overview", "Error Not Found", errorNotFound);

        // View and print test details for success case
        automation.viewAndPrintTestDetails("OpenWeather API", "Weather Overview", "Successful Weather Overview");

        // Json Preview
        automation.openJsonPreviewAndClose();

        // Update Test Case Name
        SeleniumUtils.waitForHalfSeconds();
        System.out.println("Starting: Update Test Case Name");
        automation.updateTestName("OpenWeather API", "Weather Overview", "Successful Weather Overview", "Updated Successful Weather Overview");
        System.out.println("Completed: Update Test Case Name");

        // Delete the default Test Case
        SeleniumUtils.waitForHalfSeconds();
        System.out.println("Starting: Delete the DefaultEndpoint");
        automation.deleteEndpoint("OpenWeather API", "DefaultEndpoint");
        System.out.println("Completed: Delete the DefaultEndpoint");

        // Preview the JSON and keep open for 5 seconds
        automation.openJsonPreviewAndClose();
    }
}