import React from "react";
import DataTable from "react-data-table-component";
import paginationOptions from "../../../utils/styles/paginationOptions";
import customStyles from "../../../utils/styles/customStyles";
import { useEffect, useState } from "react";
import { disableInput, getInput } from "../../../api/input";
import CreateInputModal from "./CreateInputModal";
import EditInputModal from "./EditInputModal";
import { errorDisableInput, showConfirmDisableInput, successDisableInput } from "../../../utils/alerts/inputAlerts";
import { useAuth } from "../../context/AuthContext";
import NumberFormatter from "../../NumberFormatter";

function Input(){
    const {user} = useAuth();

    if (!user) return null;

    const [input, setInput] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [inputSelected, setInputSelected] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        fetchInput();
    }, []);

    const fetchInput = async () => {
        try {
            setPending(true);
            const data = await getInput();
            setInput(data);
            setPending(false);
        } catch (error) {
            console.error('Error al mostrar todos los Insumos: ', error);
            setPending(false);
        }
    };

    const handleDisableInput = async (id) => {
        const result = await showConfirmDisableInput();
        if (result.isConfirmed) {
            try {
                await disableInput(id);
                await successDisableInput();
                await fetchInput();
            } catch (error) {
                console.error("error al inhabilitar el insumo",error);
                await errorDisableInput();                
            }
        };
    };

    const getCurrentBatch = (input) =>
        input?.batches?.find(b => parseFloat(b.quantity_remaining) > 0) || null;

    const columns = [
        {
            name: 'Insumo',
            selector: row => row.name,
            sortable: true,
        },
        {
            name:'Categoria',
            selector: row => row.category,
            sortable: true,
            center: "true"
        },
        {
            name: "Stock Actual",
            sortable: true,
            center: "true",
            cell: row => {
                const batch = getCurrentBatch(row);
                const stock = parseInt(batch?.quantity_remaining) || 0;
                const unit = batch?.unit_converted || "";
                return (
                    <div className={`text-center ${stock === 0 ? "text-danger fw-bold" : ""}`}>
                        {stock.toFixed(2)} {unit}
                    </div>
                );
            }
        },
        {
            name: "Precio Actual",
            selector: row => {
                const price = parseFloat(getCurrentBatch(row)?.unit_price);
                return isNaN(price) ? "N/A" : <NumberFormatter value={price} prefix="$" suffix="COP"/>;
            },
            sortable: true,
            center: "true",
        },
        {
            name: "N° Lote",
            selector: row => `#${getCurrentBatch(row)?.batch_number || "N/A"}`,
            sortable: true,
            center: "true",
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className="btn-group" role="group">
                    {user.rol === 'Administrador' && (
                        <button 
                            onClick={() => handleDisableInput(row.id)} 
                            className='btn btn-warning btn-sm rounded-2 p-2'
                            title="Inhabilitar"
                        >
                            <i className="bi bi-lock-fill"></i>  
                        </button>
                    )}

                    <button 
                        onClick={() => { setInputSelected(row);}} 
                        className='btn btn-primary btn-sm ms-2 rounded-2 p-2'
                        style={{background:'#2DACD6'}}
                        title="Editar"
                    >
                        <i className="bi bi-pencil-square fs-6"></i>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            center: "true"
        }
    ];

    return(
        <div className='container-fluid mt-4'>
            <div className='card'>
                <div className='card-header text-white' style={{background:'#176FA6'}}>
                    <h1 className='h3'>Gestión de Insumos</h1>
                </div>

                <div className='card-body p-4'>
                    <div className='d-flex justify-content-between mb-3'>
                        {(user.rol === 'Administrador' || user.rol === 'Panadero') && (
                            <button 
                                onClick={() => setShowModal(true)} 
                                className='btn btn-success'
                            >
                                <i className="bi bi-plus-circle"></i> Crear Insumo
                            </button>
                        )}
                    </div>

                    <DataTable
                        title="Lista de Insumos"
                        columns={columns}
                        data={input}
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
                        noDataComponent={<div className="alert alert-info">No hay insumos registrados</div>}
                    />
                </div>
            </div>

            {showModal && (
                <CreateInputModal
                    onClose={() => setShowModal(false)}
                    onInputCreated={fetchInput}
                />
            )}

            {inputSelected && (
                <EditInputModal
                    input={inputSelected}
                    onClose={() => setInputSelected(null)}
                    onInputUpdated={fetchInput}
                />
            )}
        </div>
    );
}

export default Input;