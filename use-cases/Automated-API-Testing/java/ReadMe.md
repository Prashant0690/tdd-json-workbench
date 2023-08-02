# Java API Testing with Dynamic JSON Scenarios

This project demonstrates a unique use case of Java for API testing, specifically how to use dynamically generated JSON files to define API test scenarios. This approach allows for robust and flexible API testing based on scenarios specified in the JSON files, which can be easily modified or extended to fit different testing needs.

**Note:** This project doesn't include a full-fledged application setup but provides essential code files and documentation for understanding and reference purposes.

## Key Concepts

The project is based around these main components:

- **APIScenario:** A class that models the data structure for an API test scenario. It includes details about the API request and the expected API response.

```java
public class APIScenario {
    private String apiName;
    private String endPointName;
    private String testName;
    private APIRequest request;
    private APIResponse response;
    // getters and setters
    
    public String getIdentifier() {
        return this.apiName + "::" + this.endPointName + "::" + this.testName;
    }
}
```

- **APIRequest:** A class that models the API request, including the HTTP method, headers, query parameters, path parameters, and body.

```java
public class APIRequest {
    private String method;
    private String path;
    private Map<String, String> headers;
    private Map<String, String> queryParams;
    private Map<String, String> pathParams;
    private String body;
    // getters and setters
}
```

- **APIResponse:** A class that models the expected API response, including the status code, headers, and body.

```java
public class APIResponse {
    private int status;
    private Map<String, String> headers;
    private String body;
    // getters and setters
}
```

- **APITestRunner:** A JUnit 5 based test runner that dynamically generates tests from a JSON file. It sets up API requests, validates responses against expected output, and checks for header consistency.

```java
public class APITestRunner {

    @TestFactory
    Stream<DynamicTest> runAPITests() throws Exception {
        byte[] jsonData = Files.readAllBytes(Paths.get("./src/test/resources/jsonplaceholder.json"));
        ObjectMapper mapper = new ObjectMapper(); // Jackson library
        List<APIScenario> testCases = mapper.readValue(jsonData, new TypeReference<List<APIScenario>>() {});

        return testCases.stream().map(testCase -> dynamicTest("Test for: " + testCase.getIdentifier(), () -> {
            RestAssured.baseURI = testCase.getUrl(); // RestAssured library
            APIRequest request = testCase.getRequest();
            APIResponse expectedResponse = testCase.getResponse();

            RequestSpecification spec = RestAssured.given();

            // Add headers to the request
            for (Map.Entry<String, String> header : request.getHeaders().entrySet()) {
                spec.header(header.getKey(), header.getValue());
            }

            // Add query params to the request
            for (Map.Entry<String, String> queryParam : request.getQueryParams().entrySet()) {
                spec.queryParam(queryParam.getKey(), queryParam.getValue());
            }

            // Add path params to the request
            for (Map.Entry<String, String> pathParam : request.getPathParams().entrySet()) {
                spec.pathParam(pathParam.getKey(), pathParam.getValue());
            }

            // Add request body if available
            if (request.getBody() != null && !request.getBody().isEmpty()) {
                spec.body(request.getBody()).contentType(ContentType.JSON);
            }

            // Log the request for debugging
            spec.log().all();

            // Send the request and get the response
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

            // Log the response for debugging
            response.then().log().all();

            // Validate the response status
            response.then().statusCode(expectedResponse.getStatus());

            // Validate the response headers
            Headers headersInResponse = response.getHeaders();
            for (Map.Entry<String, String> header : expectedResponse.getHeaders().entrySet()) {
                Assert.assertTrue(headersInResponse.hasHeaderWithName(header.getKey()));
                Assert.assertEquals(header.getValue(), headersInResponse.getValue(header.getKey()));
            }

            // Validate the response body if available
            if (expectedResponse.getBody() != null && !expectedResponse.getBody().isEmpty()) {
                Map<String, Object> expectedResponseBody = mapper.readValue(expectedResponse.getBody(), new TypeReference<Map<String, Object>>() {});
                for (Map.Entry<String, Object> bodyField : expectedResponseBody.entrySet()) {
                    System.out.println(bodyField.getKey() +" :: "+ bodyField.getValue());
                    response.then().body(bodyField.getKey(), equalTo(bodyField.getValue()));
                }
            }
        }));
    }
}
```

