import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';

function JsonTextAreaFormatter({ value, onChangeValue, idPrefix }) {
    const [internalValue, setInternalValue] = useState(JSON.stringify(value, null, 2));
    const target = useRef(null);

    // when value prop changes, update the internalValue
    useEffect(() => {
        setInternalValue(JSON.stringify(value, null, 2));
    }, [value]);

    const handleInputChange = (event) => {
        setInternalValue(event.target.value);
    };

    const handleFormatClick = () => {
        try {
            // Parse the JSON to verify if it's valid
            let parsedJson = JSON.parse(internalValue);

            // If parsing is successful, then format the string
            let formattedJson = JSON.stringify(parsedJson, null, 2);

            setInternalValue(formattedJson);
            onChangeValue(parsedJson); // provide parsed object to parent
        } catch (e) {
            window.alert("Invalid JSON: cannot format");
        }
    };

    return (
        <div>
            <Form.Control
                id={`${idPrefix}-json-textarea`}
                as="textarea"
                rows={9}
                value={internalValue}
                onChange={handleInputChange}
            />

            <Button
                id={`${idPrefix}-format-validate-button`}
                variant="secondary"
                onClick={handleFormatClick}
                className="mt-2"
                ref={target}
            >
                Format / Validate
            </Button>

            <div className="alert alert-info d-flex align-items-center" role="alert">
                <i className="fas fa-info-circle me-2"></i>
                Please remember: After making changes to the JSON, click on 'Format / Validate'. This will check your updates for any errors before saving the changes.
            </div>
        </div>
    );
}

export default JsonTextAreaFormatter;