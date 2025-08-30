import api from "../utils/axiosConfig";


export const getRecipe = async() => {
    try {
        const response = await api.get("/recipe");
        return response.data;
    } catch (error) {
        console.error("error al obtener lalista de recetas", error);
        throw error;        
    };
};

export const createRecipe = async(recipeData) => {
    try {
        const response = await api.post("/recipe", recipeData);
        return response.data;
    } catch (error) {
        console.error("error al crear la receta", error);
        throw error;
    };
};

export const getRecipeDetails = async(id) => {
    try {
        const response = await api.get(`/recipe/${id}`);
        return response.data;
    } catch (error) {
        console.error("error al obtener los detalles con la receta", error);
        throw error;        
    };
};


export const updateRecipe = async (id, recipeData) => {
    try {
        const response = await api.put(`/recipe/${id}`, recipeData);
        return response.data;
    } catch (error) {
        console.error("error al editar la receta", error);
        throw error;
    };
};