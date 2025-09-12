import React from "react";
import { useEffect, useState } from "react";
import { deleteSale, getSale } from "../../../api/sale";
import customStyles from "../../../utils/styles/customStyles";
import paginationOptions from "../../../utils/styles/paginationOptions";
import DataTable from "react-data-table-component";
import CreateSaleModal from "./CreateSaleModal";
import ShowSale from "./ShowSaleModal";
import { errorDeleteSale, showConfirmDeleteSale, successDeleteSale } from "../../../utils/alerts/saleAlerts";
import { useAuth } from "../../context/AuthContext";
import NumberFormatter from "../../NumberFormatter";

function Sale(){
    const {user} = useAuth();

    if (!user) return null;

    const [sale, setSale] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [saleSelected, setSaleSelected] = useState(null);
    const [pending, setPending] = useState(true);


    useEffect(() => {
        fetchSale();
    }, []);

    const fetchSale = async () => {
        try {
            setPending(true);
            const data = await getSale();
            setSale(data);
            setPending(false)
        } catch (error) {
            console.error("error al obtener la lista de ventas", error);
            setPending(false);            
        };
    };

    const handleDeleteSale = async (id) => {
        const result = await showConfirmDeleteSale();
        if (result.isConfirmed) {
            try {
                await deleteSale(id);
                await successDeleteSale();
                await fetchSale();
            } catch (error) {
                console.error("error al eliminar la orden de compra", error);
                await errorDeleteSale();                
            };
        };
    };

    const columns = [
        {
            name:'Venta N°',
            selector: row => row.id,
            center: "true"
        },
        {
            name: 'Vendedor',
            selector: row => row.user?.name ?? 'N/A',
            sortable: true,
            center: "true"
        },
        {
            name: 'Fecha de Venta',
            selector: row => row.sale_date ?? 'N/A',
            sortable: true,
            center: "true"
        },
        {
            name: 'Total',
            sortable: true,
            center: "true",
            cell: row => {
                return (
                    <NumberFormatter value={row.sale_total} prefix="$" suffix="COP"/>
                );
            }
        },
        {
            name: 'Cant. Productos',
            selector: row => row.sale_products ? row.sale_products.length : 0,
            sortable: true,
            center: "true"
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className="btn-group" role="group">
                    {user.rol === 'Administrador' && (
                        <button 
                            onClick={() => handleDeleteSale(row.id)}
                            className='btn btn-danger btn-sm rounded-2 p-2'
                            style={{background:'#D6482D'}}
                            title="Eliminar"
                        >
                            <i className="bi bi-trash fs-6"></i>
                        </button>
                    )}
                    
                    <button 
                        onClick={() => setSaleSelected(row)} 
                        className='btn btn-info btn-sm ms-2 rounded-2 p-2'
                        title="Ver Detalles"
                    >
                        <i className="bi bi-eye fs-6"></i>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            center: "true"
        },
    ];

    return(
        <div className='container-fluid mt-4'>
            <div className='card'>
                <div className='card-header text-white' style={{background:' #176FA6'}}>
                    <h1 className='h4'>Gestión de Ventas</h1>
                </div>

                <div className='card-body p-4'>
                    <div className='d-flex justify-content-between mb-3'>
                        <button 
                            onClick={() => setShowModal(true)} 
                            className='btn btn-success'
                        >
                            <i className="bi bi-plus-circle"></i> Registrar Venta
                        </button>
                    </div>

                    <DataTable
                        title="Lista de Ventas"
                        columns={columns}
                        data={sale}
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
                        progressComponent={<div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>}
                        noDataComponent={<div className="alert alert-info">No hay ventas registradas</div>}
                    />
                </div>
            </div>

            {/* Modal de creación de Venta */}
            {showModal && (
                <CreateSaleModal
                    onClose={() => setShowModal(false)}
                    onSaleCreated={fetchSale}
                />
            )}

            {/* Modal de Detalles de Venta */}
            {saleSelected && (
                <ShowSale
                    show={true}
                    onHide={() => setSaleSelected(null)}
                    saleId={saleSelected.id}
                />
            )}
        </div>
    );

}

export default Sale;