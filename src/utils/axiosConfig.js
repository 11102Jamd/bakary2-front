import axios from 'axios';

/**
 * Instacia preconfigurada de axios para realizar solicitudes HTTP
 */
const api = axios.create({
    baseURL: 'http://localhost:8000/api', // URL base de la API
    headers: {
        'Content-Type': 'application/json', // Tipo de Contenido JSON
        'Accept': 'application/json',   // Aceptar espuesta JSON
        'X-Requested-With': 'XMLHttpRequest' // Indicador de solicitud
    }
});

/**
 * Interceptor de la Solicitud: 
 * Antes de cada peticion, agrega automaticamente el token de autenticacion en el
 * localstorage
 */
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

/**
 * Interceptor de respuesta:
 * Si la respuesta devuelve un error 401 (no autorizado),
 * elimina el token y redirige al usuario a la página de login.
 */
api.interceptors.response.use(
    response => response, // Respuesta exitosa sin cambios
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token'); // Eliminar token invalido
            window.location.href = '/login'; // Redirigir a Login
        }
        return Promise.reject(error); // Propagar el error
    }
);

export default api;