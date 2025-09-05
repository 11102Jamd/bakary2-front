import React from "react";
import { useState } from "react";
import { validateName } from "../../../utils/validations/validationFields";
import { errorUpdateInput, succesUpdateInput } from "../../../utils/alerts/inputAlerts";
import { updateInput } from "../../../api/input";

function EditInputModal({input, onClose, onInputUpdated}){
    const [inputUpdate, setInputUpdate] = useState(input);
    const [errors, setErrors] = useState({});

    const validateFormEditInput = () => {
        const newErrors = {
            name: validateName(inputUpdate.name, 'Nombre del insumo'),
            category: !inputUpdate.category ? 'La categoria es requerida' : null  
        };

        setErrors(newErrors);
        
        return !Object.values(newErrors).some(error => error !== null);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setInputUpdate(prev => ({ ...prev, [id]: value }));
        
        let error = null;
        switch(id) {
            case 'name':
                error = validateName(value, 'Nombre del Insumo');
                break;
            case 'category':
                error = !inputUpdate.category ? 'La categoria es requerida' : null 
                break;
            default:
                break;
        }
        setErrors(prev => ({ ...prev, [id]: error }));
    };

    const updateInputHandler = async () => {
        if (!validateFormEditInput()) {
            await errorUpdateInput();
            return;
        }

        try {
            await updateInput(input.id, {
                name:inputUpdate.name,
                category:inputUpdate.category
            });
            await succesUpdateInput();
            onInputUpdated();
            onClose();
        } catch (error) {
            console.error('Error al actualizar el insumo', error);
            await errorUpdateInput();
        };
    };

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{ backgroundColor: '#176FA6' }}>
                        <h5 className="modal-title">Editar Insumo</h5> 
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Insumo</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-sm ${errors.name ? 'is-invalid' : ''}`} 
                                id="name" 
                                value={inputUpdate.name} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Categoria</label>
                            <select 
                                className={`form-control form-control-sm ${errors.category ? 'is-invalid' : ''}`} 
                                id="category"
                                value={inputUpdate.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona una Categoria</option>
                                <option value="liquidos">Liquidos</option>
                                <option value="solidos contables">Solido Contable</option>
                                <option value="solidos no contables">Solido no Contable</option>
                            </select>
                            {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={updateInputHandler} 
                            style={{ backgroundColor: '#176FA6' }}
                        >
                            Guardar Cambios
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

export default EditInputModal;