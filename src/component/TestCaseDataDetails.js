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
import React, { useState } from 'react';
import { Card, ListGroup, Modal, Tab, Tabs, Alert } from 'react-bootstrap';
import ApiRequestResponseForm from "./form/ApiRequestResponseForm";

const TestCaseDataDetails = ({ data, show, handleClose }) => {
  const [activeTab, setActiveTab] = useState('fullTest'); // State to track the active tab

  const hasRequest = data.request !== undefined;
  const hasResponse = data.response !== undefined;

  const hasRequestBody = hasRequest && data.request.body && data.request.body.length > 0;
  const hasResponseBody = hasResponse && data.response.body && data.response.body.length > 0;

  const parsedRequestBody = hasRequestBody ? JSON.parse(data.request.body) : null;
  const parsedResponseBody = hasResponseBody ? JSON.parse(data.response.body) : null;

  // Define help text based on the active tab
  const helpText = {
    fullTest: "This tab shows the full test object in JSON format.",
    request: "This tab shows the details of the API request, including headers and parameters.",
    response: "This tab shows the details of the API response, including headers and body.",
    requestBody: "This tab shows the JSON body of the API request.",
    responseBody: "This tab shows the JSON body of the API response.",
    apiRequestResponse: "This tab allows you to edit the API request and response details."
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose} centered id={`test-case-modal-${data.testName}`}>
      <Modal.Header closeButton>
        <Modal.Title id={`test-case-title-${data.testName}`} style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '95%' }}>
          {data.testName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert  variant="info" className="py-2 px-3 small">{helpText[activeTab]}</Alert> {/* Display the help text */}
        <Tabs
          defaultActiveKey="fullTest"
          id={`test-case-tabs-${data.testName}`}
          onSelect={(tab) => setActiveTab(tab)} // Update active tab
        >
          <Tab eventKey="fullTest" title="Full Test Object" id={`full-test-tab-${data.testName}`}>
            <Card>
              <Card.Header>
                <strong>Full Test Object:</strong>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item id={`full-test-content-${data.testName}`}>
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Tab>
          <Tab eventKey="request" title="Request" id={`request-tab-${data.testName}`} className="custom-tab">
            <Card>
              <Card.Header>
                <strong>Request:</strong>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item id={`request-content-${data.testName}`}>
                  <pre>{JSON.stringify(data.request, null, 2)}</pre>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Tab>
          <Tab eventKey="response" title="Response" id={`response-tab-${data.testName}`} className="custom-tab">
            <Card>
              <Card.Header>
                <strong>Response:</strong>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item id={`response-content-${data.testName}`}>
                  <pre>{JSON.stringify(data.response, null, 2)}</pre>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Tab>
          {hasRequestBody && (
            <Tab eventKey="requestBody" title="Request Body (JSON)" id={`request-body-tab-${data.testName}`} className="custom-tab">
              <Card>
                <Card.Header>
                  <strong>Request Body:</strong>
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item id={`request-body-content-${data.testName}`}>
                    <pre>{JSON.stringify(parsedRequestBody, null, 2)}</pre>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Tab>
          )}
          {hasResponseBody && (
            <Tab eventKey="responseBody" title="Response Body (JSON)" id={`response-body-tab-${data.testName}`} className="custom-tab">
              <Card>
                <Card.Header>
                  <strong>Response Body:</strong>
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item id={`response-body-content-${data.testName}`}>
                    <pre>{JSON.stringify(parsedResponseBody, null, 2)}</pre>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Tab>
          )}
          <Tab eventKey="apiRequestResponse" title={"Edit Request/Response"} id={`edit-request-response-tab-${data.testName}`} className="custom-tab">
            <ApiRequestResponseForm data={data} onHide={handleClose} />
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default TestCaseDataDetails;