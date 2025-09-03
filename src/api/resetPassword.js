import api from "../utils/axiosConfig";

export const resetPassword = async (email, newPassword) => {
    try {
        const response = await api.post("/reset-password", {
            email: email,
            new_password: newPassword,
            new_password_confirmation: newPassword 
        }, {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error al cambiar la contraseña:", error);
        throw error;
    }
};