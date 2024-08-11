import React, { useContext, useState } from "react";
import { ListGroup, Modal, Button, Row, Col, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import ApiDataContext from "../ApiDataContext";
import { getReasonPhrase } from 'http-status-codes';

function TestNameListItem({ test, onTestClick, isSelected }) {
    const { apiName, endPointName, testName } = test;
    const { updateTestName, deleteTest, cloneTest } = useContext(ApiDataContext);

    const [showModal, setShowModal] = useState(false);
    const [newTestName, setNewTestName] = useState(testName);

    // Get HTTP method and status code
    const { method: httpMethod } = test.request;
    const { status: statusCode } = test.response;

    // Determine the color of the status code
    let statusColor = "text-secondary";
    if (statusCode >= 200 && statusCode < 300) {
        statusColor = "text-success";
    } else if (statusCode >= 300 && statusCode < 400) {
        statusColor = "text-primary";
    } else if (statusCode >= 400 && statusCode < 500) {
        statusColor = "text-warning";
    } else if (statusCode >= 500) {
        statusColor = "text-danger";
    }

    // Determine the color of the http method
    let methodColor = "text-secondary"; // Default color
    if (httpMethod === 'GET') {
        methodColor = "text-primary";
    } else if (httpMethod === 'POST') {
        methodColor = "text-success";
    } else if (httpMethod === 'PUT') {
        methodColor = "text-warning";
    } else if (httpMethod === 'DELETE') {
        methodColor = "text-danger";
    }

    const handleEditClick = (event) => {
        event.stopPropagation();
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        setNewTestName(e.target.value);
    };

    const handleSubmit = () => {
        if (window.confirm("Are you sure you want to update the test name?")) {
            updateTestName(apiName, endPointName, testName, newTestName);
            setShowModal(false);
        }
    };

    const handleDeleteClick = (event) => {
        event.stopPropagation();
        if (window.confirm("Are you sure you want to delete this test?")) {
            deleteTest(apiName, endPointName, testName);
        }
    };

    const copyTestCase = (event) => {
        event.stopPropagation();
        if (window.confirm("Are you sure you want to clone this test?")) {
            cloneTest(apiName, endPointName, testName);
        }
    };

    return (
        <>
            <Container className="mb-2">
                <Row className="d-flex align-items-center">
                    <Col lg={9}>
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id={`tooltip-test-item-${apiName}-${endPointName}-${testName}`}>Click to view the test details.</Tooltip>}
                        >
                            <ListGroup.Item
                                action
                                onClick={onTestClick}
                                className={`${isSelected ? "test-item-selected" : ""}`}
                                id={`test-item-${apiName}-${endPointName}-${testName}`}
                            >
                                <Row className="text-nowrap text-truncate">
                                    <Col lg={2}>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip id={`tooltip-http-method-${apiName}-${endPointName}-${testName}`}>HTTP Method used in the test.</Tooltip>}
                                        >
                                            <b><span className={methodColor} id={`http-method-${apiName}-${endPointName}-${testName}`}>{httpMethod || 'N/A'}</span></b>
                                        </OverlayTrigger>
                                    </Col>
                                    <Col lg={7}>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip id={`tooltip-test-name-${apiName}-${endPointName}-${testName}`}>Test Name</Tooltip>}
                                        >
                                            <strong><span className="text-truncate" id={`test-name-${apiName}-${endPointName}-${testName}`}>{testName}</span></strong>
                                        </OverlayTrigger>
                                    </Col>
                                    <Col lg={1}>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip id={`tooltip-status-code-${apiName}-${endPointName}-${testName}`}>Response Status Code</Tooltip>}
                                        >
                                            <b><span className={statusColor} id={`status-code-${apiName}-${endPointName}-${testName}`}>{statusCode}</span></b>
                                        </OverlayTrigger>
                                    </Col>
                                    <Col lg={2}>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip id={`tooltip-status-reason-${apiName}-${endPointName}-${testName}`}>Status Reason Phrase</Tooltip>}
                                        >
                                            <small className={statusColor} id={`status-reason-${apiName}-${endPointName}-${testName}`}>{getReasonPhrase(Number(statusCode))}</small>
                                        </OverlayTrigger>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </OverlayTrigger>
                    </Col>
                    <Col lg={2} className="d-flex mt-lg-0 mt-2 justify-content-between">
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id={`tooltip-edit-test-${apiName}-${endPointName}-${testName}`}>Edit the name of this test.</Tooltip>}
                        >
                            <Button
                                id={`edit-test-${apiName}-${endPointName}-${testName}`}
                                variant="outline-secondary"
                                onClick={handleEditClick}
                                title="Edit"
                            >
                                <i className="fas fa-edit"></i>
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id={`tooltip-delete-test-${apiName}-${endPointName}-${testName}`}>Delete this test.</Tooltip>}
                        >
                            <Button
                                id={`delete-test-${apiName}-${endPointName}-${testName}`}
                                variant="outline-danger"
                                onClick={handleDeleteClick}
                                title="Delete"
                            >
                                <i className="fas fa-trash"></i>
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id={`tooltip-clone-test-${apiName}-${endPointName}-${testName}`}>Clone this test, creating a copy with "-copy" in the name.</Tooltip>}
                        >
                            <Button
                                id={`clone-test-${apiName}-${endPointName}-${testName}`}
                                variant="outline-secondary"
                                onClick={copyTestCase}
                                title="Clone"
                            >
                                <i className="fas fa-copy"></i>
                            </Button>
                        </OverlayTrigger>
                    </Col>
                </Row>
            </Container>

            {/* Update Test Name Modal */}
            <Modal show={showModal} onHide={handleCloseModal} id={`update-test-name-modal-${apiName}-${endPointName}-${testName}`}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Test Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor={`currentTestName-${apiName}-${endPointName}-${testName}`} className="form-label">
                                Current Test Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id={`currentTestName-${apiName}-${endPointName}-${testName}`}
                                value={testName}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={`newTestName-${apiName}-${endPointName}-${testName}`} className="form-label">
                                New Test Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id={`newTestName-${apiName}-${endPointName}-${testName}`}
                                value={newTestName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id={`tooltip-close-update-test-name-modal-${apiName}-${endPointName}-${testName}`}>Close this dialog without saving changes.</Tooltip>}
                    >
                        <Button variant="secondary" onClick={handleCloseModal} id={`close-update-test-name-modal-${apiName}-${endPointName}-${testName}`}>
                            Close
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id={`tooltip-submit-test-name-update-${apiName}-${endPointName}-${testName}`}>Save the new test name.</Tooltip>}
                    >
                        <Button
                            id={`submit-test-name-update-${apiName}-${endPointName}-${testName}`}
                            variant="primary"
                            onClick={handleSubmit}
                        >
                            Update
                        </Button>
                    </OverlayTrigger>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TestNameListItem;