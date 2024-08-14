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
import React, { useState, useContext } from 'react';
import { Button, Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ApiDataContext from '../ApiDataContext';
import { DEFAULT_ENDPOINT } from "../constant/constants";

const AddApiForm = () => {
    const [apiName, setApiName] = useState('');
    const [endpointName, setEndpointName] = useState(DEFAULT_ENDPOINT);
    const [url, setUrl] = useState('');
    const [showForm, setShowForm] = useState(false);
    const { addApiData } = useContext(ApiDataContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = `API Name: ${apiName}\nEndpoint Name: ${endpointName}\n\nPlease update the default values or you can update them later with the value provided.\n\nDo you want to add this data?`;
        if (window.confirm(message)) {
            addApiData(apiName, url, endpointName);
        }
        setApiName('');
        setEndpointName(DEFAULT_ENDPOINT);
        setShowForm(false);
    };

    return (
        <>
            <div className="my-4">
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="tooltip-add-api-button">Click to add a new API.</Tooltip>}
                >
                    <Button id="add-new-api-button" variant="link" onClick={() => setShowForm(true)}>
                        Add New API
                    </Button>
                </OverlayTrigger>
            </div>

            <Modal show={showForm} onHide={() => setShowForm(false)} id="add-api-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Add New API</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='row' onSubmit={handleSubmit} id="add-api-form">
                        <div className='col-12'>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-api-name-input">Enter the name for the new API.</Tooltip>}
                            >
                                <Form.Label htmlFor="api-name-input">API Name:</Form.Label>
                            </OverlayTrigger>
                            <Form.Control
                                type="text"
                                id="api-name-input"
                                placeholder="Enter API name"
                                value={apiName}
                                onChange={(e) => setApiName(e.target.value)}
                                required
                            />
                        </div>
                        <div className='col-12'>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-url-input">Enter the base URL for the API.</Tooltip>}
                            >
                                <Form.Label htmlFor="url-input">URL:</Form.Label>
                            </OverlayTrigger>
                            <Form.Control
                                type="text"
                                id="url-input"
                                placeholder="Enter URL"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                            />
                        </div>
                        <div className='col-12'>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-endpoint-name-input">Enter the name for the API endpoint. The default value is provided.</Tooltip>}
                            >
                                <Form.Label htmlFor="endpoint-name-input">Endpoint Name:</Form.Label>
                            </OverlayTrigger>
                            <Form.Control
                                type="text"
                                id="endpoint-name-input"
                                placeholder="Enter endpoint name"
                                value={endpointName}
                                onChange={(e) => setEndpointName(e.target.value)}
                                required
                            />
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-close-add-api-modal-button">Click to close without adding the API.</Tooltip>}
                    >
                        <Button variant="secondary" onClick={() => setShowForm(false)} id="close-add-api-modal-button">
                            Close
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-submit-add-api-button">Click to add the new API.</Tooltip>}
                    >
                        <Button variant="primary" type="submit" onClick={handleSubmit} id="submit-add-api-button">
                            Add API
                        </Button>
                    </OverlayTrigger>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddApiForm;