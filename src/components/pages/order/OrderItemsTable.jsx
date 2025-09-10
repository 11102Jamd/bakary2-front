import React from "react";

function OrderItemsTable({ items, onRemoveItem, inputs }) { // ← Agrega 'inputs' como prop
    const getInputById = (id) => {
        return inputs.find(input => input.id === id);
    };

    if (items.length === 0) {
        return (
        <div className="card">
            <div className="card-body">
            <div className="alert alert-warning mb-0">No hay insumos agregados a la orden</div>
            </div>
        </div>
        );
    }

    return (
        <div className="card">
            <div className="card-header bg-light">
                <h6 className="mb-0">Detalle de la Orden</h6>
            </div>
            <div className="card-body p-0">
                <div className="table-responsive">
                <table className="table table-hover mb-0">
                    <thead className="table-light">
                    <tr>
                        <th>Insumo</th>
                        <th>Cantidad</th>
                        <th>Unidad</th>
                        <th>Precio Unitario</th>
                        <th>Subtotal</th>
                        <th style={{ width: '70px' }}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, index) => {
                        const input = getInputById(item.input_id);
                        const subtotal = item.quantity_total * item.unit_price;
                        
                        return (
                        <tr key={index}>
                            <td>
                            {input ? input.name : `ID: ${item.input_id}`}
                            </td>
                            <td>{item.quantity_total}</td>
                            <td>{item.unit || 'N/A'}</td>
                            <td>${item.unit_price?.toFixed(1) || '0.0'}</td>
                            <td>${subtotal.toFixed(1)}</td>
                            <td>
                            <button 
                                onClick={() => onRemoveItem(index)}
                                className="btn btn-danger btn-sm"
                                title="Eliminar"
                            >
                                <i className="bi bi-trash"></i>
                            </button>
                            </td>
                        </tr>
                        );
                    })}
                    <tr className="table-primary">
                        <td colSpan="4" className="text-end fw-bold">Total:</td>
                        <td className="fw-bold">
                        ${items.reduce((total, item) => total + (item.quantity_total * item.unit_price), 0).toFixed(3)}
                        </td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
}

export default OrderItemsTable;