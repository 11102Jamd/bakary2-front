import React from "react";
import { useState } from "react";
import { validateEmail, validateName } from "../../../utils/validations/validationFields";
import { errorUpdateUser, succesUpdateUser } from "../../../utils/alerts/userAlerts";
import { updateUser } from "../../../api/user";

function EditUserModal({user, onClose, onUserUpdated}){
    const [userUpdate, setUserUpdate] = useState(user);
    const [errors, setErrors] = useState({});

    const validateUserEditForm = () => {
            const newErrors = {
                name: validateName(userUpdate.name, 'Nombre del Usuario'),
                name2: validateName(userUpdate.name2, 'Segundo Nombre del Usuario'),
                surname: validateName(userUpdate.surname, 'Primer Apellido'),
                surname2: validateName(userUpdate.surname2, 'Segundo Apellido'),
                email: validateEmail(userUpdate.email, 'Correo del Usuario'),
                rol: !userUpdate.rol ? 'Debe seleccionar un rol' : null,
            };
            setErrors(newErrors);
            return !Object.values(newErrors).some(error => error !== null);
        };
    
    
        const handleChange = (e) => {
            const { id, value } = e.target;  
            setUserUpdate(prev => ({ ...prev, [id]: value }));
    
            let error = null;
    
            switch (id) {
                case 'name': // 👈 tu input tiene id="name1", no "name"
                    error = validateName(value, 'Nombre del Usuario');
                    break;
                case 'name2':
                    error = validateName(value, 'Segundo Nombre del Usuario');
                    break;
                case 'surname': 
                    error = validateName(value, 'Apellido del Usuario');
                    break;
                case 'surname2':
                    error = validateName(value, 'Segundo Apellido del Usuario');
                    break;
                case 'rol':
                    error = value ? null : 'Debe seleccionar un rol';
                    break;
                case 'email':
                    error = validateEmail(value, 'correo del Usuario');
                    break;
                default:
                    break;
        }
        setErrors(prev => ({ ...prev, [id]: error }));
    };


    const updateUserHandler = async () => {
        if (!validateUserEditForm()) {
            await errorUpdateUser();
            return;
        }

        try {   
            await updateUser(user.id, {
                name: userUpdate.name,
                name2: userUpdate.name2,
                surname: userUpdate.surname,
                surname2: userUpdate.surname2,
                email: userUpdate.email,
                rol: userUpdate.rol
            });
            await succesUpdateUser();
            onUserUpdated();
            onClose();
        } catch (error) {
            console.error("error al editar el usuario: ", error);
            await errorUpdateUser();
        };
    };

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{backgroundColor:' #176FA6'}}>
                        <h5 className="modal-title">Editar Usuario</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {/*Campo Primer Nombre */}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-sm ${errors.name ? 'is-invalid' : ''}`} 
                                id="name" 
                                value={userUpdate.name} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name2" className="form-label">Segundo Nombre</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-sm ${errors.name2 ? 'is-invalid' : ''}`} 
                                id="name2" 
                                value={userUpdate.name2} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.name2 && <div className="invalid-feedback">{errors.name2}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="surname" className="form-label">Primer Apellido</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-sm ${errors.surname ? 'is-invalid' : ''}`} 
                                id="surname" 
                                value={userUpdate.surname} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.surname && <div className="invalid-feedback">{errors.surname}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="surname2" className="form-label">Segundo Apellido</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-sm ${errors.surname2 ? 'is-invalid' : ''}`} 
                                id="surname2" 
                                value={userUpdate.surname2} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.surname2 && <div className="invalid-feedback">{errors.surname2}</div>}
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">correo</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-sm ${errors.email ? 'is-invalid' : ''}`} 
                                id="email" 
                                value={userUpdate.email} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        {/*Option de Rol */}
                        <div className="mb-4">
                            <label htmlFor="rol" className="form-label">Rol</label>
                            <select 
                                className={`form-control form-control-sm ${errors.rol ? 'is-invalid' : ''}`} 
                                id="rol" 
                                value={userUpdate.rol} 
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona un rol</option>
                                <option value="Administrador">Administrador</option>
                                <option value="Panadero">Panadero</option>
                                <option value="Cajero">Cajero</option>
                            </select>
                            {errors.rol && <div className="invalid-feedback">{errors.rol}</div>}
                        </div>
                    </div>
                    <div className="modal-footer" style={{alignItems:'center'}}>
                        <button type="button" className="btn btn-primary" onClick={updateUserHandler} style={{backgroundColor:' #176FA6'}}>
                            Guardar Usuario
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
export default EditUserModal;