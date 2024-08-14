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
package org.example.model;

import java.util.HashMap;
import java.util.Map;

public class RequestResponse {
    // Request fields
    private String path;
    private String method;
    private Map<String, String> headers;
    private Map<String, String> queryParams;
    private Map<String, String> pathParams;
    private String body;

    // Response fields
    private int status;
    private Map<String, String> responseHeaders;
    private String responseBody;

    // Constructor using the Builder
    private RequestResponse(Builder builder) {
        this.path = builder.path;
        this.method = builder.method;
        this.headers = builder.headers;
        this.queryParams = builder.queryParams;
        this.pathParams = builder.pathParams;
        this.body = builder.body;
        this.status = builder.status;
        this.responseHeaders = builder.responseHeaders;
        this.responseBody = builder.responseBody;
    }

    // Getters
    public String getPath() {
        return path;
    }

    public String getMethod() {
        return method;
    }

    public Map<String, String> getHeaders() {
        return headers;
    }

    public Map<String, String> getQueryParams() {
        return queryParams;
    }

    public Map<String, String> getPathParams() {
        return pathParams;
    }

    public String getBody() {
        return body;
    }

    public int getStatus() {
        return status;
    }

    public Map<String, String> getResponseHeaders() {
        return responseHeaders;
    }

    public String getResponseBody() {
        return responseBody;
    }

    // Setters
    public void setPath(String path) {
        this.path = path;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public void setHeaders(Map<String, String> headers) {
        this.headers = headers;
    }

    public void setQueryParams(Map<String, String> queryParams) {
        this.queryParams = queryParams;
    }

    public void setPathParams(Map<String, String> pathParams) {
        this.pathParams = pathParams;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public void setResponseHeaders(Map<String, String> responseHeaders) {
        this.responseHeaders = responseHeaders;
    }

    public void setResponseBody(String responseBody) {
        this.responseBody = responseBody;
    }

    // Builder Class
    public static class Builder {
        private String path;
        private String method;
        private Map<String, String> headers = new HashMap<>();
        private Map<String, String> queryParams = new HashMap<>();
        private Map<String, String> pathParams = new HashMap<>();
        private String body;
        private int status;
        private Map<String, String> responseHeaders = new HashMap<>();
        private String responseBody;

        public Builder setPath(String path) {
            this.path = path;
            return this;
        }

        public Builder setMethod(String method) {
            this.method = method;
            return this;
        }

        public Builder setHeaders(Map<String, String> headers) {
            this.headers = headers;
            return this;
        }

        public Builder addHeader(String key, String value) {
            this.headers.put(key, value);
            return this;
        }

        public Builder setQueryParams(Map<String, String> queryParams) {
            this.queryParams = queryParams;
            return this;
        }

        public Builder addQueryParam(String key, String value) {
            this.queryParams.put(key, value);
            return this;
        }

        public Builder setPathParams(Map<String, String> pathParams) {
            this.pathParams = pathParams;
            return this;
        }

        public Builder addPathParam(String key, String value) {
            this.pathParams.put(key, value);
            return this;
        }

        public Builder setBody(String body) {
            this.body = body;
            return this;
        }

        public Builder setStatus(int status) {
            this.status = status;
            return this;
        }

        public Builder setResponseHeaders(Map<String, String> responseHeaders) {
            this.responseHeaders = responseHeaders;
            return this;
        }

        public Builder addResponseHeader(String key, String value) {
            this.responseHeaders.put(key, value);
            return this;
        }

        public Builder setResponseBody(String responseBody) {
            this.responseBody = responseBody;
            return this;
        }

        public RequestResponse build() {
            return new RequestResponse(this);
        }
    }

    @Override
    public String toString() {
        return "RequestResponse{" +
                "path='" + path + '\'' +
                ", method='" + method + '\'' +
                ", headers=" + headers +
                ", queryParams=" + queryParams +
                ", pathParams=" + pathParams +
                ", body='" + body + '\'' +
                ", status=" + status +
                ", responseHeaders=" + responseHeaders +
                ", responseBody='" + responseBody + '\'' +
                '}';
    }
}
