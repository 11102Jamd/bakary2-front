import api from "../utils/axiosConfig";


export const getInput = async () => {
    try {
        const response = await api.get("/input");
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos', error);
        throw error;
    };
};


export const createInput = async (inputData) => {
    try {
        const response = await api.post("/input", inputData);
        return response.data;
    } catch (error) {
        console.error("Error al crear el insumo", error);
        throw error;
    };
};


export const updateInput = async (id, inputData) => {
    try {
        const response = await api.put(`/input/${id}`, inputData);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el insumo", error);
        throw error;
    };
};

