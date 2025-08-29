import { useEffect, useState } from "react";
import { getUserList } from "../../../api/user";
import DataTable from "react-data-table-component";
import customStyles from "../../../utils/styles/customStyles";
import paginationOptions from "../../../utils/styles/paginationOptions";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";


function User(){
    const [user, setUser] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [userSelected, setUserSelected] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            setPending(true);
            const data = await getUserList();
            setUser(data);
            setPending(false);
        } catch (error) {
            console.error("error al obtener la lista de usuarios", error);
            setPending(false);
        };
    };


    const columns = [
        {
            name:'Nombre',
            selector: row => `${row.id} ${row.name}`,
            sortable: true
        },
        {
            name:'rol',
            selector: row => row.rol,
            sortable: true
        },
        {
            name:'correo',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className="btn-group" role="group">
                    <button 
                        // onClick={() => handleDeleteUser(row.id)}
                        className='btn btn-danger btn-sm rounded-2 p-2'
                        title="Eliminar"
                    >
                        <i className="bi bi-trash fs-6"></i>
                    </button>
                    <button 
                        onClick={() => {
                            setUserSelected(row);
                        }} 
                        className='btn btn-primary btn-sm ms-2 rounded-2 p-2'
                        title="Editar"
                    >
                        <i className="bi bi-pencil-square fs-6"></i>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
        }
    ];

    return (
        <div className='container-fluid mt-4'>
            <div className='card'>
                <div className='card-header text-white' style={{background:'#176FA6'}}>
                    <h1 className='h4'>Gestión de Usuarios</h1>
                </div>

                <div className='card-body p-4'>
                    <div className='d-flex justify-content-between mb-3'>
                        <button 
                            onClick={() => setShowModal(true)} 
                            className='btn btn-success'
                        >
                            <i className="bi bi-plus-circle"></i> Crear Usuario
                        </button>
                    </div>

                    <DataTable
                        title="Lista de Usuarios"
                        columns={columns}
                        data={user}
                        pagination
                        paginationPerPage={5} 
                        paginationRowsPerPageOptions={[5, 10, 15, 20]} 
                        paginationComponentOptions={paginationOptions}
                        highlightOnHover
                        pointerOnHover
                        responsive
                        striped
                        customStyles={customStyles}
                        progressPending={pending}
                        progressComponent={<div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>}
                        noDataComponent={<div className="alert alert-info">No hay usuarios registrados</div>}
                    />
                </div>
            </div>

            {/* Modal de creación de Usuario*/}
            {showModal && (
                <CreateUserModal
                    onClose={() => setShowModal(false)}
                    onUserCreated={fetchUser}
                />
            )}

            {/* Modal de Edicion de Usuario */}
            {userSelected && (
                <EditUserModal
                    user={userSelected}
                    onClose={() => setUserSelected(null)}
                    onUserUpdated={fetchUser}
                />
            )}
        </div>
    );
}

export default User;