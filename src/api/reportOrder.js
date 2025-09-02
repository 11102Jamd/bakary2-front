import api from "../utils/axiosConfig";


export const generatePdfOrder = async (startDate, endDate) => {
    try {
        const response = await api.post("/order/export-pdf", {
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
        console.error("error al generar el pdf de comrpas");
        throw error;        
    };
};