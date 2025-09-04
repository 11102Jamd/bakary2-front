import { useState } from "react";
import { createInput } from "../../../api/input";
import { errorCreateInput, succesCreateInput } from "../../../utils/alerts/inputAlerts";
import { validateName } from "../../../utils/validations/validationFields";

function CreateInputModal({onClose, onInputCreated}){
    const [newInput, setNewInput] = useState({
        name:'',
        category:''
    });

    const [errors, setErrors] = useState({});

    const validateFormInput = () => {
        const newErrors = {
            name: validateName(newInput.name, 'Nombre del insumo'),
            category: !newInput.category ? 'La categoria es requeirda' : null        };

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
                category:''
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
                            <label htmlFor="category" className="form-label">Categoria</label>
                            <select 
                                className={`form-control form-control-sm ${errors.category ? 'is-invalid' : ''}`} 
                                id="category"
                                value={newInput.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona una Categoria</option>
                                <option value="liquidos">Liquidos</option>
                                <option value="solidos contables">Solidos Contable</option>
                                <option value="solidos no contables">Solidos no Contable</option>
                            </select>
                            {errors.category && <div className="invalid-feedback">{errors.category}</div>}
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