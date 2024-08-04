import { Card, Modal, Button, FormControl, Col, Row } from 'react-bootstrap';
import EndpointListItem from './EndpointListItem';
import {useContext, useState} from "react";
import ApiDataContext from "../ApiDataContext";

function ApiListItem({ apiName, url }) {
    const { getApiEndpoints, deleteApiName, updateApiName, addEndpoint, updateApiUrl } = useContext(ApiDataContext);
    const [showModal, setShowModal] = useState(false);
    const [newApiName, setNewApiName] = useState(apiName);
    const [showEndpointModal, setShowEndpointModal] = useState(false);
    const [newEndpointName, setNewEndpointName] = useState('');
    const [editUrlMode, setEditUrlMode] = useState(false);
    const [newUrl, setNewUrl] = useState(url);

    const handleUpdateClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = () => {
        if (window.confirm("Are you sure you want to update the API name?")) {
            updateApiName(apiName, newApiName);
            setShowModal(false);
        }
    };

    const handleInputChange = (e) => {
        setNewApiName(e.target.value);
    };

    const handleDeleteClick = () => {
        if (window.confirm("Deleting this API will delete all endpoints and test cases below it. Are you sure you want to delete it?")) {
            deleteApiName(apiName);
        }
    };

    // New function to handle adding an endpoint
    const handleAddEndpointClick = () => {
        setShowEndpointModal(true);
    };

    const handleCloseEndpointModal = () => {
        setShowEndpointModal(false);
    };

    const handleEndpointSubmit = () => {
        addEndpoint(apiName, newEndpointName);
        setNewEndpointName('');
        setShowEndpointModal(false);
    };

    const handleEndpointInputChange = (e) => {
        setNewEndpointName(e.target.value);
    };

    const handleEditUrlClick = () => {
        setEditUrlMode(true);
    };

    const handleCancelUrlUpdate = () => {
        setEditUrlMode(false);
        setNewUrl(url);  // Reset to the original URL
    };

    const handleUpdateUrlClick = () => {
        updateApiUrl(apiName, newUrl);
        setEditUrlMode(false);
    };

    const handleUrlInputChange = (e) => {
        setNewUrl(e.target.value);
    };

    return (
        <Card className="mb-4" id={`api-card-${apiName}`}>
            <Card.Header as="h2" className="card-header-custom d-flex justify-content-between align-items-center">
                {apiName}
                <div>
                    <button
                        id={`edit-api-${apiName}`}
                        className="btn btn-light mx-1"
                        onClick={handleUpdateClick}
                    >
                        <i className="fas fa-edit" aria-hidden="true"></i>
                    </button>
                    <button
                        id={`delete-api-${apiName}`}
                        className="btn btn-light mx-1 text-danger"
                        onClick={handleDeleteClick}
                    >
                        <i className="fas fa-trash" aria-hidden="true"></i>
                    </button>
                    <button
                        id={`add-endpoint-${apiName}`}
                        className="btn btn-light mx-1"
                        onClick={handleAddEndpointClick}
                    >
                        Add Endpoint <i className="fas fa-plus" aria-hidden="true"></i>
                    </button>
                </div>
            </Card.Header>

            <Card.Body>
                <Row className="mb-3 align-items-center">
                    <Col sm={1}>
                        <label className="my-1 mr-2" htmlFor={`api-url-${apiName}`}>
                            URL
                        </label>
                    </Col>
                    <Col sm={7}>
                        <FormControl
                            type="text"
                            id={`api-url-${apiName}`}
                            value={newUrl}
                            onChange={handleUrlInputChange}
                            disabled={!editUrlMode}
                        />
                    </Col>
                    {editUrlMode ? (
                        <>
                            <Col sm={1}>
                                <Button id={`cancel-url-update-${apiName}`} variant="outline-secondary" onClick={handleCancelUrlUpdate}>
                                    Cancel
                                </Button>
                            </Col>
                            <Col sm={1}>
                                <Button id={`update-url-${apiName}`} variant="outline-primary" onClick={handleUpdateUrlClick}>
                                    Update
                                </Button>
                            </Col>
                        </>
                    ) : (
                        <Col sm={2}>
                            <Button id={`edit-url-${apiName}`} variant="outline-primary" onClick={handleEditUrlClick}>
                                Edit URL
                            </Button>
                        </Col>
                    )}
                </Row>

                {getApiEndpoints(apiName).map((endpointName, index) => (
                    endpointName &&
                    <EndpointListItem
                        key={index}
                        id={`endpoint-${apiName}-${endpointName}`}
                        endpointName={endpointName}
                        apiName={apiName}
                        url={url}
                    />
                ))}
            </Card.Body>

            {/* Update API Name Modal */}
            <Modal show={showModal} onHide={handleCloseModal} id={`update-api-name-modal-${apiName}`}>
                <Modal.Header closeButton>
                    <Modal.Title>Update API Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor={`current-api-name-${apiName}`} className="form-label">
                                Current API Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id={`current-api-name-${apiName}`}
                                value={apiName}
                                readOnly disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={`new-api-name-${apiName}`} className="form-label">
                                New API Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id={`new-api-name-${apiName}`}
                                value={newApiName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal} id={`close-update-api-name-modal-${apiName}`}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} id={`submit-update-api-name-${apiName}`}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* New Endpoint Modal */}
            <Modal show={showEndpointModal} onHide={handleCloseEndpointModal} id={`add-new-endpoint-modal-${apiName}`}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Endpoint</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor={`new-endpoint-name-${apiName}`} className="form-label">
                                New Endpoint Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id={`new-endpoint-name-${apiName}`}
                                value={newEndpointName}
                                onChange={handleEndpointInputChange}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEndpointModal} id={`close-add-new-endpoint-modal-${apiName}`}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEndpointSubmit} id={`submit-add-new-endpoint-${apiName}`}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
}

export default ApiListItem;