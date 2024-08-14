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
// You can put this function in a helper file.
export const importFromJsonFile = async (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            try {
                const jsonData = JSON.parse(event.target.result);
                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
        fileReader.readAsText(file);
    });
};
