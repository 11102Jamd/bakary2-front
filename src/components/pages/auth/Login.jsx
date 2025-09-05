import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import '../../../index.css';
// import { errorLogin } from '../../utils/alerts/alertsUsers';


/**
 * Componente de formulario de inicio de sesión.
 *
 * Permite al usuario autenticarse ingresando su correo electrónico
 * y contraseña.
 *
 * @component
 * @returns {JSX.Element} Interfaz de inicio de sesión.
 */
const Login = () => {
  // Estado para almacenar el email ingresado por el usuario
    const [email, setEmail] = useState('');

    // Estado para almacenar la contraseña
    const [password, setPassword] = useState('');

    // Estado para manejar errores en el Login
    const [error, setError] = useState('');

    // Estado para controlar el estado de carga
    const [loading, setLoading] = useState(false);

    // Hook para manejar navegacion progmatica
    const navigate = useNavigate();

    // Funciones y datos del contyexto de autenticacion
    const { login, user } = useAuth();

    /**
     * Maneja el envío del formulario de inicio de sesión.
     *
     * @param {React.FormEvent} e Evento del formulario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        setError('');
        setLoading(true);
    
        try {

        // Intentar autenticación con las credenciales proporcionadas
            const userData = await login(email, password);

            if (!userData) {
                throw new Error("Autenticacion fallida")
            }

            // alerta de bienvenida si el usuario se registro
            await Swal.fire({
                title: 'Bienvendido',
                text: `Usuario: ${userData.name1 || userData.email}`,
                icon: 'success',
            });
            navigate('/welcome');
        } catch (err) {
            setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
            console.error('Login error details:', err);
            await errorLogin();
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="login-container">
        <div className='login'>
            <div className='login-form'>
                <h2>Iniciar Sesión</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                
                    <label>Email:</label>
                    <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    />
                    
                    <label>Contraseña:</label>
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    />
                
                <button type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'Ingresar'}
                </button>
                <br />
                <Link to="/reset-password">¿Quieres Cambiar Contraseña?</Link>
                </form>
            </div>
            <div className='login-image-panel'>
                <div className='circle'></div>
                <p>S.G.R</p>
            </div>
        </div>
    </div>
    );
};



export default Login;