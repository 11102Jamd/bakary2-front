import React from "react";
import { createContext, useContext, useState, useEffect } from 'react';
import { getUser, login as apiLogin, logout as apiLogout } from '../../api/auth';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Proveedor del contexto que envuelve la aplicación y maneja la autenticación
export const AuthProvider = ({ children }) => {
  // Estado para almacenar la información del usuario autenticado
  const [user, setUser] = useState(null);
  
    // Estado para manejar el indicador de carga (loading)
  const [loading, setLoading] = useState(true);

    // useEffect para cargar datos del usuario si hay un token guardado
  useEffect(() => {
    const loadUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
            // Obtiene datos del usuario autenticado desde la API
            const userData = await getUser();
            setUser(userData);
            }
        } catch (error) {
            console.error('Error loading user:', error);
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    };

    loadUser();
  }, []);

  // Función para iniciar sesión
  const login = async (email, password) => {
        try {
            const userData = await apiLogin(email, password);
            setUser(userData);
            return userData;
        } catch (error) {
            setUser(null);
            throw error;
        } 
  };

    // Función para cerrar sesión
  const logout = async () => {
    try {
        await apiLogout();
        setUser(null);
        localStorage.removeItem('token');
        // Forzar recarga para limpiar completamente el estado
        window.location.href = '/login';
    } catch (error) {
        console.error('Logout error:', error);
        // Forzar limpieza incluso si hay error
        setUser(null);
        localStorage.removeItem('token');
        throw error;
    }
  };

  // Verifica si el usuario tiene un rol específico
    const hasRole = (role) => user?.rol === role;
    // Verifica si el usuario tiene alguno de los roles dados
    const hasAnyRole = (roles) => roles.includes(user?.rol);

    return (
        <AuthContext.Provider value={{ 
        user, 
        loading, 
        login, 
        logout,
        hasRole,
        hasAnyRole
        }}>
        {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);