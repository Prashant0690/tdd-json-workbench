import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row, Tab, Tabs } from 'react-bootstrap';
import NameValuePairInputForm from "./NameValuePairInputForm";
import { cloneDeep, isEmpty, omitBy } from 'lodash';
import JsonTextAreaFormatter from "./JsonTextAreaFormatter";
import ApiDataContext from "../../ApiDataContext";
import { HTTP_METHODS } from "../../constant/constants";
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import CommonHeadersSelect from "./CommonHeadersSelect";

function ApiRequestResponseForm({ data, onHide }) {
    const { updateTest } = useContext(ApiDataContext);
    const { apiName, endPointName, testName, url, ...restOfData } = data;
    const [apiData, ] = useState(cloneDeep(restOfData));
    const [requestMethod, setRequestMethod] = useState(apiData?.request?.method || 'GET');
    const [requestPath, setRequestPath] = useState(apiData?.request?.path || '');
    const [requestHeaders, setRequestHeaders] = useState(apiData?.request?.headers || {});
    const [requestQueryParams, setRequestQueryParams] = useState(apiData?.request?.queryParams || {});
    const [requestPathParams, setRequestPathParams] = useState(apiData?.request?.pathParams || {});
    const [requestBody, setRequestBody] = useState(() => {
        try {
            return JSON.parse(apiData?.request?.body || '{}');
        } catch {
            return {};
        }
    });
    const [responseStatus, setResponseStatus] = useState(apiData?.response?.status || '');
    const [responseHeaders, setResponseHeaders] = useState(apiData?.response?.headers || {});
    const [responseBody, setResponseBody] = useState(() => {
        try {
            return JSON.parse(apiData?.response?.body || '{}');
        } catch {
            return {};
        }
    });

    const getUpdatedData = () => {
        const updatedData = {
            ...apiData,
            request: {
                ...apiData.request,
                method: requestMethod,
                path: requestPath,
                headers: requestHeaders,
                queryParams: requestQueryParams,
                pathParams: requestPathParams,
                body: JSON.stringify(requestBody),
            },
            response: {
                ...apiData.response,
                status: responseStatus,
                headers: responseHeaders,
                body: JSON.stringify(responseBody),
            }
        };

        // Remove properties that are null, undefined, or empty
        const cleanedData = omitBy(updatedData, isNilOrEmpty);

        return cleanedData;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedData = getUpdatedData();
        updateTest(apiName, endPointName, testName, url, updatedData.request, updatedData.response);
        onHide();
    };

    function isNilOrEmpty(value) {
        if (value === null || value === undefined) {
            return true;
        }
        if (typeof value === 'object' && isEmpty(value)) {
            return true;
        }
        if (typeof value === 'string' && value.trim() === '') {
            return true;
        }
        return false;
    }

    return (
        <div className="p-3">
            <Form onSubmit={handleSubmit}>
                <Tabs defaultActiveKey="request" id={`request-response-tabs-${testName}`}>
                    <Tab eventKey="request" title="Request" id={`request-tab-${testName}`}>
                        <br />
                        <Tabs defaultActiveKey="url_method" id={`request-tabs-${testName}`}>
                            <Tab eventKey="url_method" title="Request Method & URI" id={`url-method-tab-${testName}`}>
                                <Container fluid>
                                    <Row>
                                        <Col md={2}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Method</Form.Label>
                                                <Form.Control
                                                    id={`request-method-${testName}`}
                                                    as="select"
                                                    value={requestMethod}
                                                    onChange={(e) => setRequestMethod(e.target.value)}
                                                >
                                                    <option>{HTTP_METHODS.GET}</option>
                                                    <option>{HTTP_METHODS.POST}</option>
                                                    <option>{HTTP_METHODS.PUT}</option>
                                                    <option>{HTTP_METHODS.DELETE}</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md={10}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Path</Form.Label>
                                                <Form.Control
                                                    id={`request-path-${testName}`}
                                                    type="text"
                                                    value={requestPath}
                                                    onChange={(e) => setRequestPath(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Container>
                            </Tab>
                            <Tab eventKey="headers" title="Headers" id={`request-headers-tab-${testName}`}>
                                <Form.Label>Headers</Form.Label>
                                <CommonHeadersSelect headers={requestHeaders} setHeaders={setRequestHeaders} />
                                <NameValuePairInputForm headers={requestHeaders} setHeaders={setRequestHeaders} idPrefix="header" />
                            </Tab>
                            <Tab eventKey="queryParams" title="Query Parameters" id={`query-params-tab-${testName}`}>
                                <Form.Label>Query Parameters</Form.Label>
                                <NameValuePairInputForm headers={requestQueryParams} setHeaders={setRequestQueryParams} idPrefix="queryParam" />
                            </Tab>
                            <Tab eventKey="pathParams" title="Path Parameters" id={`path-params-tab-${testName}`}>
                                <Form.Label>Path Parameters</Form.Label>
                                <NameValuePairInputForm headers={requestPathParams} setHeaders={setRequestPathParams} idPrefix="pathParam" />
                            </Tab>
                            <Tab eventKey="body" title="Body" id={`request-body-tab-${testName}`}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Body</Form.Label>
                                    <JsonTextAreaFormatter
                                        value={requestBody}
                                        onChangeValue={setRequestBody}
                                        idPrefix="request-body"
                                    />
                                </Form.Group>
                            </Tab>
                        </Tabs>
                    </Tab>

                    <Tab eventKey="response" title="Response" id={`response-tab-${testName}`}>
                        <br />
                        <Tabs defaultActiveKey="status" id={`response-tabs-${testName}`}>
                            <Tab eventKey="status" title="Status" id={`status-tab-${testName}`}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control
                                        id={`response-status-${testName}`}
                                        as="select"
                                        value={responseStatus}
                                        onChange={(e) => setResponseStatus(Number(e.target.value))}
                                    >
                                        {Object.keys(StatusCodes).filter(code => !isNaN(code)).map(statusCode =>
                                            <option key={statusCode} value={statusCode}>
                                                {statusCode} {getReasonPhrase(Number(statusCode))}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </Tab>
                            <Tab eventKey="headers" title="Headers" id={`response-headers-tab-${testName}`}>
                                <Form.Label>Headers</Form.Label>
                                <CommonHeadersSelect headers={responseHeaders} setHeaders={setResponseHeaders} />
                                <NameValuePairInputForm headers={responseHeaders} setHeaders={setResponseHeaders} idPrefix="responseHeader" />
                            </Tab>
                            <Tab eventKey="body" title="Body" id={`response-body-tab-${testName}`}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Body</Form.Label>
                                    <JsonTextAreaFormatter
                                        value={responseBody}
                                        onChangeValue={setResponseBody}
                                        idPrefix="response-body"
                                    />
                                </Form.Group>
                            </Tab>
                        </Tabs>
                    </Tab>
                </Tabs>

                <Button id={`submit-button-${testName}`} variant="primary" type="submit" className="mt-2">
                    Save and update
                </Button>
            </Form>
        </div>
    );
}

export default ApiRequestResponseForm;