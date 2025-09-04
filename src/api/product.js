import api from "../utils/axiosConfig";

export const getProduct = async  () => {
    try {
        const response = await api.get("/product");
        // return Array.isArray(response.data) ? response.data : [];
        return response.data;
    } catch (error) {
        console.error("Error al obtener la lista de productos", error);
        throw error;
    };
};

export const createProduct = async (productData) => {
    try {
        const response = await api.post("/product", productData);
        return response.data;
    } catch (error) {
        console.error("Error al crear el producto", error);
        throw error;
    };
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await api.put(`/product/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error("error al editar el producto", error);
        throw error;
    };
};

export const disableProduct = async (id) => {
    try {
        const response = await api.patch(`/product/${id}/disable`);
        return response.data;
    } catch (error) {
        console.error("error al inhabilitar el producto", error);
        throw error;        
    }
}


export const linkProductionToProduct = async (productionId,productId) => {
    try {
        const response = await api.post("/products/link-production", {
            production_id: productionId,
            product_id: productId
        });
        return response.data;
    } catch (error) {
        console.error("error al vincular el cproducto con su produccion", error);
        throw error        
    };
};
