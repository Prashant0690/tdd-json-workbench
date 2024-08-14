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
package com.example.demo.tddworkbench.restAssured;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.DynamicTest.dynamicTest;

public class APITestRunner {
    final static String BASE_URL = "https://jsonplaceholder.typicode.com";

    @TestFactory
    Stream<DynamicTest> runAPITests() throws Exception {
        byte[] jsonData = Files.readAllBytes(Paths.get("./src/test/resources/jsonplaceholder.json"));
        ObjectMapper mapper = new ObjectMapper();
        List<APIScenario> testCases = mapper.readValue(jsonData, new TypeReference<List<APIScenario>>() {
        });



        return testCases.stream().map(testCase -> dynamicTest("Test for: " + testCase.getIdentifier(), () -> {
            RestAssured.baseURI = testCase.getUrl();
            APIRequest request = testCase.getRequest();
            APIResponse expectedResponse = testCase.getResponse();

            RequestSpecification spec = RestAssured.given();

            // Add headers
            for (Map.Entry<String, String> header : request.getHeaders().entrySet()) {
                spec.header(header.getKey(), header.getValue());
            }

            // Add query params
            for (Map.Entry<String, String> queryParam : request.getQueryParams().entrySet()) {
                spec.queryParam(queryParam.getKey(), queryParam.getValue());
            }

            // Add path params
            for (Map.Entry<String, String> pathParam : request.getPathParams().entrySet()) {
                spec.pathParam(pathParam.getKey(), pathParam.getValue());
            }

            // Add request body
            if (request.getBody() != null && !request.getBody().isEmpty()) {
                spec.body(request.getBody()).contentType(ContentType.JSON);
            }

            // Log the request
            spec.log().all();

            // Make the request and get the response
            Response response;
            switch (request.getMethod()) {
                case "GET":
                    response = spec.when().get(request.getPath());
                    break;
                case "POST":
                    response = spec.when().post(request.getPath());
                    break;
                case "PUT":
                    response = spec.when().put(request.getPath());
                    break;
                case "DELETE":
                    response = spec.when().delete(request.getPath());
                    break;
                default:
                    throw new IllegalArgumentException("Invalid HTTP method: " + request.getMethod());
            }

            // Log the response
            response.then().log().all();

            // Check status code
            response.then().statusCode(expectedResponse.getStatus());

            // Validate the response status and body
            if (expectedResponse.getBody() != null && !expectedResponse.getBody().isEmpty()) {
                Map<String, Object> expectedResponseBody = mapper.readValue(expectedResponse.getBody(), new TypeReference<Map<String, Object>>() {
                });
                for (Map.Entry<String, Object> bodyField : expectedResponseBody.entrySet()) {
                    System.out.println(bodyField.getKey() +" :: "+ bodyField.getValue());
                    response.then().body(bodyField.getKey(), equalTo(bodyField.getValue()));
                }
            }
        }));
    }
}
