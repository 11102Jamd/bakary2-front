import { useState } from "react";
import { validateEmail, validateName } from "../../../utils/validations/validationFields";
import { errorCreateUser, succesCreateUser } from "../../../utils/alerts/userAlerts";
import { createUser } from "../../../api/user";

function CreateUserModal({onClose, onUserCreated}){
    const [newUser, setNewUser] = useState({
        name:'',
        name2:'',
        surname:'',
        surname2:'',
        email:'',
        rol:'',
        password:''
    });

    const [errors, setErrors] = useState({});

    const validateUserForm = () => {
        const newErrors = {
            name: validateName(newUser.name, 'Nombre del Usuario'),
            name2: validateName(newUser.name2, 'Segundo Nombre'),
            surname: validateName(newUser.surname, 'Primer apellido'),
            surname2: validateName(newUser.surname2, 'Segundo Apellido'),
            email: validateEmail(newUser.email, 'Correo del Usuario'),
            rol: !newUser.rol ? 'Debe seleccionar un rol' : null,
            password: !newUser.password ? 'La contraseña es requerida' : null
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== null);
    };


    const handleChange = (e) => {
        const { id, value } = e.target;  
        setNewUser(prev => ({ ...prev, [id]: value }));

        let error = null;

        switch (id) {
            case 'name': // 👈 tu input tiene id="name1", no "name"
                error = validateName(value, 'Nombre del Usuario');
                break;
            case 'name2':
                error = validateName(value, 'Nombre del Usuario');
                break;
            case 'surname': 
                error = validateName(value, 'Nombre del Usuario');
                break;
            case 'surname2':
                error = validateName(value, 'Nombre del Usuario');
                break;
            case 'rol':
                error = value ? null : 'Debe seleccionar un rol';
                break;
            case 'email':
                error = validateEmail(value, 'correo del Usuario');
                break;
            case 'password':
                error = value ? null : 'Debe crear una contraseña';
                break;
            default:
                break;
        };
        
        setErrors(prev => ({ ...prev, [id]: error }));
    };



    const createUserHandler = async () => {
        if (!validateUserForm()) {
            await errorCreateUser();
            return;
        }
        try {
            await createUser(newUser);
            await succesCreateUser();
            onUserCreated();
            onClose();

            setNewUser({
                name:'',
                name2:'',
                surname:'',
                surname2:'',
                email:'',
                rol:'',
                password:''
            });
        } catch (error) {
            console.error("error al crear el usuario");
            await errorCreateUser();
        }
    };


    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{backgroundColor:' #176FA6'}}>
                        <h5 className="modal-title">Crear Nuevo Usuario</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {/*Campo Primer Nombre */}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Primer Nombre</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-sm ${errors.name ? 'is-invalid' : ''}`} 
                                id="name" 
                                value={newUser.name} 
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
                                value={newUser.name2} 
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
                                value={newUser.surname} 
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
                                value={newUser.surname2} 
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
                                value={newUser.email} 
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
                                value={newUser.rol} 
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

                        {/*Campo Contraseña */}
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input 
                                type="password" 
                                className={`form-control form-control-sm ${errors.rol ? 'is-invalid' : ''}`} 
                                id="password" 
                                value={newUser.password} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="modal-footer" style={{alignItems:'center'}}>
                        <button type="button" className="btn btn-primary" onClick={createUserHandler} style={{backgroundColor:' #176FA6'}}>
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
export default CreateUserModal;