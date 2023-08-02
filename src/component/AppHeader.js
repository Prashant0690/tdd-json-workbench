import React from "react";
import "./AppHeader.css";

function AppHeader({ theme, onToggleTheme }) {
    return (
        <header className="app-header">
            <div className="logo">
                <span className="logo-letter logo-letter-1">A</span>
                <span className="logo-letter logo-letter-2">P</span>
                <span className="logo-letter logo-letter-3">I</span>
                <span className="logo-letter logo-letter-4">s</span>
            </div>
            <button
                onClick={onToggleTheme}
                className="theme-toggle-btn"
            >
                {theme === 'light' ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
            </button>
        </header>
    );
}

export default AppHeader;
