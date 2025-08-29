import { useState, useEffect } from "react";
import { createProduction } from "../../../api/production";
import { getRecipe } from "../../../api/recipe";

function CreateProductionModal({ onClose, onProductionCreated }) {
    const [newProduction, setNewProduction] = useState({
        recipe_id: '',
        quantity_to_produce: ''
    });

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Cargar recetas disponibles al abrir el modal
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const recipesData = await getRecipe();
                setRecipes(recipesData);
            } catch (error) {
                console.error("Error al cargar recetas", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setNewProduction(prev => ({ ...prev, [id]: value }));
    };

    const createProductionHandler = async () => {
        try {
            await createProduction(newProduction);
            onProductionCreated();
            onClose();
            setNewProduction({
                recipe_id: '',
                quantity_to_produce: ''
            });
        } catch (error) {
            console.error("Error al crear la producción", error);
        }
    };

    if (loading) {
        return (
            <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{backgroundColor:' #176FA6'}}>
                        <h5 className="modal-title">Crear Nueva Producción</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="recipe_id" className="form-label">Receta</label>
                            <select 
                                className="form-select form-select-sm"
                                id="recipe_id"
                                value={newProduction.recipe_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione una receta</option>
                                {recipes.map(recipe => (
                                    <option key={recipe.id} value={recipe.id}>
                                        {recipe.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="quantity_to_produce" className="form-label">Cantidad a Producir</label>
                            <input 
                                type="number" 
                                className="form-control form-control-sm"
                                id="quantity_to_produce"
                                value={newProduction.quantity_to_produce}
                                onChange={handleChange}
                                min="0.001"
                                step="0.001"
                                required 
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={createProductionHandler}
                            disabled={!newProduction.recipe_id || !newProduction.quantity_to_produce}
                            style={{backgroundColor:' #176FA6'}}
                        >
                            Crear Producción
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateProductionModal;