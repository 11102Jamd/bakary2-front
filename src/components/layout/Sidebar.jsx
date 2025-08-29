import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../../App.css';
import React, { useState } from "react";


function Sidebar() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // si no existe un usuario autenticad no rederizar el sidebar
    if (!user) return null;

    return (
        <div className={`sidebar ${isOpen ? '' : 'collapsed'}`}>
            <button className="toggle-btn" onClick={toggleSidebar}>
                {isOpen ? <i className="bi bi-x-lg"></i> : <i className="bi bi-list"></i>}
            </button>

            <Link className="sidebar-brand" to="/">
                {/* <div className="sidebar-brand-icon">
                    <i className="bi bi-shop"></i>
                </div>
                 {isOpen && <div className="sidebar-brand-text">Pan de Yuca</div>} */}
            </Link>

            <div className="sidebar-menu">
                <Link to="/welcome" className="sidebar-link">
                    <i className="bi bi-house-door"></i>
                    {isOpen && <span>Inicio</span>}
                </Link>

                {/* Solo visible para Administrador */}
                {user.rol === 'Administrador' && (
                    <Link to="/usuarios" className="sidebar-link">
                        <i className="bi bi-people-fill"></i>
                        {isOpen && <span>Usuarios</span>}
                    </Link>
                )}

                {(user.rol === 'Administrador' || user.rol === 'Cajero' || user.rol === 'Panadero') && (
                    <Link to="/productos" className="sidebar-link">
                        <i className="bi bi-box-seam"></i>
                        {isOpen && <span>Productos</span>}
                    </Link>
                )}

                {/* Visible para todos los roles */}
                {(user.rol === 'Administrador' || user.rol === 'Panadero' || user.rol === 'Cajero') && (
                    <Link to="/insumos" className="sidebar-link">
                        <i className="bi bi-clipboard-data"></i>
                        {isOpen && <span>Insumos</span>}
                    </Link>
                )}

                {/* Solo visible para Administrador y Cajero */}
                {(user.rol === 'Administrador' || user.rol === 'Cajero') && (
                    <Link to="/compras" className="sidebar-link">
                        <i className="bi bi-cart-check"></i>
                        {isOpen && <span>Compras</span>}
                    </Link>
                )}

                {/* Solo visible para Administrador y Cajero */}
                {(user.rol === 'Administrador' || user.rol === 'Cajero') && (
                    <Link to="/ventas" className="sidebar-link">
                        <i className="bi bi-receipt"></i>
                        {isOpen && <span>Ventas</span>}
                    </Link>
                )}

                {/**Solo visible para Administrador y Panadero */}
                {(user.rol === 'Administrador' || user.rol === 'Panadero') && (
                    <Link to="/recetas" className="sidebar-link">
                        <i className="bi bi-egg-fried"></i>
                        {isOpen && <span>Recetas</span>}
                    </Link>
                )}

                {/* Visible para Administrador y Panadero */}
                {(user.rol === 'Administrador' || user.rol === 'Panadero') && (
                    <Link to="/producciones" className="sidebar-link">
                        <i className="bi bi-gear"></i>
                        {isOpen && <span>Produccion</span>}
                    </Link>
                )}


                {(user.rol === 'Administrador') && (
                    <Link to="/reportes" className="sidebar-link">
                        <i className="bi bi-archive"></i>
                        {isOpen && <span>Reportes</span>}
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Sidebar;