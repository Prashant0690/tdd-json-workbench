package com.example.demo.tddworkbench.restAssured;

public class APIScenario {

    private String apiName;
    private String endPointName;
    private String testName;
    private String url;
    private APIRequest request;
    private APIResponse response;

    public String getApiName() {
        return apiName;
    }

    public void setApiName(String apiName) {
        this.apiName = apiName;
    }

    public String getEndPointName() {
        return endPointName;
    }

    public void setEndPointName(String endPointName) {
        this.endPointName = endPointName;
    }

    public String getTestName() {
        return testName;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public APIRequest getRequest() {
        return request;
    }

    public void setRequest(APIRequest request) {
        this.request = request;
    }

    public APIResponse getResponse() {
        return response;
    }

    public void setResponse(APIResponse response) {
        this.response = response;
    }

    public String getIdentifier() {
        return String.format("%s::%s::%s::%s", apiName, endPointName, testName, request.getMethod());
    }


}
