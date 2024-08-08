import React from 'react';

function AppFooter() {
    return (
        <footer className="bg-light text-center text-lg-start border-top mt-auto py-3">
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