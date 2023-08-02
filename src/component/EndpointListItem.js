import { Card, Row, Col, ListGroup, Modal, Button } from 'react-bootstrap';
import TestNameListItem from './TestNameListItem';
import TestCaseDataDetails from './TestCaseDataDetails';
import { useContext, useState } from "react";
import ApiDataContext from "../ApiDataContext";

function EndpointListItem({ endpointName, apiName, url }) {
    const { getEndpointTests, selectedTest, handleTestClick, updateEndpoint, deleteEndpoint, addTest } = useContext(ApiDataContext);
    const [showPopup, setShowPopup] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newEndpointName, setNewEndpointName] = useState(endpointName);
    // State to control show/hide add test modal
    const [showAddTestModal, setShowAddTestModal] = useState(false);
    // State to hold new test data input
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
        <Card className="mb-4">
            <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                {endpointName}
                <div>
                    <button className="btn btn-light mx-1" onClick={handleShowAddTestModal}>
                        Add New Test <i className="fas fa-plus" aria-hidden="true"></i>
                    </button>
                    <button className="btn btn-light mx-1" onClick={handleUpdateClick}>
                        <i className="fas fa-edit" aria-hidden="true"></i>
                    </button>
                    <button className="btn btn-light mx-1 text-danger" onClick={handleDeleteClick}>
                        <i className="fas fa-trash" aria-hidden="true"></i>
                    </button>
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
                    data={selectedTest.test}
                    show={showPopup}
                    handleClose={handlePopupClose}
                />
            )}

            {/* Update Endpoint Name Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                {/* Modal Header */}
                <Modal.Header closeButton>
                    <Modal.Title>Update Endpoint Name</Modal.Title>
                </Modal.Header>
                {/* Modal Body */}
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="currentEndpointName" className="form-label">
                                Current Endpoint Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="currentEndpointName"
                                value={endpointName}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newEndpointName" className="form-label">
                                New Endpoint Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="newEndpointName"
                                value={newEndpointName}
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

            {/* Add New Test Modal */}
            <Modal show={showAddTestModal} onHide={handleCloseAddTestModal}>
                {/* Modal Header */}
                <Modal.Header closeButton>
                    <Modal.Title>Add New Test</Modal.Title>
                </Modal.Header>
                {/* Modal Body */}
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="newTestName" className="form-label">
                                New Test Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="newTestName"
                                value={newTestName}
                                onChange={handleNewTestNameChange}
                            />
                        </div>
                    </form>
                </Modal.Body>
                {/* Modal Footer */}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddTestModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddTestSubmit}>
                        Add Test
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
}

export default EndpointListItem;
