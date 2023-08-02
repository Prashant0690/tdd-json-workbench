import {createContext, useEffect, useState} from 'react';
import {HTTP_METHODS} from "./constant/constants";
// import { data2 } from './data/apiDataFormat2';

const ApiDataContext = createContext({});

export const ApiDataProvider = ({ children }) => {
    //const [apiDataState, setApiDataState] = useState(data2);
    const [apiDataState, setApiDataState] = useState(() => {
        // When initializing the state, check if there's existing data in session storage
        const savedData = sessionStorage.getItem('apiData');
        return savedData ? JSON.parse(savedData) : [];
    });

    const [selectedTest, setSelectedTest] = useState({ endpoint: null, test: null });

    // Whenever apiDataState changes, save the new state to session storage
    useEffect(() => {
        sessionStorage.setItem('apiData', JSON.stringify(apiDataState));
    }, [apiDataState]);


    const handleTestClick = (endpoint, testData) => {
        setSelectedTest({ endpoint, test: testData });
    };

    // Get all unique API names
    const getAllApiNames = () => {
        const apiNames = new Map(apiDataState.map(test => [test.apiName, test]));
        return [...apiNames];
    };

    // Get all endpoint names for a given API name
    // Get all endpoint names for a given API name
    const getApiEndpoints = apiName => {
        const endpointNames = new Set(
            apiDataState
                .filter(test => test.apiName === apiName)
                .map(test => test.endPointName)
        );
        return Array.from(endpointNames);
    };


    // Get all tests for a given endpoint name
    const getEndpointTests = (apiName, endPointName) => {
        return apiDataState.filter(test => {
            return test.apiName === apiName && test.endPointName === endPointName
        });
    };

    //CRUD
    const addApiData = (apiName, url, endPointName) => {
        const newEndPoint = {
            apiName,
            url,  // Add url
            endPointName,
            testName: null,
            request: {},
            response: {}
        };
        setApiDataState((prevState) => [...prevState, newEndPoint]);
    };


    const updateApiName = (oldApiName, newApiName) => {
        const newData = apiDataState.map(item => {
            if (item.apiName === oldApiName) {
                return { ...item, apiName: newApiName };
            } else {
                return item;
            }
        });
        setApiDataState(newData);
    };

    const updateApiUrl = (apiName, newUrl) => {
        const newData = apiDataState.map(item => {
            if (item.apiName === apiName) {
                return { ...item, url: newUrl }; // Update url
            } else {
                return item;
            }
        });
        setApiDataState(newData);
    };


    const deleteApiName = (apiName) => {
        const newData = apiDataState.filter(item => item.apiName !== apiName);
        setApiDataState(newData);
    };

    const updateEndpoint = (apiName, currentEndpointName, newEndpointName) => {
        const newData = apiDataState.map(item => {
            if (item.apiName === apiName && item.endPointName === currentEndpointName) {
                return { ...item, endPointName: newEndpointName };
            } else {
                return item;
            }
        });
        setApiDataState(newData);
    };

    const deleteEndpoint = (apiName, endPointName) => {
        const newData = apiDataState.filter(item => {
            return !(item.apiName === apiName && item.endPointName === endPointName);
        });
        setApiDataState(newData);
    };

    const addEndpoint = (apiName, endPointName) => {
        const newEndPoint = {
            apiName,
            endPointName,
            testName: null,
            request: {},
            response: {}
        };
        setApiDataState([...apiDataState, newEndPoint]);
    };


    const updateTestName = (apiName, endPointName, currentTestName, newTestName) => {
        const newData = apiDataState.map(item => {
            if (item.apiName === apiName && item.endPointName === endPointName && item.testName === currentTestName) {
                return { ...item, testName: newTestName };
            } else {
                return item;
            }
        });
        setApiDataState(newData);
    };

    const deleteTest = (apiName, endPointName, testName) => {
        const newData = apiDataState.filter(
            item => !(item.apiName === apiName && item.endPointName === endPointName && item.testName === testName)
        );
        setApiDataState(newData);
    };

    const cloneTest = (apiName, endPointName, testName) => {
        // Find the test to be cloned
        const testToClone = apiDataState.find(test =>
            test.apiName === apiName &&
            test.endPointName === endPointName &&
            test.testName === testName
        );

        // Clone the test and modify the name
        if (testToClone) {
            const clonedTest = {...testToClone, testName: testName + "-Copy"};

            // Add the cloned test to the state
            setApiDataState(prevState => [...prevState, clonedTest]);
        }
    };



    const addTest = (apiName, endPointName, newTestName, url) => {
        const api = apiDataState.find(test => test.apiName === apiName);
        if (api.url !== url) {
            throw new Error(`Test URL does not match URL for API ${apiName}`);
        }

        const newTestData = {
            apiName,
            endPointName,
            testName: newTestName,
            url,
            request: { // default values, adjust as necessary
                path: '',
                method: HTTP_METHODS.GET,
                headers: {},
                queryParams:{},
                pathParams:{}
            },
            response: { // default values, adjust as necessary
                status: 200,
                headers: {},
                body: "{}"
            }
        };

        setApiDataState((prevState) => {
            const updatedState = prevState.map(test => {
                if (test.apiName === apiName && test.endPointName === endPointName && (!test.testName || test.testName.trim() === '')) {
                    return newTestData; // replace empty test with new test data
                } else {
                    return test; // keep existing test as is
                }
            });

            // If no empty test was found to replace, add as new test
            if (!updatedState.some(test => test.testName === newTestName)) {
                updatedState.push(newTestData);
            }

            return updatedState;
        });
    };

    const updateTest = (apiName, endPointName, testName, url, request, response) => {
        const newTestData = {
            apiName,
            endPointName,
            testName,
            url,
            request,
            response
        };

        const newData = apiDataState.map(item => {
            if (item.apiName === apiName && item.endPointName === endPointName && item.testName === testName) {
                return newTestData;
            } else {
                return item;
            }
        });
        setApiDataState(newData);
    };


    const exportData = (fileName) => {
        const dataStr = JSON.stringify(apiDataState, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', fileName);
        linkElement.click();
    };



    return (
        <ApiDataContext.Provider
            value={{
                apiDataState,
                setApiDataState,
                selectedTest,
                setSelectedTest,
                handleTestClick,
                getAllApiNames,
                getApiEndpoints,
                getEndpointTests,
                addApiData,
                updateApiName,
                updateApiUrl,
                deleteApiName,
                addEndpoint,
                updateEndpoint,
                deleteEndpoint,
                updateTestName,
                deleteTest,
                cloneTest,
                addTest,
                updateTest,
                exportData
            }}
        >
            {children}
        </ApiDataContext.Provider>
    );
};

export default ApiDataContext;
