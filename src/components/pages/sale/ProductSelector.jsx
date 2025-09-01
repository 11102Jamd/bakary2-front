import React, { useState, useEffect } from 'react';
import { getProduct } from '../../../api/product';
import { LoadingSpinner } from '../../Loading';

function ProductSelector({ currentProduct, onProductChange, onAddProduct }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProduct();
                setProducts(data);
            } catch (error) {
                console.error("Error cargando productos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="card mb-4">
                <div className="card-body text-center py-4">
                    <LoadingSpinner message="Cargando Productos"/>
                </div>
            </div>
        );
    }

    return (
        <div className="card mb-4">
            <div className="card-header bg-light">
                <h6 className="mb-0">Agregar Productos</h6>
            </div>
            <div className="card-body">
                <div className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="product_id" className="form-label">Producto</label>
                        <select 
                            className="form-select"
                            id="product_id"
                            name="product_id"
                            value={currentProduct.product_id}
                            onChange={onProductChange}
                            required
                        >
                            <option value="">Seleccione un producto</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="quantity_requested" className="form-label">Cantidad</label>
                        <input 
                            type="number" 
                            className="form-control"
                            id="quantity_requested"
                            name="quantity_requested"
                            value={currentProduct.quantity_requested}
                            onChange={onProductChange}
                            min="0.1"
                            step="0.1"
                            required
                        />
                    </div>
                    <div className="col-md-2 d-flex align-items-end">
                        <button 
                            onClick={onAddProduct} 
                            className="btn btn-primary w-100"
                            disabled={!currentProduct.product_id || !currentProduct.quantity_requested}
                        >
                            <i className="bi bi-plus-lg me-2"></i>Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductSelector;