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
import React, { useState } from 'react';
import { Button, Form, Col, Row, Container, Card } from 'react-bootstrap';

const COMMON_HEADERS = {
    'Content-Type': ['application/json', 'text/html', 'multipart/form-data', 'application/x-www-form-urlencoded'],
    'Accept': ['application/json', 'text/html', '*/*'],
    'Authorization': ['Bearer <token>', 'Basic <credentials>'],
    'Cache-Control': ['no-cache', 'private', 'public', 'max-age=<seconds>', 'no-store'],
    'User-Agent': ['Mozilla/5.0', 'Chrome/88.0', 'Safari/605.1.15'],
    // Add more headers as needed
};

function CommonHeadersSelect({ headers, setHeaders }) {
    const [selectedHeader, setSelectedHeader] = useState('');
    const [selectedHeaderValue, setSelectedHeaderValue] = useState('');
    const [isCustomValue, setIsCustomValue] = useState(false);

    const handleHeaderChange = (event) => {
        setSelectedHeader(event.target.value);
        setSelectedHeaderValue(''); // Reset the header value when a new header is selected
    };

    const handleHeaderValueChange = (event) => {
        const value = event.target.value;
        if (value === 'custom') {
            setIsCustomValue(true);
        } else {
            setIsCustomValue(false);
            setSelectedHeaderValue(value);
        }
    };

    const handleAdd = () => {
        const updatedHeaders = { ...headers };
        updatedHeaders[selectedHeader] = selectedHeaderValue;
        setHeaders(updatedHeaders);
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Subtitle className="mb-2">Select Common Headers</Card.Subtitle>
                <Container fluid>
                    <Row className="align-items-end">
                        <Col md={5}>
                            <Form.Label>Header</Form.Label>
                            <Form.Control as="select" value={selectedHeader} onChange={handleHeaderChange}>
                                <option value="">Select a header</option>
                                {Object.keys(COMMON_HEADERS).map((header) => (
                                    <option key={header} value={header}>{header}</option>
                                ))}
                            </Form.Control>
                        </Col>
                        <Col md={5}>
                            {selectedHeader && (
                                <>
                                    <Form.Label>Value</Form.Label>
                                    <Form.Control as="select" value={isCustomValue ? 'custom' : selectedHeaderValue} onChange={handleHeaderValueChange}>
                                        <option value="">Select a value</option>
                                        {COMMON_HEADERS[selectedHeader].map((value) => (
                                            <option key={value} value={value}>{value}</option>
                                        ))}
                                        <option value="custom">Custom...</option>
                                    </Form.Control>
                                </>
                            )}
                        </Col>
                        <Col md={1}>
                            <Button onClick={handleAdd}>Add</Button>
                        </Col>
                    </Row>
                    <Row className="align-items-end">
                        <Col md={10}>
                            {isCustomValue && (
                                <>
                                    <Form.Label>Custom Value</Form.Label>
                                    <Form.Control type="text" value={selectedHeaderValue} onChange={(e) => setSelectedHeaderValue(e.target.value)} placeholder="Enter custom value" />
                                </>
                            )}
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
}

export default CommonHeadersSelect;
