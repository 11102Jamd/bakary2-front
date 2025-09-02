import api from "../utils/axiosConfig";


export const generatePdfProduction = async (startDate, endDate) => {
    try {
        const response = await api.post("/production/export-pdf", {
            start_date: startDate,
            end_date: endDate
        }, {
            headers: {
                "Content-Type":'application/json'
            },
            responseType:'blob' 
        });
        return response.data;
    } catch (error) {
        console.error("error al obtener el pdf de Producciones", error);
        throw error;        
    };
};