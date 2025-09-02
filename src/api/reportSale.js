import api from "../utils/axiosConfig";


export const generatePdfSale = async (startDate, endDate) => {
    try {
        const response = await api.post("/sale/export-pdf", {
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
        console.error("error al generar el pdf de ventas", error);
        throw error;        
    };
};