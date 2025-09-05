import React from "react";
import { useState } from "react";
import { createRecipe } from "../../../api/recipe";
import { errorCreateRecipe, successCreateRecipe } from "../../../utils/alerts/recipeAlert";
import IngredientSelector from "./IngredientSelector";
import RecipeItemsTable from "./RecipeItemsTable";

function CreateRecipeModal({onClose, onRecipeCreated}){
    const [newRecipe, setNewRecipe] = useState({
        name:'',
        yield_quantity:'',
        ingredients:[]
    });

    const [currentItem, setCurrentItem] = useState({
        input_id:'',
        quantity_required:''
    });

    const [loading, setLoading] = useState(true);
    const [inputs, setInputs] = useState([]);

    const addItem = () => {
        if (!currentItem.input_id || !currentItem.quantity_required) {
            return;
        }

        const selectedInput = inputs.find(input => input.id === parseInt(currentItem.input_id));
        const inputName = selectedInput ? selectedInput.name : '';

        const newItem = {
            input_id: parseInt(currentItem.input_id),
            quantity_required: parseFloat(currentItem.quantity_required),
            input_name: inputName
        };

        setNewRecipe(prev => ({ 
            ...prev, 
            ingredients: [...prev.ingredients, newItem] 
        }));

        setCurrentItem({
            input_id: '',
            quantity_required: ''
        });
    };

    const removeItem = (index) => {
        const updatedItems = [...newRecipe.ingredients];
        updatedItems.splice(index, 1);
        setNewRecipe({ ...newRecipe, ingredients: updatedItems });
    };

    const handleRecipeChange = (e) => {
        setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
    };

    const handleItemChange = (e) => {
        setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!newRecipe.name || !newRecipe.yield_quantity || newRecipe.ingredients.length === 0) {
            return;
        }
        setLoading(true);
        try {
            await await createRecipe(newRecipe);
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
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">Nombre de la Receta</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={newRecipe.name}
                                    onChange={handleRecipeChange}
                                    required
                                />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="yield_quantity" className="form-label">Cantidad de Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="yield_quantity"
                                    name="yield_quantity"
                                    value={newRecipe.yield_quantity}
                                    onChange={handleRecipeChange}
                                    min="0.001"
                                    step="0.001"
                                    required
                                />
                            </div>
                        </div>

                        {/* Selector de ingredientes */}
                        <IngredientSelector 
                            currentItem={currentItem}
                            onItemChange={handleItemChange}
                            onAddItem={addItem}
                        />

                        {/* Tabla de ingredientes de la receta */}
                        <RecipeItemsTable 
                            items={newRecipe.ingredients}
                            onRemoveItem={removeItem}
                        />
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            style={{backgroundColor:' #176FA6'}} 
                            onClick={handleSubmit}
                            disabled={newRecipe.ingredients.length === 0 || !newRecipe.name || !newRecipe.yield_quantity}
                        >
                            Guardar Receta
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

export default CreateRecipeModal;