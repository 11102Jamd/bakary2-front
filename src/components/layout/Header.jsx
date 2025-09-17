import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import profileImage from "../../assets/Foto.png";
import '../../App.css';

function Header() {

    const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = async () => {
        try {
            await logout();
            // La redirección ahora se maneja en el método logout del contexto
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            // Mostrar mensaje de error al usuario si es necesario
        }
    };

    return (
        <header className="header">
            <div className="header-content">
                <img src={profileImage} alt="logo" style={{ width: '100px', height: '30px', borderRadius: '0%', marginRight: '50px' }}/>
                <div className="user-info">
                <div className="dropdown">
                        <button 
                            className="btn dropdown-toggle" 
                            type="button" 
                            onClick={toggleDropdown}
                            style={{ background: 'none', border: 'none', color: 'inherit' }}
                        >
                            <span className="mr-2"> {user ? `${user.name}` : 'Invitado'} </span>
                            <i className="bi bi-person-circle"></i>
                        </button>
                        {isDropdownOpen && user && (
                            <div className="dropdown-menu show" style={{ right: 0, left: 'auto' }}>
                                <button className="dropdown-item" onClick={handleLogout}>
                                    <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;