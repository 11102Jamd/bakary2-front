import React from "react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import customStyles from "../../../utils/styles/customStyles";
import paginationOptions from "../../../utils/styles/paginationOptions";
import { deleteProduction, getProduction } from "../../../api/production";
import CreateProductionModal from "./CreateProductionModal";
import ShowProductionDetails from "./ShowProductionDetails";
import { errorDeleteProduction, showConfirmDeleteProduction, successDeleteProduction } from "../../../utils/alerts/productionAlerts";
import { useAuth } from "../../context/AuthContext";
import NumberFormatter from "../../NumberFormatter";

function Production(){
    const {user} = useAuth();

    if(!user) return null;

    const [production, setProduction] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [productionSelected, setProductionSelected] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        fetchProduction();
    }, []);


    const fetchProduction = async () => {
        try {
            setPending(true);
            const data = await getProduction();
            setProduction(data);
            setPending(false);
        } catch (error) {
            console.error("Error", error);
        } finally {
            setPending(false);
        };
    };


    const handleDeleteProduction = async (id) => {
        const result = await showConfirmDeleteProduction();
        if (result.isConfirmed) {
            try {
                await deleteProduction(id);
                await successDeleteProduction();
                await fetchProduction();
            } catch (error) {
                console.error("error al eliminar la produccion", error);
                await errorDeleteProduction();
            };
        };
    };

    const columns = [
        {
            name: 'Production',
            selector: row => `${row.id} ${row.recipe?.name}` || 'N/A',
            sortable:true,
            center:"true",
        },
        {
            name: 'Precio por Producto',
            sortable: true,
            center: "true",
            cell: row => {
                return(
                    <NumberFormatter value={row.price_for_product} prefix="$"/>
                );
            }
        },
        {
            name: 'Costo de Produccion',
            sortable: true,
            center: "true",
            cell: row => {
                return(
                    <NumberFormatter value={row.total_cost} prefix="$" suffix="COP"/>
                );
            }
        },
        {
            name: 'Fecha de Produccion',
            selector: row => row.production_date ?? 'N/A',
            sortable: true,
            center: "true"
        },
        {
            name: 'Accion',
            cell: row => (
                <div className="btn-group" role="group">
                    {user.rol === 'Administrador' && (
                        <button 
                            onClick={() => handleDeleteProduction(row.id)}
                            className='btn btn-danger btn-sm rounded-2 p-2'
                            style={{background:'#D6482D'}}
                            title="Eliminar"
                        >
                            <i className="bi bi-trash fs-6"></i>
                        </button>
                    )}
                    
                    <button 
                        onClick={() => setProductionSelected(row)} 
                        className='btn btn-info btn-sm ms-2 rounded-2 p-2'
                        style={{background:'#2DACD6'}}
                        title="Ver Detalles"
                    >
                        <i className="bi bi-eye fs-6"></i>
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
                    <h1 className='h4'>Gestion de Produccion</h1>
                </div>
                
                <div className='card-body p-4'>
                    <div className='d-flex justify-content-between mb-3'>
                        <button
                            onClick={() => setShowModal(true)}
                            className='btn btn-success'
                        >
                            <i className='bi bi-plus-circle'></i> Crear Produccion
                        </button>
                    </div>

                    <DataTable
                        title="Lista de Producciones"
                        columns={columns}
                        data={production}
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
                        noDataComponent={<div className="alert alert-info">No hay producciones registradas</div>}
                    />
                </div>
            </div>
            {showModal && (
                <CreateProductionModal
                    onClose={() => setShowModal(false)}
                    onProductionCreated={fetchProduction}
                />
            )}

            {productionSelected && (
                <ShowProductionDetails
                    show={true}
                    onHide={() => setProductionSelected(null)}
                    productionId={productionSelected.id}
                />
            )}
            
        </div>
    );
}

export default Production;