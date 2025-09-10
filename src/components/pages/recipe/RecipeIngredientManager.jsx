import React, { useEffect, useState } from "react";
import { getInput } from "../../../api/input";
import { LoadingSpinner } from "../../Loading";

function RecipeIngredientManager({ 
    items, 
    onAddItem, 
    onRemoveItem, 
    currentItem, 
    onCurrentItemChange 
}) {
    const [inputs, setInputs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInput = async () => {
            try {
                const data = await getInput();
                setInputs(data);
            } catch (error) {
                console.error("Error al cargar insumos", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInput();
    }, []);

    const selectedInput = inputs.find(input => input.id === parseInt(currentItem?.input_id || ''));

    if (loading) {
        return (
            <div className="card mb-4">
                <div className="card-body">
                    <LoadingSpinner message="Cargando insumos"/>
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="card-header bg-light">
                <h6 className="mb-0">Gestión de Ingredientes</h6>
            </div>
            <div className="card-body">
                {/* Selector de ingredientes */}
                <div className="row g-3 mb-4">
                    <div className="col-md-4">
                        <label htmlFor="input_id" className="form-label">Ingrediente</label>
                        <select 
                            className="form-select"
                            id="input_id"
                            name="input_id"
                            value={currentItem?.input_id || ''}
                            onChange={onCurrentItemChange}
                            required
                        >
                            <option value="">Seleccione un ingrediente</option>
                            {inputs.map(input => (
                                <option key={input.id} value={input.id}>
                                    {input.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="col-md-2">
                        <label htmlFor="quantity_required" className="form-label">Cantidad</label>
                        <input 
                            type="number" 
                            className="form-control"
                            id="quantity_required"
                            name="quantity_required"
                            value={currentItem?.quantity_required || ''}
                            onChange={onCurrentItemChange}
                            min="0.001"
                            step="0.001"
                            required
                        />
                    </div>

                    <div className="col-md-2">
                        <label htmlFor="unit_used" className="form-label">Unidad</label>
                        <select 
                            className="form-select"
                            id="unit_used"
                            name="unit_used"
                            value={currentItem?.unit_used || ''}
                            onChange={onCurrentItemChange}
                            required
                            disabled={!currentItem?.input_id}
                        >
                            <option value="">Seleccione unidad</option>
                            {selectedInput && (
                                <>
                                    {selectedInput.category === 'liquido' && (
                                        <>
                                            <option value="ml">ml</option>
                                        </>
                                    )}
                                    {selectedInput.category === 'solido_no_con' && (
                                        <>
                                            <option value="g">g</option>
                                        </>
                                    )}
                                    {selectedInput.category === 'solido_con' && (
                                        <option value="un">un</option>
                                    )}
                                </>
                            )}
                        </select>
                    </div>

                    <div className="col-md-2 d-flex align-items-end">
                        <button 
                            onClick={onAddItem} 
                            className="btn btn-primary w-100"
                            disabled={!currentItem?.input_id || !currentItem?.quantity_required || !currentItem?.unit_used}
                        >
                            <i className="bi bi-plus-lg me-2"></i>Agregar
                        </button>
                    </div>
                </div>

                {/* Tabla de ingredientes */}
                {items.length === 0 ? (
                    <div className="alert alert-warning mb-0">
                        No hay ingredientes agregados a la receta
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Cantidad</th>
                                    <th>Unidad</th>
                                    <th style={{ width: '70px' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.input_id}</td>
                                        <td>{item.input_name || 'N/A'}</td>
                                        <td>{item.quantity_required}</td>
                                        <td>{item.unit_used}</td>
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
                )}
            </div>
        </div>
    );
}

export default RecipeIngredientManager;