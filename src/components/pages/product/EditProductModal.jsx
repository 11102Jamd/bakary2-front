import { useState } from "react";
import { validateName, validatePrice } from "../../../utils/validations/validationFields";
import { errorUpdateProduct, succesUpdateProduct } from "../../../utils/alerts/productAlerts";
import { updateProduct } from "../../../api/product";

function EditProductModal({product, onClose, onProductUpdate}){
    const [productUpdate, setProductUpdate] = useState(product);
    const [errors, setErrors] = useState({});

    const validateEditProductForm = () => {
        const newErrors = {
            name: validateName(productUpdate.name, 'Nombre del Producto'),
            unit_price: validatePrice(productUpdate.unit_price, 'Precio del Producto')
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== null);
    };

    const handleChange = (e) => {
        const {id, value} = e.target;
        setProductUpdate(prev => ({...prev, [id]: value}));

        let error = null;

        switch (id) {
            case 'name':
                error = validateName('Nombre del Producto');
                break;
            case 'unit_price':
                error => validatePrice('Precio del Producto')
            default:
                break;
        };
        setErrors(prev => ({...prev, [id]:error}));
    };

    const updateProductHandler = async() => {
        if (!validateEditProductForm()) {
            await errorUpdateProduct();
            return;            
        }
        try {
            await updateProduct(product.id, {
                name: productUpdate.name,
                unit_price: productUpdate.unit_price
            });
            await succesUpdateProduct();
            onProductUpdate();
            onClose();
        } catch (error) {
            console.error("error al actualizar el producto", error);
            await errorUpdateProduct();
        };
    };

    return(
        <div className="modal fade show" style={{display:'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{backgroundColor:' #176FA6'}}>
                        <h5 className="modal-title">Editar Producto</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Producto</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-sm ${errors.name ? 'is-invalid' : ''}`} 
                                id="name" 
                                value={productUpdate.name} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="unit_price" className="form-label">Precio Unitario</label>
                            <input 
                                type="number" 
                                className={`form-control form-control-sm ${errors.unit_price ? 'is-invalid' : ''}`} 
                                id="unit_price" 
                                value={productUpdate.unit_price} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.unit_price && <div className="invalid-feedback">{errors.unit_price}</div>}
                        </div>                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={updateProductHandler} style={{backgroundColor:' #176FA6'}}>
                            Actualizar Producto
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

export default EditProductModal;