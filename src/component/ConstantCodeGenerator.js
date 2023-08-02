import React, {useContext, useState} from "react";
import { Button, Dropdown, DropdownButton, Modal, InputGroup } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ApiDataContext from "../ApiDataContext";

// Your constants data


// Your functions to generate constants and code
const generateConstants = (data) => {
    const constants = {};

    for (const item of data) {
        if (!item.apiName || !item.endPointName || !item.testName ) {
            continue;
        }


        const constantName = [
            item.apiName.toUpperCase(),
            item.endPointName.toUpperCase(),
            item.testName?.toUpperCase().replace(/ /g, '_'),
            item.request.method.toUpperCase()
        ].join('__');

        const constantValue = [
            item.apiName,
            item.endPointName,
            item.testName,
            item.request.method
        ].join('::');

        constants[constantName] = constantValue;
    }

    return constants;
};

const generateCode = (language, constants) => {
    let code = "";

    switch (language) {
        case 'JavaScript':
            code += "const ApiConstants = {\n";
            for (const [constantName, constantValue] of Object.entries(constants)) {
                code += `  ${constantName}: '${constantValue}',\n`;
            }
            code += "};\n";
            break;

        case 'Java':
            code += "public class ApiConstants {\n";
            for (const [constantName, constantValue] of Object.entries(constants)) {
                code += `  public static final String ${constantName} = "${constantValue}";\n`;
            }
            code += "}\n";
            break;

        // ... implement other languages ...
    }

    return code;
};


// Your React component
const ConstantCodeGenerator = () => {
    const {apiDataState} = useContext(ApiDataContext);
    const [language, setLanguage] = useState('Java');
    const [code, setCode] = useState('');
    const [showModal, setShowModal] = useState(false);

    const constants = generateConstants(apiDataState);

    const handleSelect = (selectedLanguage) => {
        setLanguage(selectedLanguage);
    };

    const handleClick = () => {
        const generatedCode = generateCode(language, constants);
        setCode(generatedCode);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    return (
        <div>
            <InputGroup className="mb-3">
                <DropdownButton
                    as={InputGroup.Prepend}
                    variant="outline-secondary"
                    title={language}
                    id="input-group-dropdown-1"
                    onSelect={handleSelect}
                >
                    <Dropdown.Item eventKey="Java">Java</Dropdown.Item>
                    <Dropdown.Item eventKey="JavaScript">JavaScript</Dropdown.Item>
                </DropdownButton>
                <Button variant="primary" onClick={handleClick}>Generate Code</Button>
            </InputGroup>

            <Modal size="lg" show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Generated Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <pre>{code}</pre>
                </Modal.Body>
                <Modal.Footer>
                    <CopyToClipboard text={code}>
                        <Button variant="secondary">Copy to clipboard</Button>
                    </CopyToClipboard>
                    <Button variant="primary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ConstantCodeGenerator;
