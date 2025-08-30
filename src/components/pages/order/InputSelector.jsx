import React, { useState, useEffect } from 'react';
import { getInput } from '../../../api/input';
import { LoadingSpinner } from '../../Loading';

function InputSelector({ currentItem, onItemChange, onAddItem }) {
    const [inputs, setInputs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInput = async () => {
            try {
                const data = await getInput();
                setInputs(data);
            } catch (error) {
                console.error("Error cargando insumos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInput();
    }, []);

    if (loading) {
        return (
            <div className="card mb-4">
                <div className="card-body text-center py-4">
                    <LoadingSpinner message="Cargando Insumos"/>
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
                <div className="row g-3">
                    <div className="col-md-5">
                        <label htmlFor="input_id" className="form-label">Insumo</label>
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
                        <label htmlFor="quantity_total" className="form-label">Cantidad</label>
                        <input 
                            type="number" 
                            className="form-control"
                            id="quantity_total"
                            name="quantity_total"
                            value={currentItem.quantity_total}
                            onChange={onItemChange}
                            min="0.01"
                            step="0.01"
                            required
                        />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="unit_price" className="form-label">Precio Unitario</label>
                        <input 
                            type="number" 
                            className="form-control"
                            id="unit_price"
                            name="unit_price"
                            value={currentItem.unit_price}
                            onChange={onItemChange}
                            min="0.01"
                            step="0.01"
                            required
                        />
                    </div>
                    <div className="col-md-3 d-flex align-items-end">
                        <button 
                            onClick={onAddItem} 
                            className="btn btn-primary w-100"
                            disabled={!currentItem.input_id || !currentItem.quantity_total || !currentItem.unit_price}
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