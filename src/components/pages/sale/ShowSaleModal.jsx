import React, { useEffect, useRef, useState } from "react";
import { getSaleDetails } from "../../../api/sale";
import { errorShowDetailsSale } from "../../../utils/alerts/saleAlerts";
import NumberFormatter from "../../NumberFormatter";

function ShowSale({ show, onHide, saleId }) {
    const [sale, setSale] = useState(null);
    const [loading, setLoading] = useState(false);
    const abortControllerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    useEffect(() => {
        if (!show || !saleId) return;

        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        const fetchSaleDetails = async () => {
            setLoading(true);
            try {
                const data = await getSaleDetails(saleId, { signal });
                setSale(data);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("Error al cargar los datos de la venta", error);
                    await errorShowDetailsSale();
                    onHide();
                }
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            };
        };

        fetchSaleDetails();

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [show, saleId, onHide]);

    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{ backgroundColor: ' #176FA6'}}>
                        <h5 className="modal-title">Detalles de Venta</h5>
                        <button 
                            type="button" 
                            className="btn-close btn-close-white" 
                            onClick={onHide}
                            disabled={loading}
                        ></button>
                    </div>
                    
                    <div className="modal-body">
                        {loading ? (
                            <div className="text-center py-4">
                                <div className="spinner-border text-success" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                                <p className="mt-2">Cargando detalles de la venta...</p>
                            </div>
                        ) : sale ? (
                            <>
                                <div className="mb-4">
                                    <h5>Información General</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p><strong>Vendedor:</strong> {sale.user?.name || 'N/A'}</p>
                                            <p><strong>Fecha de Venta:</strong> {new Date(sale.sale_date).toLocaleDateString()}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p><strong>Total de la Venta:</strong><NumberFormatter value={sale.sale_total} prefix="$" suffix="COP"/></p>
                                        </div>
                                    </div>
                                </div>

                                <h5 className="mb-3">Productos Vendidos</h5>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Producto</th>
                                                <th>Cantidad</th>
                                                <th>Precio Unitario</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sale.sale_products?.length > 0 ? (
                                                sale.sale_products.map((saleProduct, index) => (
                                                    <tr key={index}>
                                                        <td>{saleProduct.product?.name || `Producto ID: ${saleProduct.product_id}`}</td>
                                                        <td><NumberFormatter value={saleProduct.quantity_requested}/></td>
                                                        <td><NumberFormatter value={saleProduct.product?.unit_price} prefix="$"/></td>
                                                        <td><NumberFormatter value={saleProduct.subtotal_price} prefix="$"/></td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="text-center">No hay productos en esta venta</td>
                                                </tr>
                                            )}
                                        </tbody>
                                        <tfoot className="table-light">
                                            <tr>
                                                <td colSpan="3" className="text-end fw-bold">Total:</td>
                                                <td className="fw-bold"><NumberFormatter value={sale.sale_total} prefix="$" suffix="COP"/></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </>
                        ) : (
                            <div className="alert alert-warning">
                                No se encontraron datos de la venta
                            </div>
                        )}
                    </div>
                    
                    <div className="modal-footer">
                        <button 
                            className="btn btn-secondary" 
                            onClick={onHide}
                            disabled={loading}
                        >
                            {loading ? 'Cerrar (cargando...)' : 'Cerrar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowSale;