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
import { Card, Modal, Button, FormControl, Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EndpointListItem from './EndpointListItem';
import { useContext, useState } from "react";
import ApiDataContext from "../ApiDataContext";

function ApiListItem({ apiName, url }) {
    const { getApiEndpoints, deleteApiName, updateApiName, addEndpoint, updateApiUrl } = useContext(ApiDataContext);
    const [showModal, setShowModal] = useState(false); // Modal visibility for updating API name
    const [newApiName, setNewApiName] = useState(apiName); // State for new API name
    const [showEndpointModal, setShowEndpointModal] = useState(false); // Modal visibility for adding a new endpoint
    const [newEndpointName, setNewEndpointName] = useState(''); // State for new endpoint name
    const [editUrlMode, setEditUrlMode] = useState(false); // Toggle for enabling URL edit mode
    const [newUrl, setNewUrl] = useState(url); // State for new API URL

    // Function to show modal for updating API name
    const handleUpdateClick = () => {
        setShowModal(true);
    };

    // Function to close modal for updating API name
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Function to submit the updated API name
    const handleSubmit = () => {
        if (window.confirm("Are you sure you want to update the API name?")) {
            updateApiName(apiName, newApiName);
            setShowModal(false);
        }
    };

    // Function to handle input change for new API name
    const handleInputChange = (e) => {
        setNewApiName(e.target.value);
    };

    // Function to delete API and all associated endpoints and test cases
    const handleDeleteClick = () => {
        if (window.confirm("Deleting this API will delete all endpoints and test cases below it. Are you sure you want to delete it?")) {
            deleteApiName(apiName);
        }
    };

    // Function to show modal for adding a new endpoint
    const handleAddEndpointClick = () => {
        setShowEndpointModal(true);
    };

    // Function to close modal for adding a new endpoint
    const handleCloseEndpointModal = () => {
        setShowEndpointModal(false);
    };

    // Function to submit the new endpoint name
    const handleEndpointSubmit = () => {
        addEndpoint(apiName, newEndpointName);
        setNewEndpointName('');
        setShowEndpointModal(false);
    };

    // Function to handle input change for new endpoint name
    const handleEndpointInputChange = (e) => {
        setNewEndpointName(e.target.value);
    };

    // Function to enable URL edit mode
    const handleEditUrlClick = () => {
        setEditUrlMode(true);
    };

    // Function to cancel URL update and reset to original URL
    const handleCancelUrlUpdate = () => {
        setEditUrlMode(false);
        setNewUrl(url);  // Reset to the original URL
    };

    // Function to submit the updated URL
    const handleUpdateUrlClick = () => {
        updateApiUrl(apiName, newUrl);
        setEditUrlMode(false);
    };

    // Function to handle input change for new URL
    const handleUrlInputChange = (e) => {
        setNewUrl(e.target.value);
    };

    return (
        <Card className="mb-4" id={`api-card-${apiName}`}>
            <Card.Header as="h2" className="card-header-custom d-flex justify-content-between align-items-center">
                {/* Display the API name with buttons to edit, delete, and add an endpoint */}
                {apiName}
                <div>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id={`tooltip-edit-api-${apiName}`}>Edit the name of the API.</Tooltip>}
                    >
                        <button
                            id={`edit-api-${apiName}`}
                            className="btn btn-light mx-1"
                            onClick={handleUpdateClick} // Show modal to update API name
                        >
                            <i className="fas fa-edit" aria-hidden="true"></i>
                        </button>
                    </OverlayTrigger>

                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id={`tooltip-delete-api-${apiName}`}>Delete the API along with all its associated endpoints and test cases.</Tooltip>}
                    >
                        <button
                            id={`delete-api-${apiName}`}
                            className="btn btn-light mx-1 text-danger"
                            onClick={handleDeleteClick} // Delete the API
                        >
                            <i className="fas fa-trash" aria-hidden="true"></i>
                        </button>
                    </OverlayTrigger>

                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id={`tooltip-add-endpoint-${apiName}`}>Add a new endpoint to this API.</Tooltip>}
                    >
                        <button
                            id={`add-endpoint-${apiName}`}
                            className="btn btn-light mx-1"
                            onClick={handleAddEndpointClick} // Show modal to add a new endpoint
                        >
                            Add Endpoint <i className="fas fa-plus" aria-hidden="true"></i>
                        </button>
                    </OverlayTrigger>
                </div>
            </Card.Header>

            <Card.Body>
                <Row className="mb-3 align-items-center">
                    {/* Display the API URL with an option to edit it */}
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
                            disabled={!editUrlMode} // Disable input if not in edit mode
                        />
                    </Col>
                    {editUrlMode ? (
                        <>
                            <Col sm={1}>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip id={`tooltip-cancel-url-update-${apiName}`}>Cancel the URL update and revert to the original URL.</Tooltip>}
                                >
                                    <Button id={`cancel-url-update-${apiName}`} variant="outline-secondary" onClick={handleCancelUrlUpdate}>
                                        Cancel
                                    </Button>
                                </OverlayTrigger>
                            </Col>
                            <Col sm={1}>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip id={`tooltip-update-url-${apiName}`}>Save the updated API URL.</Tooltip>}
                                >
                                    <Button id={`update-url-${apiName}`} variant="outline-primary" onClick={handleUpdateUrlClick}>
                                        Update
                                    </Button>
                                </OverlayTrigger>
                            </Col>
                        </>
                    ) : (
                        <Col sm={2}>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id={`tooltip-edit-url-${apiName}`}>Edit the current API URL.</Tooltip>}
                            >
                                <Button id={`edit-url-${apiName}`} variant="outline-primary" onClick={handleEditUrlClick}>
                                    Edit URL
                                </Button>
                            </OverlayTrigger>
                        </Col>
                    )}
                </Row>

                {/* List all endpoints associated with this API */}
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
                                onChange={handleInputChange} // Update new API name
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id={`tooltip-close-update-api-name-modal-${apiName}`}>Close this dialog without saving changes.</Tooltip>}
                    >
                        <Button variant="secondary" onClick={handleCloseModal} id={`close-update-api-name-modal-${apiName}`}>
                            Close
                        </Button>
                    </OverlayTrigger>

                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id={`tooltip-submit-update-api-name-${apiName}`}>Save the new API name.</Tooltip>}
                    >
                        <Button variant="primary" onClick={handleSubmit} id={`submit-update-api-name-${apiName}`}>
                            Update
                        </Button>
                    </OverlayTrigger>
                </Modal.Footer>
            </Modal>

            {/* Add New Endpoint Modal */}
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
                                onChange={handleEndpointInputChange} // Update new endpoint name
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id={`tooltip-close-add-new-endpoint-modal-${apiName}`}>Close this dialog without adding a new endpoint.</Tooltip>}
                    >
                        <Button variant="secondary" onClick={handleCloseEndpointModal} id={`close-add-new-endpoint-modal-${apiName}`}>
                            Close
                        </Button>
                    </OverlayTrigger>

                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id={`tooltip-submit-add-new-endpoint-${apiName}`}>Save and add the new endpoint to this API.</Tooltip>}
                    >
                        <Button variant="primary" onClick={handleEndpointSubmit} id={`submit-add-new-endpoint-${apiName}`}>
                            Add
                        </Button>
                    </OverlayTrigger>
                </Modal.Footer>
            </Modal>
        </Card>
    );
}

export default ApiListItem;