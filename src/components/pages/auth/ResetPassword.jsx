import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../../api/resetPassword';
import { errorResetPassword, successResetPassword } from '../../../utils/alerts/resetPasswordAlerts';
import '../../../index.css';

/**
 * Componente para restablecer contraseña
 * @returns {JSX.Element} Interfaz de restablecimiento de contraseña
 */
function ResetPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    /**
     * Maneja el envío del formulario de restablecimiento
     * @param {React.FormEvent} e - Evento del formulario
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validaciones del frontend
        if (newPassword !== passwordConfirmation) {
            setError('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }

        if (newPassword.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres');
            setLoading(false);
            return;
        }

        try {
            await resetPassword(email, newPassword);
            await successResetPassword();            
            navigate('/login');
            
        } catch (err) {
            const errorMessage = err.response?.data?.message || 
                err.response?.data?.error || 
                'Error al restablecer la contraseña';
            
            setError(errorMessage);
            await errorResetPassword(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-card">
                <h2>Restablecer Contraseña</h2>
                
                <form onSubmit={handleSubmit} className="reset-password-form">
                    {error && <div className="error-message">{error}</div>}
                    
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                            placeholder="Ingresa tu correo electrónico"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="newPassword">Nueva Contraseña:</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            disabled={loading}
                            placeholder="Mínimo 8 caracteres"
                            minLength="8"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="passwordConfirmation">Confirmar Contraseña:</label>
                        <input
                            type="password"
                            id="passwordConfirmation"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                            disabled={loading}
                            placeholder="Repite tu nueva contraseña"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="submit-button"
                    >
                        {loading ? 'Procesando...' : 'Restablecer Contraseña'}
                    </button>

                    <button 
                        type="button" 
                        onClick={() => navigate('/login')}
                        className="back-button"
                    >
                        Volver al Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;