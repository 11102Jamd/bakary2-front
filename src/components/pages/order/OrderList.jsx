import { useEffect, useState } from "react";
import { deleteOrder, getOrder } from "../../../api/order";
import customStyles from "../../../utils/styles/customStyles";
import paginationOptions from "../../../utils/styles/paginationOptions";
import DataTable from "react-data-table-component";
import CreateOrderModal from "./CreateOrderModal";
import ShowOrder from "./ShowOrderModal"; // Importar el componente
import { errorDeleteOrder, showConfirmDeleteOrder, successDeleteOrder } from "../../../utils/alerts/orderAlerts";

function Order(){
    const [order, setOrder] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [orderSelected, setOrderSelected] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(()=>{
        fetchOrder();
    }, []);

    const fetchOrder = async() => {
        try {
            setPending(true);
            const data = await getOrder();
            setOrder(data);
            setPending(false);
        } catch (error) {
            console.error("error al obtener la lista de compras", error);
            setPending(false);
        };
    };

    const handleDeleteOrder = async (id) => {
        const result = await showConfirmDeleteOrder();
        if (result.isConfirmed) {
            try {
                await deleteOrder(id);
                await successDeleteOrder();
                await fetchOrder();
            } catch (error) {
                console.error("error al eliminar la orden de compra", error);
                await errorDeleteOrder();                
            };
        };
    };
    
    const columns = [
        {
            name: 'Proveedor',
            selector: row => row.supplier_name ?? 'N/A',
            sortable: true,
        },
        {
            name: 'Fecha de Orden',
            selector: row => row.order_date ?? 'N/A',
            sortable: true,
        },
        {
            name: 'Total',
            selector: row => row.order_total ?? 'N/A',
            sortable: true,
        },
        {
            name: 'Cant. Items',
            selector: row => row.batches ? row.batches.length : 0,
            sortable: true,
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className="btn-group" role="group">
                    <button 
                        onClick={() => handleDeleteOrder(row.id)}
                        className='btn btn-danger btn-sm rounded-2 p-2'
                        style={{background:'#D6482D'}}
                        title="Eliminar"
                    >
                        <i className="bi bi-trash fs-6"></i>
                    </button>
                    <button 
                        onClick={() => setOrderSelected(row)} 
                        className='btn btn-info btn-sm ms-2 rounded-2 p-2'
                        title="Ver Detalles"
                    >
                        <i className="bi bi-eye fs-6"></i>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
        },
    ];

    return(
        <div className='container-fluid mt-4'>
            <div className='card'>
                <div className='card-header text-white' style={{background:'#176FA6'}}>
                    <h1 className='h4'>Gestión de Órdenes de Compra</h1>
                </div>

                <div className='card-body p-4'>
                    <div className='d-flex justify-content-between mb-3'>
                        <button 
                            onClick={() => setShowModal(true)} 
                            className='btn btn-success'
                        >
                            <i className="bi bi-plus-circle"></i> Crear Orden
                        </button>
                    </div>

                    <DataTable
                        title="Lista de Órdenes de Compra"
                        columns={columns}
                        data={order}
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
                        noDataComponent={<div className="alert alert-info">No hay órdenes registradas</div>}
                    />
                </div>
            </div>

            {/* Modal de creación de Orden */}
            {showModal && (
                <CreateOrderModal
                    onClose={() => setShowModal(false)}
                    onOrderCreated={fetchOrder}
                />
            )}

            {/* Modal de Detalles de Orden - MANTIENE TU ESTRUCTURA */}
            {orderSelected && (
                <ShowOrder
                    show={true}
                    onHide={() => setOrderSelected(null)}
                    orderId={orderSelected.id}
                />
            )}
        </div>
    );
}
export default Order;