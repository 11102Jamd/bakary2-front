import React from "react";
import { useState } from "react";
import { createRecipe } from "../../../api/recipe";
import { errorCreateRecipe, successCreateRecipe } from "../../../utils/alerts/recipeAlert";
import RecipeIngredientManager from "./RecipeIngredientManager";
import { validateName, validateQuantity } from "../../../utils/validations/validationFields";

function CreateRecipeModal({ onClose, onRecipeCreated }) {
    const [newRecipe, setNewRecipe] = useState({
        name: '',
        yield_quantity: '',
        ingredients: []
    });

    const [currentItem, setCurrentItem] = useState({
        input_id: '',
        quantity_required: '',
        unit_used: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleItemChange = (e) => {
        setCurrentItem({ 
            ...currentItem, 
            [e.target.name]: e.target.value 
        });
    };

    const addItem = () => {
        if (!currentItem.input_id || !currentItem.quantity_required || !currentItem.unit_used) {
            return;
        }

        const newItem = {
            input_id: parseInt(currentItem.input_id),
            quantity_required: parseFloat(currentItem.quantity_required),
            unit_used: currentItem.unit_used,
            input_name: '' // Se llenará automáticamente desde el componente
        };

        setNewRecipe(prev => ({ 
            ...prev, 
            ingredients: [...prev.ingredients, newItem] 
        }));

        setCurrentItem({
            input_id: '',
            quantity_required: '',
            unit_used: ''
        });
    };

    const removeItem = (index) => {
        const updatedItems = [...newRecipe.ingredients];
        updatedItems.splice(index, 1);
        setNewRecipe({ ...newRecipe, ingredients: updatedItems });
    };

    const handleRecipeChange = (e) => {
        const { id, value } = e.target;
        setNewRecipe(prev => ({ ...prev, [id]: value }));
        
        let error = null;
        switch(id) {
            case 'name':
                error = validateName(value, 'El nombre de la Receta');
                break;
            case 'yield_quantity':
                error = validateQuantity(value, 'La cantidad del Producto');
                break
            default:
                break;
        }
        setErrors(prev => ({ ...prev, [id]: error }));
    };

    const handleSubmit = async () => {
        if (!newRecipe.name || !newRecipe.yield_quantity || newRecipe.ingredients.length === 0) {
            return;
        }
        setLoading(true);
        try {
            await createRecipe(newRecipe);
            await successCreateRecipe();
            onRecipeCreated();
            onClose();
        } catch (error) {
            console.error("Error al crear receta:", error);
            await errorCreateRecipe();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{backgroundColor:' #176FA6'}}>
                        <h5 className="modal-title">Crear Receta Base</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row mb-4">
                            <div className="col-md-7">
                                <label htmlFor="name" className="form-label">Nombre de la Receta</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    id="name"
                                    name="name"
                                    value={newRecipe.name}
                                    onChange={handleRecipeChange}
                                    required
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="yield_quantity" className="form-label">Cantidad de Producto</label>
                                <input
                                    type="number"
                                    className={`form-control ${errors.yield_quantity ? 'is-invalid' : ''}`}
                                    id="yield_quantity"
                                    name="yield_quantity"
                                    value={newRecipe.yield_quantity}
                                    onChange={handleRecipeChange}
                                    min="0.001"
                                    step="0.001"
                                    required
                                />
                                {errors.yield_quantity && <div className="invalid-feedback">{errors.yield_quantity}</div>}
                            </div>
                        </div>

                        {/* Componente unificado de gestión de ingredientes */}
                        <RecipeIngredientManager 
                            items={newRecipe.ingredients}
                            onAddItem={addItem}
                            onRemoveItem={removeItem}
                            currentItem={currentItem}
                            onCurrentItemChange={handleItemChange}
                        />
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            style={{backgroundColor:' #176FA6'}} 
                            onClick={handleSubmit}
                            disabled={newRecipe.ingredients.length === 0 || !newRecipe.name || !newRecipe.yield_quantity || loading}
                        >
                            {loading ? 'Guardando...' : 'Guardar Receta'}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateRecipeModal;