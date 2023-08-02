import React, { useContext, useState } from "react";
import {ListGroup, Modal, Button, Row, Col, Container} from "react-bootstrap";
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
                        <ListGroup.Item
                            action
                            onClick={onTestClick}
                            className={`flex-grow-1 p-3 ${isSelected ? "bg-light" : ""}`}
                        >
                            <Row className="text-nowrap text-truncate">
                                <Col lg={2}>
                                    <b><span className={methodColor}>{httpMethod || 'N/A'}</span></b>
                                </Col>
                                <Col lg={7}>
                                    <strong><span className="text-truncate">{testName}</span></strong>
                                </Col>
                                <Col lg={1}>
                                    <b><span className={statusColor}>{statusCode}</span></b>
                                </Col>
                                <Col lg={2}>
                                    <small className={statusColor}>{getReasonPhrase(Number(statusCode))}</small>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </Col>
                    <Col lg={2} className="d-flex mt-lg-0 mt-2 justify-content-between">
                        <Button variant="outline-secondary" onClick={handleEditClick} title="Edit">
                            <i className="fas fa-edit"></i>
                        </Button>
                        <Button variant="outline-danger" onClick={handleDeleteClick} title="Delete">
                            <i className="fas fa-trash"></i>
                        </Button>
                        <Button variant="outline-secondary" onClick={copyTestCase} title="Clone">
                            <i className="fas fa-copy"></i>
                        </Button>
                    </Col>
                </Row>
            </Container>




            {/* Update Test Name Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                {/* Modal Header */}
                <Modal.Header closeButton>
                    <Modal.Title>Update Test Name</Modal.Title>
                </Modal.Header>
                {/* Modal Body */}
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="currentTestName" className="form-label">
                                Current Test Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="currentTestName"
                                value={testName}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newTestName" className="form-label">
                                New Test Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="newTestName"
                                value={newTestName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>
                </Modal.Body>
                {/* Modal Footer */}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TestNameListItem;
