import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { generatePdfProduction } from "../../../api/reportProduction";
import { generatePdfOrder } from "../../../api/reportOrder";
import { generatePdfSale } from "../../../api/reportSale"; // Added missing import

const ReportDownloader = () => {
    const [reportType, setReportType] = useState('order');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDownload = async () => {
        if (!startDate || !endDate) {
            setError('Debe seleccionar ambas fechas');
            return;
        }

        if (startDate > endDate) {
            setError('La fecha de inicio no puede ser mayor a la fecha final');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const formattedStartDate = startDate.toISOString().split('T')[0];
            const formattedEndDate = endDate.toISOString().split('T')[0];

            let response;
            if (reportType === 'order') {
                response = await generatePdfOrder(formattedStartDate, formattedEndDate);
            } else if (reportType === 'production') {
                response = await generatePdfProduction(formattedStartDate, formattedEndDate);
            } else if (reportType === 'sale') {
                response = await generatePdfSale(formattedStartDate, formattedEndDate);
            }

            const blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `reporte-${reportType}-${formattedStartDate}-a-${formattedEndDate}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (err) {
            console.error('Error al descargar el reporte:', err);
            setError(err.response?.data?.error || 'Error al generar el reporte');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow">
                <div className="card-header text-white" style={{backgroundColor: '#176FA6'}}>
                    <h4 className="mb-0">Generar Reporte PDF</h4>
                </div>
                
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <label className="form-label">Tipo de Reporte</label>
                            <select 
                                className="form-select"
                                value={reportType} 
                                onChange={(e) => setReportType(e.target.value)}
                            >
                                <option value="order">Reporte de Compras</option>
                                <option value="production">Reporte de Produccion</option>
                                <option value="sale">Reporte de Ventas</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Fecha de Inicio: </label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                dateFormat="yyyy-MM-dd"
                                className="form-control"
                                placeholderText="Seleccione fecha de inicio"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Fecha de Fin: </label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                dateFormat="yyyy-MM-dd"
                                className="form-control"
                                placeholderText="Seleccione fecha de fin"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="alert alert-danger mt-3">{error}</div>
                    )}

                    <div className="d-flex justify-content-center mt-4">
                        <button 
                            type="button" 
                            className="btn btn-outline-secondary me-3"
                            onClick={() => {
                                setStartDate(null);
                                setEndDate(null);
                                setError(null);
                            }}
                        >
                            Limpiar
                        </button>
                        <button 
                            type="button" 
                            className="btn text-white" 
                            onClick={handleDownload} 
                            disabled={isLoading}
                            style={{backgroundColor: '#176FA6'}}
                        >
                            {isLoading ? (
                                <>
                                    <span 
                                        className="spinner-border spinner-border-sm me-2" 
                                        role="status" 
                                        aria-hidden="true"
                                    />
                                    Generando...
                                </>
                            ) : (
                                'Descargar Reporte'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportDownloader;