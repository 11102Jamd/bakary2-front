import { useEffect, useState } from "react";
import { getInput } from "../../../api/input";
import { LoadingSpinner } from "../../Loading";


function IngredientSelector({currentItem, onItemChange, onAddItem}){
    const [inputs, setInputs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const fetchInput = async () => {
            try {
                const data = await getInput();
                setInputs(data);
            } catch (error) {
                console.error("error al cargar insumos", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInput();
    },[]);

    if (loading) {
        return (
            <div className="card mb-4">
                <div className="card-body">
                    <LoadingSpinner message="cargando insumos"/>
                </div>
            </div>
        );
    }

    return (
        <div className="card mb-4">
            <div className="card-header bg-light">
                <h6 className="mb-0">Agregar Ingredientes</h6>
            </div>
            <div className="card-body">
                <div className="row g-3">
                    <div className="col-md-5">
                        <label htmlFor="input_id" className="form-label">Ingrediente</label>
                        <select 
                            className="form-select"
                            id="input_id"
                            name="input_id"
                            value={currentItem.input_id}
                            onChange={onItemChange}
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
                    <div className="col-md-3">
                        <label htmlFor="quantity_required" className="form-label">Cantidad Requerida</label>
                        <input 
                            type="number" 
                            className="form-control"
                            id="quantity_required"
                            name="quantity_required"
                            value={currentItem.quantity_required}
                            onChange={onItemChange}
                            min="0.001"
                            step="0.001"
                            required
                        />
                    </div>
                    <div className="col-md-2 d-flex align-items-end">
                        <button 
                            onClick={onAddItem} 
                            className="btn btn-primary w-100"
                            disabled={!currentItem.input_id || !currentItem.quantity_required}
                        >
                            <i className="bi bi-plus-lg me-2"></i>Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default IngredientSelector;