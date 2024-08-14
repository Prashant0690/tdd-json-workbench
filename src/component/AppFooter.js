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
import React from 'react';

import "./AppFooter.css";

function AppFooter() {
    return (
        <footer className="app-footer">
            <div className="container p-4">
                <div className="row">
                    <div className="col-lg-12 col-md-12 mb-4 mb-md-0">
                        <p className="text-uppercase">&copy; 2024 TDD-JSON-Workbench.</p>
                        <p>
                            Built with <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a>.
                            View the source code on <a href="https://github.com/prashant0690/tdd-json-workbench" target="_blank" rel="noopener noreferrer">GitHub</a>.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default AppFooter;