import React from 'react';
import { Card, ListGroup, Modal, Tab, Tabs } from 'react-bootstrap';
import ApiRequestResponseForm from "./form/ApiRequestResponseForm";

const TestCaseDataDetails = ({ data, show, handleClose }) => {
  const hasRequest = data.request !== undefined;
  const hasResponse = data.response !== undefined;

  const hasRequestBody = hasRequest && data.request.body && data.request.body.length > 0;
  const hasResponseBody = hasResponse && data.response.body && data.response.body.length > 0;

  const parsedRequestBody = hasRequestBody ? JSON.parse(data.request.body) : null;
  const parsedResponseBody = hasResponseBody ? JSON.parse(data.response.body) : null;

  return (
      <Modal size="lg" show={show} onHide={handleClose} centered >
        <Modal.Header closeButton>
          <Modal.Title style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '95%' }}>
            {data.testName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="fullTest">
            {/* Full Test Object Tab */}
            <Tab eventKey="fullTest" title="Full Test Object">
              <Card>
                <Card.Header>
                  <strong>Full Test Object:</strong>
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Tab>
            {/* Request Tab */}
            <Tab eventKey="request" title="Request">
              <Card>
                <Card.Header>
                  <strong>Request:</strong>
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <pre>{JSON.stringify(data.request, null, 2)}</pre>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Tab>
            {/* Response Tab */}
            <Tab eventKey="response" title="Response">
              <Card>
                <Card.Header>
                  <strong>Response:</strong>
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <pre>{JSON.stringify(data.response, null, 2)}</pre>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Tab>
            {/* Request Body (JSON) Tab */}
            {hasRequestBody && (
                <Tab eventKey="requestBody" title="Request Body (JSON)">
                  <Card>
                    <Card.Header>
                      <strong>Request Body:</strong>
                    </Card.Header>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <pre>{JSON.stringify(parsedRequestBody, null, 2)}</pre>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Tab>
            )}
            {/* Response Body (JSON) Tab */}
            {hasResponseBody && (
                <Tab eventKey="responseBody" title="Response Body (JSON)">
                  <Card>
                    <Card.Header>
                      <strong>Response Body:</strong>
                    </Card.Header>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <pre>{JSON.stringify(parsedResponseBody, null, 2)}</pre>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Tab>
            )}
            <Tab eventKey="apiRequestResponse" title={"Edit Request/Response"}>
              {/*<i className="fas fa-edit" aria-hidden="true"></i>*/}
              <ApiRequestResponseForm data={data} onHide={handleClose}/>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
  );
};

export default TestCaseDataDetails;
