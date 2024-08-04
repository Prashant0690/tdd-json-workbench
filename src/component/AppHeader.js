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