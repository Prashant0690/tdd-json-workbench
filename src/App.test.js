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
