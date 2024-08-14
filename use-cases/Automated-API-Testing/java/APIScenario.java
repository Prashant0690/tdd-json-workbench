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
