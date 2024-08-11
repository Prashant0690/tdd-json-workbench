import { Card, Row, Col, ListGroup, Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import TestNameListItem from './TestNameListItem';
import TestCaseDataDetails from './TestCaseDataDetails';
import { useContext, useState } from "react";
import ApiDataContext from "../ApiDataContext";

function EndpointListItem({ endpointName, apiName, url }) {
    const { getEndpointTests, selectedTest, handleTestClick, updateEndpoint, deleteEndpoint, addTest } = useContext(ApiDataContext);
    const [showPopup, setShowPopup] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newEndpointName, setNewEndpointName] = useState(endpointName);
    const [showAddTestModal, setShowAddTestModal] = useState(false);
    const [newTestName, setNewTestName] = useState('');

    const handlePopupOpen = () => {
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const handleUpdateClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = () => {
        if (window.confirm("Are you sure you want to update the endpoint name?")) {
            updateEndpoint(apiName, endpointName, newEndpointName);
            setShowModal(false);
        }
    };

    const handleInputChange = (e) => {
        setNewEndpointName(e.target.value);
    };

    const handleDeleteClick = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this endpoint?");
        if (confirmDelete) {
            deleteEndpoint(apiName, endpointName);
        }
    };

    const handleShowAddTestModal = () => {
        setShowAddTestModal(true);
    };

    const handleCloseAddTestModal = () => {
        setShowAddTestModal(false);
    };

    const handleAddTestSubmit = () => {
        if (newTestName) {
            addTest(apiName, endpointName, newTestName, url);
            setNewTestName('');  // reset new test name input
            setShowAddTestModal(false);  // close modal
        } else {
            alert("Please enter a test name.");
        }
    };

    const handleNewTestNameChange = (e) => {
        setNewTestName(e.target.value);
    };

    return (
        <Card className="mb-4" id={`endpoint-card-${endpointName}`}>
            <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                {endpointName}
                <div>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id={`tooltip-add-test-${endpointName}`}>Add a new test case to this endpoint.</Tooltip>}
                    >
                        <button
                            id={`add-test-${endpointName}`}
                            className="btn btn-light mx-1"
                            onClick={handleShowAddTestModal}
                        >
                            Add New Test <i className="fas fa-plus" aria-hidden="true"></i>
                        </button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id={`tooltip-edit-endpoint-${endpointName}`}>Edit the name of this endpoint.</Tooltip>}
                    >
                        <button
                            id={`edit-endpoint-${endpointName}`}
                            className="btn btn-light mx-1"
                            onClick={handleUpdateClick}
                        >
                            <i className="fas fa-edit" aria-hidden="true"></i>
                        </button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id={`tooltip-delete-endpoint-${endpointName}`}>Delete this endpoint and all associated tests.</Tooltip>}
                    >
                        <button
                            id={`delete-endpoint-${endpointName}`}
                            className="btn btn-light mx-1 text-danger"
                            onClick={handleDeleteClick}
                        >
                            <i className="fas fa-trash" aria-hidden="true"></i>
                        </button>
                    </OverlayTrigger>
                </div>
            </Card.Header>
            <Card.Body>
                <Row className="justify-content-start">
                    <Col md={12}>
                        <ListGroup>
                            {getEndpointTests(apiName, endpointName).map((test, index) => (
                                test.testName &&
                                <TestNameListItem
                                    key={index}
                                    id={`test-${endpointName}-${test.testName}`}
                                    test={test}
                                    onTestClick={() => {
                                        handleTestClick(endpointName, test);
                                        handlePopupOpen();
                                    }}
                                    isSelected={
                                        test === selectedTest.test && endpointName === selectedTest.endpoint
                                    }
                                />
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </Card.Body>
            {selectedTest && endpointName === selectedTest.endpoint && (
                <TestCaseDataDetails
                    id={`test-case-details-${endpointName}-${selectedTest.test.testName}`}
                    data={selectedTest.test}
                    show={showPopup}
                    handleClose={handlePopupClose}
                />
            )}

            {/* Update Endpoint Name Modal */}
            <Modal show={showModal} onHide={handleCloseModal} id={`update-endpoint-name-modal-${endpointName}`}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Endpoint Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor={`current-endpoint-name-${endpointName}`} className="form-label">
                                Current Endpoint Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id={`current-endpoint-name-${endpointName}`}
                                value={endpointName}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={`new-endpoint-name-${endpointName}`} className="form-label">
                                New Endpoint Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id={`new-endpoint-name-${endpointName}`}
                                value={newEndpointName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id={`tooltip-close-update-endpoint-name-modal-${endpointName}`}>Close this dialog without saving changes.</Tooltip>}
                    >
                        <Button variant="secondary" onClick={handleCloseModal} id={`close-update-endpoint-name-modal-${endpointName}`}>
                            Close
                        </Button>
                    </OverlayTrigger>

                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id={`tooltip-submit-update-endpoint-name-${endpointName}`}>Save the new endpoint name.</Tooltip>}
                    >
                        <Button variant="primary" onClick={handleSubmit} id={`submit-update-endpoint-name-${endpointName}`}>
                            Update
                        </Button>
                    </OverlayTrigger>
                </Modal.Footer>
            </Modal>

            {/* Add New Test Modal */}
            <Modal show={showAddTestModal} onHide={handleCloseAddTestModal} id={`add-new-test-modal-${endpointName}`}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Test</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor={`new-test-name-${endpointName}`} className="form-label">
                                New Test Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id={`new-test-name-${endpointName}`}
                                value={newTestName}
                                onChange={handleNewTestNameChange}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id={`tooltip-close-add-new-test-modal-${endpointName}`}>Close this dialog without adding a new test.</Tooltip>}
                    >
                        <Button variant="secondary" onClick={handleCloseAddTestModal} id={`close-add-new-test-modal-${endpointName}`}>
                            Close
                        </Button>
                    </OverlayTrigger>

                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id={`tooltip-submit-add-new-test-${endpointName}`}>Save and add the new test to this endpoint.</Tooltip>}
                    >
                        <Button variant="primary" onClick={handleAddTestSubmit} id={`submit-add-new-test-${endpointName}`}>
                            Add Test
                        </Button>
                    </OverlayTrigger>
                </Modal.Footer>
            </Modal>
        </Card>
    );
}

export default EndpointListItem;