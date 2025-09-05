import React from "react";

export const LoadingSpinner = ({ message = "Cargando..." }) => {
    return (
        <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
            {message && <p className="mt-3">{message}</p>}
        </div>
    );
}

function LoadingModal({ message = "Cargando..." }) {
    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-body text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                        <p className="mt-3">{message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadingModal;
