import { useEffect, useRef, useState } from "react";
import { getRecipeDetails } from "../../../api/recipe";
import { errorShowDetailsRecipe } from "../../../utils/alerts/recipeAlert";

function ShowRecipeModal({ show, onHide, recipeId }){
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const abortControllerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    useEffect(() => {
        if (!show || !recipeId) return;

        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        const fetchRecipeDetails = async () => {
            setLoading(true);
            try {
                const data = await getRecipeDetails(recipeId, { signal });
                setRecipe(data);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("Error al cargar los datos de la Receta", error);
                    await errorShowDetailsRecipe();
                    onHide();
                }
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchRecipeDetails();

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [show, recipeId, onHide]);

    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{ backgroundColor: '#176FA6' }}>
                        <h5 className="modal-title">Detalles de la Receta</h5>
                        <button 
                            type="button" 
                            className="btn-close btn-close-white" 
                            onClick={onHide}
                            disabled={loading}
                        ></button>
                    </div>
                    
                    <div className="modal-body">
                        {loading ? (
                            <div className="text-center py-4">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                                <p className="mt-2">Cargando detalles de la receta...</p>
                            </div>
                        ) : recipe ? (
                            <>
                                <div className="mb-4">
                                    <h5>Información General</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p><strong>Nombre de la Receta:</strong> {recipe.name || 'N/A'}</p>
                                            <p><strong>Cantidad del Producto:</strong> {recipe.yield_quantity}</p>
                                        </div>
                                    </div>
                                </div>

                                <h5 className="mb-3">Ingredientes de la Receta</h5>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Insumo</th>
                                                <th>Cantidad Requerida</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recipe.recipe_ingredients?.length > 0 ? (
                                                recipe.recipe_ingredients.map((ingredient, index) => (
                                                    <tr key={index}>
                                                        <td>{ingredient.input?.name || `Insumo ID: ${ingredient.input_id}`}</td>
                                                        <td>{ingredient.quantity_required}{ingredient?.input?.batch?.unit_converted}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="2" className="text-center">No hay ingredientes en esta receta</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ) : (
                            <div className="alert alert-warning">
                                No se encontraron datos de la Receta
                            </div>
                        )}
                    </div>
                    
                    <div className="modal-footer">
                        <button 
                            className="btn btn-secondary" 
                            onClick={onHide}
                            disabled={loading}
                        >
                            {loading ? 'Cerrar (cargando...)' : 'Cerrar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowRecipeModal;