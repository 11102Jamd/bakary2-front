import api from "../utils/axiosConfig";

export const getSale = async () => {
    try {
        const response = await api.get("/sale");
        return response.data;
    } catch (error) {
        console.error("error al obetner el listado de ventas",error);
        throw error;        
    };
};

export const getSaleDetails = async (id) => {
    try {
        const response = await api.get(`/sale/${id}`);
        return response.data;
    } catch (error) {
        console.error("error al traer la venta con detalles", error);
        throw error;
    };
};

export const createSale = async (saleData) => {
    try {
        const response = await api.post("/sale", saleData);
        return response.data;
    } catch (error) {
        console.error("error al crear la venta", error);
        throw error;        
    };
};

export const deleteSale = async (id) => {
    try {
        const response = await api.delete(`/sale/${id}`);
        return response.data;
    } catch (error) {
        console.error("error al elimnar la venta",error);
        throw error;        
    };
};