The `APITestRunner` class reads a JSON file containing API test scenarios. For each test scenario, it sets up and sends an actual API request, captures the response, validates response headers, and compares the response with the expected result. If the actual and expected responses match, the test passes; otherwise, it fails.

## Libraries Used

The following libraries were used in this project:

- **JUnit 5:** Provides the `TestFactory` for dynamic tests and `DynamicTest` for creating individual dynamic test cases.
- **Jackson:** Used for reading JSON files and mapping them to Java objects.
- **RestAssured:** Used for setting up and sending HTTP requests, as well as receiving and validating HTTP responses.

## Wrapping Up

This project demonstrates how Java, in conjunction with generated JSON files, can be effectively utilized for API testing. It showcases the generation of dynamic tests from a JSON file, promoting reusability and maintainability of your API testing suite.


Certainly! Here is the updated section in the readme file:

## Deep Response Comparison

In the `APITestRunner` class, we perform a deep comparison of the expected and actual API responses. This means that we don't only check if the responses are identical at a top-level view, but we also compare nested objects and lists.

We replace the code block for response validation with the following:

```java
if (expectedResponse.getBody() != null && !expectedResponse.getBody().isEmpty()) {
    // Convert the expected response body from JSON to a Map
    Map<String, Object> expectedResponseBody = mapper.readValue(expectedResponse.getBody(), new TypeReference<Map<String, Object>>() {
    });

    // Perform a deep comparison of the actual response body (as a Map) to the expected response body
    validateResponseRecursively(expectedResponseBody, response.getBody().as(Map.class));
}
```

In addition, we introduce a new helper method, `validateResponseRecursively()`, to the `APITestRunner` class. This method takes two maps, `expected` and `actual`, as parameters and compares them recursively. If the maps are not equal, the method throws an `AssertionError`.

Absolutely! Here is the full `validateResponseRecursively()` method with code and comments to provide detailed context for developers:

```java
private void validateResponseRecursively(Map<String, Object> expected, Map<String, Object> actual) {
    // Loop through each entry in the expected response
    for (Map.Entry<String, Object> bodyField : expected.entrySet()) {
        String key = bodyField.getKey();
        Object expectedValue = bodyField.getValue();

        // Print key and expected value
        System.out.println("Expected key: " + key + ", expected value: " + expectedValue);

        // Check if the actual map contains the key
        if (!actual.containsKey(key)) {
            throw new AssertionError("Expected key " + key + " not found in actual map");
        }

        Object actualValue = actual.get(key);

        // If the expected value is a Map (i.e., a nested object), then recursively compare it to the actual value
        if (expectedValue instanceof Map) {
            System.out.println("Found nested object for key: " + key);
            validateResponseRecursively((Map<String, Object>) expectedValue, (Map<String, Object>) actualValue);
        }
        // If the expected value is a List, then check if the actual value is also a List and they are equal
        else if (expectedValue instanceof List) {
            System.out.println("Found list for key: " + key);
            if (!(actualValue instanceof List)) {
                throw new AssertionError("Mismatch at key: " + key + ". Expected a List, but found: " + actualValue);
            }

            List<?> expectedList = (List<?>) expectedValue;
            List<?> actualList = (List<?>) actualValue;

            // Use containsInAnyOrder for comparing Lists
            assertThat("List contents mismatch at key: " + key, new HashSet<>(actualList), containsInAnyOrder(new HashSet<>(expectedList).toArray()));
        }
        // Otherwise, the expected value is a simple type (like String or Integer), so we can directly compare it to the actual value
        else {
            System.out.println("Validating field: " + key);
            assertThat("Mismatch at key: " + key, actualValue, equalTo(expectedValue));
        }
    }
}
```

This recursive method helps to validate nested JSON objects and arrays in API response body.

Please note that we're using `assertThat()` method from `org.junit.Assert` and `containsInAnyOrder()` from Hamcrest library for assertions.

This method first checks if the `actual` map contains all keys present in the `expected` map. For each key-value pair in the `expected` map, it compares the corresponding value in the `actual` map. If the value is another map (i.e., a nested object), it performs a recursive call. If the value is a list, it checks if the actual value is also a list and verifies their equality. If the value is a simple type, like a string or an integer, it performs a direct comparison.

**Note:** For list comparison, we use the `containsInAnyOrder()` method from Hamcrest library, which allows for comparison of two lists regardless of their order. This is particularly useful when the order of elements in the list response from the API may not be guaranteed.

This approach of deep comparison ensures a thorough validation of API responses against the expected outcomes.
