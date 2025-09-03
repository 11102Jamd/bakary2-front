import api from "../utils/axiosConfig";

export const getDashboardStats = async() => {
    try {
        const response = await api.get("/dashboard/stats");
        return response.data;
    } catch (error) {
        console.error("error al obtener los datos basicos del dashboard",error);
        throw error;        
    };
};

export const getSalesData = async (startDate, endDate) => {
    try {
        const response = await api.get(`/dashboard/sales-data?start_date=${startDate}&end_date=${endDate}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener datos de ventas", error);
        throw error;
    }
};

export const getOrdersData = async (startDate, endDate) => {
    try {
        const response = await api.get(`/dashboard/orders-data?start_date=${startDate}&end_date=${endDate}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener datos de órdenes", error);
        throw error;
    }
};

export const getUserStats = async () => {
    try {
        const response = await api.get("/dashboard/user-stats");
        return response.data;
    } catch (error) {
        console.error("Error al obtener estadísticas de usuarios", error);
        throw error;
    }
};

export const getTopProducts = async () => {
    try {
        const response = await api.get("/dashboard/top-products");
        return response.data;
    } catch (error) {
        console.error("Error al obtener productos más vendidos", error);
        throw error;
    }
};

export const getProductionStats = async (startDate, endDate) => {
    try {
        const response = await api.get(`/dashboard/production-stats?start_date=${startDate}&end_date=${endDate}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener estadísticas de producción", error);
        throw error;
    }
};

export const getInventoryValue = async () => {
    try {
        const response = await api.get("/dashboard/inventory-value");
        return response.data;
    } catch (error) {
        console.error("Error al obtener valor del inventario", error);
        throw error;
    }
};