import api from "../utils/axiosConfig";

export const getUserList = async() => {
    try {
        const response = await api.get("/user");
        return response.data;
    } catch (error) {
        console.error("error al obtener los usuarios");
        throw error;
    };
};

export const createUser = async(userData) => {
    try {
        const response = await api.post("/user", userData);
        return response.data;
    } catch (error) {
        console.error("error al crear el usuario");
        throw error;
    };
};


export const updateUser = async(id, userData) => {
    try {
        const response = await api.put(`/user/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error("error al acutalizar el usuario");
        throw error;
    };
};


export const disableUser = async(id) => {
    try {
        const response = await api.patch(`/user/${id}/disable`);
        return response.data;
    } catch (error) {
        console.error("error al inhabilitar el usuario", error);
        throw error;
    };
};