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
import { useContext, useState, useEffect } from 'react';
import './App.css';
import { Button, Col, Container, Form, InputGroup, Row, Modal, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import ApiDataContext from './ApiDataContext';
import ApiListItem from './component/ApiListItem';
import AddApiForm from "./component/AddApiForm";
import { importFromJsonFile } from './utils/fileHelpers';
import AppHeader from "./component/AppHeader";
import AppFooter from "./component/AppFooter";
import ReactJsonPretty from 'react-json-pretty';
import ConstantCodeGenerator from "./component/ConstantCodeGenerator";

function App() {
    const { apiDataState, getAllApiNames, setApiDataState, exportData } = useContext(ApiDataContext);
    const [theme, setTheme] = useState('light'); // Default theme is light
    const [exportFileName, setExportFileName] = useState('data');
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        // Apply the current theme class to the body
        document.body.className = theme === 'light' ? 'light-theme' : 'dark-theme';
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const handleImport = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const importedData = await importFromJsonFile(file);
                console.log(importedData);
                setApiDataState(importedData);
            } catch (error) {
                console.error("Error reading file:", error);
            }
        }
    };

    const handleExportFileNameChange = (event) => {
        setExportFileName(event.target.value);
    };

    return (
        <div>
            {/* App Header with theme toggle */}
            <AppHeader theme={theme} onToggleTheme={toggleTheme} />

            <Container>
                <Row className="justify-content-md-center">
                    <Col>
                        {/* No Validation Warning Alert */}
                        <Alert variant="warning" className="py-2 px-3 small">
                            <strong>Warning:</strong> The app does not include built-in validation, so users need to handle this aspect with care. It’s important to ensure that the JSON structure is accurate and well-formed before using it in testing or automation.
                        </Alert>

                        <Row>
                            <Col sm={6}>
                                {/* Import JSON File Button */}
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip id="tooltip-import">Import a previously exported JSON file.</Tooltip>}
                                >
                                    <Form.Group controlId="formFile" className="d-flex">
                                        <Form.Control
                                            id="import-json-file"
                                            type="file"
                                            accept=".json"
                                            onChange={handleImport}
                                            className="me-3"
                                        />
                                    </Form.Group>
                                </OverlayTrigger>
                            </Col>
                            <Col sm={6}>
                                {/* Export Data Button with filename input */}
                                <InputGroup className="mb-3">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="tooltip-export">Enter the filename for exporting the JSON data.</Tooltip>}
                                    >
                                        <Form.Control
                                            id="export-file-name"
                                            type="text"
                                            value={exportFileName}
                                            onChange={handleExportFileNameChange}
                                            placeholder="Enter filename"
                                        />
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="tooltip-export-button">Export the current API data as a JSON file.</Tooltip>}
                                    >
                                        <Button
                                            id="export-data-button"
                                            onClick={() => exportData(exportFileName + '.json')}
                                        >
                                            Export Data
                                        </Button>
                                    </OverlayTrigger>
                                </InputGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={6}>
                                {/* Show JSON Preview Button */}
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip id="tooltip-preview">Show a preview of the current JSON data.</Tooltip>}
                                >
                                    <Button
                                        id="show-json-preview-button"
                                        variant="primary"
                                        onClick={() => setShowPreview(true)}
                                    >
                                        Show JSON Preview
                                    </Button>
                                </OverlayTrigger>
                                {/* Modal for JSON Preview */}
                                <Modal size="lg" show={showPreview} onHide={() => setShowPreview(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>JSON Preview</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <ReactJsonPretty id="json-pretty" data={apiDataState} />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip id="tooltip-close-preview">Close the JSON preview.</Tooltip>}
                                        >
                                            <Button
                                                id="close-json-preview-button"
                                                variant="secondary"
                                                onClick={() => setShowPreview(false)}>
                                                Close
                                            </Button>
                                        </OverlayTrigger>
                                    </Modal.Footer>
                                </Modal>
                            </Col>
                            <Col sm={6}>
                                {/* Constant Code Generator (further code generation details within component) */}
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip id="tooltip-code-generator">Generate code constants from the API data.</Tooltip>}
                                >
                                    <ConstantCodeGenerator />
                                </OverlayTrigger>
                            </Col>
                        </Row>

                        {/* Form for adding a new API */}
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="tooltip-add-api">Add a new API by specifying its name and URL.</Tooltip>}
                        >
                            <AddApiForm />
                        </OverlayTrigger>

                        {/* List of APIs (Each API will have edit/delete/add endpoint options) */}
                        {getAllApiNames().map(([apiName, test], index) => (
                            <OverlayTrigger
                                key={index}
                                placement="top"
                                overlay={<Tooltip id={`tooltip-api-${apiName}`}>Manage the API: {apiName}</Tooltip>}
                            >
                                <ApiListItem id={`api-${apiName}`} apiName={apiName} url={test.url} />
                            </OverlayTrigger>
                        ))}
                    </Col>
                </Row>
            </Container>

            {/* App Footer */}
            <AppFooter />
        </div>
    );
}

export default App;