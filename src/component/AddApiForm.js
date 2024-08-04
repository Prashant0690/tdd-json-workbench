import React, { useState, useContext } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
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
                <Button id="add-new-api-button" variant="link" onClick={() => setShowForm(true)}>
                    Add New API
                </Button>
            </div>

            <Modal show={showForm} onHide={() => setShowForm(false)} id="add-api-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Add New API</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='row' onSubmit={handleSubmit} id="add-api-form">
                        <div className='col-12'>
                            <Form.Label htmlFor="api-name-input">API Name:</Form.Label>
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
                            <Form.Label htmlFor="url-input">URL:</Form.Label>
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
                            <Form.Label htmlFor="endpoint-name-input">Endpoint Name:</Form.Label>
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
                    <Button variant="secondary" onClick={() => setShowForm(false)} id="close-add-api-modal-button">
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSubmit} id="submit-add-api-button">
                        Add API
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddApiForm;