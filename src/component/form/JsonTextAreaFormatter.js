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