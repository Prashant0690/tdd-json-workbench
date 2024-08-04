import {useContext, useState} from 'react';
import './App.css';
import {Button, Col, Container, Form, InputGroup, Row, Modal} from 'react-bootstrap';
import ApiDataContext from './ApiDataContext';
import ApiListItem from './component/ApiListItem';
import AddApiForm from "./component/AddApiForm";
import {importFromJsonFile} from './utils/fileHelpers';
import AppHeader from "./component/AppHeader";
import ReactJsonPretty from 'react-json-pretty';
//import 'react-json-pretty/themes/monikai.css';
import './myCustomTheme.css';
import ConstantCodeGenerator from "./component/ConstantCodeGenerator";

function App() {
    const {apiDataState, getAllApiNames, setApiDataState, exportData} = useContext(ApiDataContext);
    const [theme, setTheme] = useState('light'); // Default theme
    const [exportFileName, setExportFileName] = useState('data');
    const [showPreview, setShowPreview] = useState(false);

    // Function to toggle between dark and light themes
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            setTheme('light');
            document.documentElement.setAttribute('data-theme', 'light');
        }
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
        <div className={theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light'}>
            <AppHeader theme={theme} onToggleTheme={toggleTheme}/>

            <Container>
                <Row className="justify-content-md-center">
                    <Col>
                        <Row>
                            <Col sm={6}>
                                <Form.Group controlId="formFile" className="d-flex">
                                    <Form.Control
                                        id="import-json-file"
                                        type="file"
                                        accept=".json"
                                        onChange={handleImport}
                                        className="me-3"
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        id="export-file-name"
                                        type="text"
                                        value={exportFileName}
                                        onChange={handleExportFileNameChange}
                                        placeholder="Enter filename"
                                    />
                                    <Button
                                        id="export-data-button"
                                        variant={theme === 'light' ? 'outline-secondary' : 'outline-light'}
                                        onClick={() => exportData(exportFileName + '.json')}
                                    >
                                        Export Data
                                    </Button>
                                </InputGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={6}>
                                <Button
                                    id="show-json-preview-button"
                                    variant="primary"
                                    onClick={() => setShowPreview(true)}
                                >
                                    Show JSON Preview
                                </Button>
                                <Modal size="lg" show={showPreview} onHide={() => setShowPreview(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>JSON Preview</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <ReactJsonPretty id="json-pretty" data={apiDataState} />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setShowPreview(false)}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Col>
                            <Col sm={6}>
                                <ConstantCodeGenerator />
                            </Col>
                        </Row>

                        <AddApiForm/>

                        {getAllApiNames().map(([apiName, test], index) => (
                            <ApiListItem key={index} id={`api-${apiName}`} apiName={apiName} url={test.url} />
                        ))}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;