import { useState } from "react";
import { createInput } from "../../../api/input";
import { errorCreateInput, succesCreateInput } from "../../../utils/alerts/inputAlerts";
import { validateName } from "../../../utils/validations/validationFields";

function CreateInputModal({onClose, onInputCreated}){
    const [newInput, setNewInput] = useState({
        name:'',
        unit:''
    });

    const [errors, setErrors] = useState({});

    const validateFormInput = () => {
        const newErrors = {
            name: validateName(newInput.name, 'Nombre del insumo'),
            unit: !newInput.unit ? 'La unidad de medida es requerida' : null        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== null);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setNewInput(prev => ({ ...prev, [id]: value }));
        
        let error = null;
        switch(id) {
            case 'name':
                error = validateName(value, 'Nombre del Insumo');
                break;
            default:
                break;
        }
        setErrors(prev => ({ ...prev, [id]: error }));
    };

    const createInputHandler = async () => {
        if (!validateFormInput()) {
            errorCreateInput();
            return;
        }
        try {
            await createInput(newInput);
            await succesCreateInput();
            onInputCreated();
            onClose();
            setNewInput({
                name:'',
                unit:''
            });
        } catch (error) {
            console.error('error al crear el inusmo', error);
            await errorCreateInput();
        };
    };

    return(
        <div className="modal fade show" style={{display:'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{backgroundColor:' #176FA6'}}>
                        <h5 className="modal-title">Crear Insumo</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Insumo</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-sm ${errors.name ? 'is-invalid' : ''}`} 
                                id="name" 
                                value={newInput.name} 
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
                                value={newInput.unit}
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
                    <div className="modal-footer" style={{alignItems:'center'}}>
                        <button type="button" className="btn btn-primary" onClick={createInputHandler} style={{backgroundColor:' #176FA6'}}>
                            Guardar Insumo
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
export default CreateInputModal;