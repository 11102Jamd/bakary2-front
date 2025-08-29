import api from "../utils/axiosConfig";

export const getOrder = async() => {
    try {
        const response = await api.get("/order");
        return response.data;
    } catch (error) {
        console.error("error al obtener la lista de compras", error);
        throw error;    
    };
};

export const getOrderDetails = async(id) => {
    try {
        const response = await api.get(`/order/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obener el detalle especifc de la compra", error);
        throw error;
    };
};

export const createOrder = async(orderData) => {
    try {
        const response = await api.post("/order", orderData);
        return response.data;
    } catch (error) {
        console.error("Error al crear la compra", error);
        throw error;
    };
};

export const deleteOrder = async(id) => {
    try {
        const response = await api.delete(`/order/${id}`);
        return response.data;
    } catch (error) {
        console.error("error al aliminar la oorden de compra");
        throw error;
    };
};