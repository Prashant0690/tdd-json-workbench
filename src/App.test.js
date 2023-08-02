import { render, screen } from '@testing-library/react';
import TestNameListItem from './component/TestNameListItem';
import ApiDataContext from './ApiDataContext';


const mockContext = {
  handleTestClick: jest.fn(),
  selectedTest: { endpoint: null, test: null },
  // Fill in other necessary context methods or values here
};

test('renders test name list item', () => {
  const test = {
    "apiName": "jsonplaceholder",
    "endPointName": "methods",
    "testName": "Getting a resource",
    "url": "https://jsonplaceholder.typicode.com",
    "request": {
      "path": "/posts/1",
      "method": "GET",
      "headers": {},
      "queryParams": {},
      "pathParams": {},
      "body": "{}"
    },
    "response": {
      "status": 200,
      "headers": {},
      "body": "{\"userId\":1,\"id\":1,\"title\":\"sunt aut facere repellat provident occaecati excepturi optio reprehenderit\",\"body\":\"quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto\"}"
    }
  };

  render(
      <ApiDataContext.Provider value={mockContext}>
        <TestNameListItem test={test} />
      </ApiDataContext.Provider>
  );

  const listItemElement = screen.getByText(/Getting a resource/i);
  expect(listItemElement).toBeInTheDocument();
});
