import React, { useState, useContext } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import ApiDataContext from '../ApiDataContext';
import {DEFAULT_ENDPOINT} from "../constant/constants";

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
            addApiData( apiName, url, endpointName );
        }
        setApiName('');
        setEndpointName(DEFAULT_ENDPOINT);
        setShowForm(false);
    };

    return (
        <>
            <div className="my-4">
                <Button variant="link" onClick={() => setShowForm(true)}>
                    Add New API
                </Button>
            </div>

            <Modal show={showForm} onHide={() => setShowForm(false)} >
                <Modal.Header closeButton>
                    <Modal.Title>Add New API</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='row' onSubmit={handleSubmit}>
                        <div className='col-12'>
                            <Form.Label>API Name:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter API name"
                                value={apiName}
                                onChange={(e) => setApiName(e.target.value)}
                                required
                            />
                        </div>
                        <div className='col-12'>
                            <Form.Label>URL:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter endpoint name"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                            />
                        </div>
                        <div className='col-12'>
                            <Form.Label>Endpoint Name:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter endpoint name"
                                value={endpointName}
                                onChange={(e) => setEndpointName(e.target.value)}
                                required
                            />
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowForm(false)}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Add API
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddApiForm;
