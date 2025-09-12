import React, { useEffect, useRef, useState } from "react";
import { getOrderDetails } from "../../../api/order";
import { errorShowDetails } from "../../../utils/alerts/orderAlerts";
import NumberFormatter from "../../NumberFormatter";

function ShowOrder({ show, onHide, orderId }) {
    const [order, setOrder] = useState(null);
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
        if (!show || !orderId) return;

        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        const fetchOrderDetails = async () => {
            setLoading(true);
            try {
                const data = await getOrderDetails(orderId, { signal });
                setOrder(data);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("Error al cargar los datos de la orden", error);
                    await errorShowDetails();
                    onHide();
                }
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            };
        };

        fetchOrderDetails();

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [show, orderId, onHide]);

    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{ backgroundColor: '#176FA6' }}>
                        <h5 className="modal-title">Detalles de Orden de Compra</h5>
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
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                                <p className="mt-2">Cargando detalles de la orden...</p>
                            </div>
                        ) : order ? (
                            <>
                                <div className="mb-4">
                                    <h5>Información General</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p><strong>Proveedor:</strong> {order.supplier_name || 'N/A'}</p>
                                            <p><strong>Fecha de Orden:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p><strong>Total de la Orden:</strong><NumberFormatter value={order.order_total} prefix="$" suffix="COP"/></p>
                                        </div>
                                    </div>
                                </div>

                                <h5 className="mb-3">Items de la Orden</h5>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Insumo</th>
                                                <th>Cantidad</th>
                                                <th>Precio Unitario</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.batches?.length > 0 ? (
                                                order.batches.map((batch, index) => (
                                                    <tr key={index}>
                                                        <td>{batch.input?.name || `Insumo ID: ${batch.input_id}`}</td>
                                                        <td>{<NumberFormatter value={batch.quantity_total}/>} {batch.unit}</td>
                                                        <td><NumberFormatter value={batch.unit_price} prefix="$" suffix="COP"/></td>
                                                        <td><NumberFormatter value={batch.subtotal_price} prefix="$" suffix="COP"/></td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="text-center">No hay items en esta orden</td>
                                                </tr>
                                            )}
                                        </tbody>
                                        <tfoot className="table-light">
                                            <tr>
                                                <td colSpan="3" className="text-end fw-bold">Total:</td>
                                                <td className="fw-bold"><NumberFormatter value={order.order_total} prefix="$" suffix="COP"/></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>

                                {order.batches?.length > 0 && (
                                    <>
                                        <h5 className="mb-3 mt-4">Lotes Recibidos</h5>
                                        <div className="table-responsive">
                                            <table className="table table-bordered">
                                                <thead className="table-secondary">
                                                    <tr>
                                                        <th>Insumo</th>
                                                        <th>Lote</th>
                                                        <th>Cantidad</th>
                                                        <th>Fecha de Recepción</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.batches.map((batch, index) => (
                                                        <tr key={index}>
                                                            <td>{batch.input?.name || `Insumo ID: ${batch.input_id}`}</td>
                                                            <td># {batch.batch_number || batch.id}</td>
                                                            <td>{<NumberFormatter value={batch.quantity_remaining}/>} {batch.unit_converted} - {batch.quantity_total} {batch.unit}</td>
                                                            <td>{batch.received_date ? new Date(batch.received_date).toLocaleDateString() : 'N/A'}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="alert alert-warning">
                                No se encontraron datos de la orden
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

export default ShowOrder;