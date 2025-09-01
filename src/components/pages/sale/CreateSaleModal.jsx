import React, { useState } from 'react';
import { createSale } from "../../../api/sale";
import { successCreateSale, errorCreateSale } from '../../../utils/alerts/saleAlerts';
import ProductSelector from './ProductSelector';
import SaleProductsTable from './SaleProductsTable';
import { useAuth } from '../../context/AuthContext';

function CreateSaleModal({ onClose, onSaleCreated }) {
    const { user } = useAuth(); // Obtener el usuario autenticado
    const [sale, setSale] = useState({
        sale_date: new Date().toISOString().split('T')[0],
        products: []
    });

    const [currentProduct, setCurrentProduct] = useState({
        product_id: '',
        quantity_requested: ''
    });

    const [loading, setLoading] = useState(false);

    const addProduct = () => {
        if (!currentProduct.product_id || !currentProduct.quantity_requested) {
            return;
        }

        const newProduct = {
            product_id: parseInt(currentProduct.product_id),
            quantity_requested: parseFloat(currentProduct.quantity_requested)
        };

        setSale(prev => ({ 
            ...prev, 
            products: [...prev.products, newProduct] 
        }));

        setCurrentProduct({
            product_id: '',
            quantity_requested: ''
        });
    };

    const removeProduct = (index) => {
        const updatedProducts = [...sale.products];
        updatedProducts.splice(index, 1);
        setSale({ ...sale, products: updatedProducts });
    };

    const handleProductChange = (e) => {
        setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!user || !user.id || sale.products.length === 0) {
            return;
        }

        setLoading(true);
        try {
            // Incluir el ID del usuario autenticado
            const saleData = {
                ...sale,
                user_id: user.id
            };
            
            await createSale(saleData);
            await successCreateSale();
            onSaleCreated?.();
            onClose();
        } catch (error) {
            console.error("Error al crear venta:", error);
            await errorCreateSale(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{backgroundColor:' #176FA6'}}>
                        <h5 className="modal-title">Registrar Venta</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {/* Información del vendedor autenticado */}
                        <div className="mb-4">
                            <label className="form-label">Vendedor</label>
                            <input
                                type="text"
                                className="form-control"
                                value={user ? `${user.name}` : 'No autenticado'}
                                disabled
                            />
                            <small className="form-text text-muted">
                                Usted está registrado como el vendedor de esta venta
                            </small>
                        </div>

                        {/* Selector de productos */}
                        <ProductSelector 
                            currentProduct={currentProduct}
                            onProductChange={handleProductChange}
                            onAddProduct={addProduct}
                        />

                        {/* Tabla de productos de la venta */}
                        <SaleProductsTable 
                            products={sale.products}
                            onRemoveProduct={removeProduct}
                        />
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={handleSubmit}
                            disabled={sale.products.length === 0 || !user}
                            style={{background:'#176FA6'}}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    Guardando...
                                </>
                            ) : 'Registrar Venta'}
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

export default CreateSaleModal;