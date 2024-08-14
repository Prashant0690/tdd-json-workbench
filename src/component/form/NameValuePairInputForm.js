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
import React, { useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const NameValuePairInputForm = ({ headers, setHeaders, idPrefix }) => {
    const keyRef = useRef(null);
    const valueRef = useRef(null);
    const addKeyRef = useRef(null);
    const addValueRef = useRef(null);
    const [editingIndex, setEditingIndex] = useState(null);

    const handleHeaderChange = (key, value) => {
        const updatedHeaders = { ...headers };
        updatedHeaders[key] = value;
        setHeaders(updatedHeaders);
    };

    const handleHeaderRemove = (key) => {
        const updatedHeaders = { ...headers };
        delete updatedHeaders[key];
        setHeaders(updatedHeaders);
    };

    const handleEditHeader = (index) => {
        setEditingIndex(index);
    };

    const handleUpdateHeader = (oldKey) => {
        if (keyRef.current && valueRef.current) {
            const newKey = keyRef.current.value;
            const newValue = valueRef.current.value;

            if (newKey !== '' && newValue !== '') {
                const updatedHeaders = { ...headers };
                if (oldKey !== newKey) {
                    delete updatedHeaders[oldKey];
                }
                updatedHeaders[newKey] = newValue;
                setHeaders(updatedHeaders);
                setEditingIndex(null);
            }
        }
    };

    const handleAddHeader = () => {
        if (addKeyRef.current && addValueRef.current) {
            const key = addKeyRef.current.value;
            const value = addValueRef.current.value;
            if (key !== '') {
                handleHeaderChange(key, value);
                addKeyRef.current.value = '';
                addValueRef.current.value = '';
            }
        }
    };

    return (
        <>
            {Object.entries(headers).map(([key, value], index) => (
                <Row key={`${key}-${index}`} className="mb-2">
                    <Col>
                        <Form.Control
                            id={`${idPrefix}-key-${key}`}
                            placeholder="Key"
                            defaultValue={key}
                            readOnly={editingIndex !== index}
                            ref={editingIndex === index ? keyRef : null}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            id={`${idPrefix}-value-${value}`}
                            placeholder="Value"
                            defaultValue={value}
                            readOnly={editingIndex !== index}
                            ref={editingIndex === index ? valueRef : null}
                        />
                    </Col>
                    <Col xs="auto">
                        {editingIndex === index ? (
                            <>
                                <Button
                                    variant="success"
                                    id={`${idPrefix}-update-button-${key}`}
                                    onClick={() => handleUpdateHeader(key)}
                                    className="me-2"
                                >
                                    <i className="fas fa-check"></i> Update
                                </Button>
                                <Button
                                    variant="secondary"
                                    id={`${idPrefix}-cancel-button-${key}`}
                                    onClick={() => setEditingIndex(null)}
                                >
                                    <i className="fas fa-times"></i> Cancel
                                </Button>
                            </>
                        ) : (
                            <>
                                {editingIndex === null && (
                                    <>
                                        <Button
                                            variant="warning"
                                            id={`${idPrefix}-edit-button-${key}`}
                                            onClick={() => handleEditHeader(index)}
                                            className="me-2"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                        <Button
                                            variant="danger"
                                            id={`${idPrefix}-remove-button-${key}`}
                                            onClick={() => handleHeaderRemove(key)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </>
                                )}
                            </>
                        )}
                    </Col>
                </Row>
            ))}
            <Row className="mb-2">
                <Col>
                    <Form.Control id={`${idPrefix}-add-key`} ref={addKeyRef} placeholder="Key" />
                </Col>
                <Col>
                    <Form.Control id={`${idPrefix}-add-value`} ref={addValueRef} placeholder="Value" />
                </Col>
                <Col xs="auto">
                    {editingIndex === null && (
                        <Button id={`${idPrefix}-add-button`} onClick={handleAddHeader}>
                            <i className="fas fa-plus"></i> Add Value
                        </Button>
                    )}
                </Col>
            </Row>
        </>
    );
};

export default NameValuePairInputForm;