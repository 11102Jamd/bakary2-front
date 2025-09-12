import React from "react";
import { LoadingSpinner } from "../../Loading";

function InputSelector({ currentItem, onItemChange, onAddItem, inputs, loading, errors }) {

    const selectedInput = inputs.find(input => input.id === parseInt(currentItem?.input_id || ''));

    if (loading) {
        return (
        <div className="card mb-4">
            <div className="card-body text-center py-4">
                <LoadingSpinner/>
            </div>
        </div>
        );
    }

    return (
        <div className="card mb-4">
            <div className="card-header bg-light">
                <h6 className="mb-0">Agregar Insumos</h6>
            </div>
            <div className="card-body">
                <div className="row g-2">
                <div className="col-md-4">
                    <label htmlFor="input_id" className="form-label">Insumo *</label>
                    <select 
                        className="form-select"
                        id="input_id"
                        name="input_id"
                        value={currentItem.input_id}
                        onChange={onItemChange}
                        required
                    >
                    <option value="">Seleccione un insumo</option>
                    {inputs.map(input => (
                        <option key={input.id} value={input.id}>
                        {input.name}
                        </option>
                    ))}
                    </select>
                </div>
                <div className="col-md-2">
                    <label htmlFor="quantity_total" className="form-label">Cantidad *</label>
                    <input 
                        type="number" 
                        className="form-control"
                        id="quantity_total"
                        name="quantity_total"
                        value={currentItem.quantity_total}
                        onChange={onItemChange}
                        min="1"
                        step="1"
                        required
                    />
                </div>
                <div className="col-md-2">
                    <label htmlFor="unit" className="form-label">Unidad *</label>
                    <select 
                        className="form-select"
                        id="unit"
                        name="unit"
                        value={currentItem.unit}
                        onChange={onItemChange}
                        required
                    >
                        <option value="">Selecciona unidad</option>
                        {selectedInput && (
                            <>
                                {selectedInput.category === 'liquido' && (
                                    <>
                                        <option value="l">L</option>
                                        <option value="ml">ml</option>
                                    </>
                                )}
                                {selectedInput.category === 'solido_no_con' && (
                                    <>
                                        <option value="kg">Kg</option>
                                        <option value="lb">Lb</option>
                                        <option value="g">g</option>
                                        <option value="oz">oz</option>
                                    </>
                                )}
                                {selectedInput.category === 'solido_con' && (
                                    <option value="un">un</option>
                                )}
                            </>
                        )}
                    </select>
                </div>
                <div className="col-md-2">
                    <label htmlFor="unit_price" className="form-label">Precio Unitario *</label>
                    <input 
                        type="number" 
                        className="form-control"
                        id="unit_price"
                        name="unit_price"
                        value={currentItem.unit_price}
                        onChange={onItemChange}
                        min="1"
                        step="1"
                        required
                    />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                    <button 
                        onClick={onAddItem} 
                        className="btn btn-primary w-100"
                        disabled={!currentItem.input_id || !currentItem.quantity_total || !currentItem.unit || !currentItem.unit_price}
                    >
                    <i className="bi bi-plus-lg me-2"></i>Agregar
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default InputSelector;