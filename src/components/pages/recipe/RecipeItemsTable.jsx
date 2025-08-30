import React from 'react';

function RecipeItemsTable({ items, onRemoveItem }) {
    if (items.length === 0) {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="alert alert-warning mb-0">No hay ingredientes agregados a la receta</div>
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="card-header bg-light">
                <h6 className="mb-0">Detalle de la Receta</h6>
            </div>
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>ID Ingrediente</th>
                                <th>Nombre</th>
                                <th>Cantidad Requerida</th>
                                <th style={{ width: '70px' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.input_id}</td>
                                    <td>{item.input_name || 'N/A'}</td>
                                    <td>{item.quantity_required}</td>
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RecipeItemsTable;