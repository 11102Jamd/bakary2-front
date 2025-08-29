import React from "react";
import '../../App.css';

function MainContent({ children }) {
    return (
        <main className="main-content">
            <div className="container-fluid">
                {children}
            </div>
        </main>
    );
}

export default MainContent;