import React, { useState, useEffect } from 'react';
import {createOrder} from "../../../api/order";
import { successCreateOrder, errorCreateOrder } from '../../../utils/alerts/orderAlerts';
import InputSelector from './InputSelector';
import OrderItemsTable from './OrderItemsTable';

function CreateOrderModal({ onClose, onOrderCreated }) {
    const [order, setOrder] = useState({
        supplier_name: '',
        order_date: new Date().toISOString().split('T')[0],
        items: []
    });

    const [currentItem, setCurrentItem] = useState({
        input_id: '',
        quantity_total: '',
        unit_price: ''
    });

    const [loading, setLoading] = useState(false);

    const addItem = () => {
        if (!currentItem.input_id || !currentItem.quantity_total || !currentItem.unit_price) {
            return;
        }

        const newItem = {
            input_id: parseInt(currentItem.input_id),
            quantity_total: parseFloat(currentItem.quantity_total),
            unit_price: parseFloat(currentItem.unit_price)
        };

        setOrder(prev => ({ 
            ...prev, 
            items: [...prev.items, newItem] 
        }));

        setCurrentItem({
            input_id: '',
            quantity_total: '',
            unit_price: ''
        });
    };

    const removeItem = (index) => {
        const updatedItems = [...order.items];
        updatedItems.splice(index, 1);
        setOrder({ ...order, items: updatedItems });
    };

    const handleOrderChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    const handleItemChange = (e) => {
        setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!order.supplier_name || !order.order_date || order.items.length === 0) {
            return;
        }

        setLoading(true);
        try {
            await createOrder(order);
            await successCreateOrder();
            onOrderCreated?.();
            onClose();
        } catch (error) {
            console.error("Error al crear orden:", error);
            await errorCreateOrder(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{backgroundColor:' #176FA6'}}>
                        <h5 className="modal-title">Crear Orden de Compra</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {/* Selección de proveedor */}
                        <div className="mb-4">
                            <label htmlFor="supplier_name" className="form-label">Proveedor *</label>
                            <input
                                type="text"
                                className="form-control"
                                id="supplier_name"
                                name="supplier_name"
                                value={order.supplier_name}
                                onChange={handleOrderChange}
                                required
                            />
                        </div>

                        {/* Selector de insumos */}
                        <InputSelector 
                            currentItem={currentItem}
                            onItemChange={handleItemChange}
                            onAddItem={addItem}
                        />

                        {/* Tabla de items de la orden */}
                        <OrderItemsTable 
                            items={order.items}
                            onRemoveItem={removeItem}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" style={{backgroundColor:' #176FA6'}} onClick={handleSubmit}
                            disabled={order.items.length === 0 || !order.supplier_name}
                        >
                            Guardar Orden
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateOrderModal;

{/* {loading ? (
    <>
        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
        Guardando...
    </>
) : 'Guardar Orden'} */}