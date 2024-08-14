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
import React from "react";
import "./AppHeader.css";

function AppHeader({ theme, onToggleTheme }) {
    return (
        <header className="app-header" id="app-header">
            <div className="logo" id="app-logo">
                <span className="logo-letter logo-letter-1" id="logo-letter-1">A</span>
                <span className="logo-letter logo-letter-2" id="logo-letter-2">P</span>
                <span className="logo-letter logo-letter-3" id="logo-letter-3">I</span>
                <span className="logo-letter logo-letter-4" id="logo-letter-4">s</span>
            </div>
            <button
                id="theme-toggle-btn"
                onClick={onToggleTheme}
                className="theme-toggle-btn"
            >
                {theme === 'light' ? <i className="fas fa-moon" id="theme-icon-moon"></i> : <i className="fas fa-sun" id="theme-icon-sun"></i>}
            </button>
        </header>
    );
}

export default AppHeader;