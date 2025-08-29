import api from "../utils/axiosConfig";

const LARAVEL_BASE_URL = 'http://localhost:8000';

/**
 * Inicia sesión en el sistema.
 * Envía las credenciales al backend y guarda el token en el almacenamiento local.
 *
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise<Object>} - Datos del usuario autenticado.
 */
export const login = async (email, password) => {
  try {

    const response = await api.post('/login', { email, password });

    localStorage.setItem('token', response.data.access_token);
    return response.data.user;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Error al iniciar sesión';
  }
};

/**
 * Cierra la sesión del usuario.
 * Elimina el token del almacenamiento local y notifica al backend.
 */
export const logout = async () => {
  try {
    await api.post('/logout');
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Logout error:', error);
    localStorage.removeItem('token');
    throw error;
  }
};

/**
 * Obtiene los datos del usuario autenticado.
 * Si el token no es válido, lo elimina y lanza un error.
 *
 * @returns {Promise<Object>} - Datos del usuario.
 */
export const getUser = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    localStorage.removeItem('token');
    throw error;
  }
};