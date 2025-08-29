import api from "../utils/axiosConfig";

export const getProduction = async () => {
    try {
        const response = await api.get("/production");
        return response.data;
    } catch (error) {
        console.error("error al obtener las producciones");
        throw error;
    };
};

export const createProduction = async (productionData) => {
    try {
        const response = await api.post("/production", productionData);
        return response.data;
    } catch (error) {
        console.error("error al crear la produccion", error);
        throw error;        
    };
};


export const getProductionDetails = async (id) => {
    try {
        const response = await api.get(`/production/${id}`);
        return response.data;
    } catch (error) {
        console.error("error al obtener el detalle de una produccion ", error);
        throw error;
    };
};

export const deleteProduction = async (id) => {
    try {
        const response = await api.delete(`/production/${id}`);
        return response.data;
    } catch (error) {
        console.error("error al eliminar la produccion", error);
        throw error;        
    };
};