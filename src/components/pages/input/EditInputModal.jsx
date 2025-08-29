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
            unit: !inputUpdate.unit ? 'La unidad de medida es requerida' : null  
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
            case 'unit':
                error = !inputUpdate.unit ? 'La unidad de medida es requerida' : null 
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
                unit:inputUpdate.unit
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
                        <h5 className="modal-title">Editar Insumo</h5> {/* Corregido el título */}
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
                            <label htmlFor="unit" className="form-label">Unidad de Medida</label>
                            <select 
                                className={`form-control form-control-sm ${errors.unit ? 'is-invalid' : ''}`} 
                                id="unit"
                                value={inputUpdate.unit}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona una Unidad</option>
                                <option value="kg">kilogramos</option>
                                <option value="lb">Libras</option>
                                <option value="l">Litros</option>
                                <option value="un">unidad</option>
                                <option value="g">gramos</option>
                            </select>
                            {errors.unit && <div className="invalid-feedback">{errors.unit}</div>}
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