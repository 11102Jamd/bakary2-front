import { useEffect, useState } from "react";
import { disableProduct, getProduct } from "../../../api/product";
import DataTable from "react-data-table-component";
import customStyles from "../../../utils/styles/customStyles";
import paginationOptions from "../../../utils/styles/paginationOptions";
import CreateProductModal from "./CreateProductModal";
import EditProductModal from "./EditProductModal";
import SupplyProductModal from "./SupplyProductModal";
import { errorDisableProduct, showConfirmDisableProduct, successDisableProduct } from "../../../utils/alerts/productAlerts";

function Product(){
    const [product, setProduct] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showSupplyModal, setShowSupplyModal] = useState(false);
    const [productSelected, setProductSelected] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        fetchProduct();
    }, []);


    const fetchProduct = async () => {
        try {
            setPending(true);
            const data = await getProduct();
            setProduct(data);
            setPending(false);
        } catch (error) {
            console.error("Error", error);
        } finally {
            setPending(false);
        };
    };

    const handleDisableProduct = async (id) => {
        const result = await showConfirmDisableProduct();
        if (result.isConfirmed) {
            try {
                await disableProduct(id);
                await successDisableProduct();
                await fetchProduct();
            } catch (error) {
                console.error("error al inhabilitar un producto", error);
                await errorDisableProduct();                
            };
        };
    };

    const columns = [
        {
            name: 'Producto',
            selector: row => `${row.id} ${row.name}`?? 'N/A',
            sortable: true,
            center: "true",
        },
        {
            name: 'Precio Unidad',
            selector: row => `${row.unit_price} COP`,
            sortable: true,
            center: "true"
        },
        {
            name: 'Stock Actual',
            selector: row => {
                if (!row.product_productions || row.product_productions.length === 0) {
                    return 'N/A';
                }
                
                // Encontrar el último lote con stock disponible
                const latestWithStock = [...row.product_productions]
                    .reverse()
                    .find(production => parseFloat(production.quantity_produced) > 0);
                
                return latestWithStock ? parseFloat(latestWithStock.quantity_produced).toFixed(3) : '0';
            },
            sortable: true,
            center: "true",
        },
        {
            name: 'Porcentaje de Ganancia',
            selector: row => {
                if (!row.product_productions || row.product_productions.length === 0) {
                    return 'N/A';
                }
                
                // Encontrar el último lote con stock disponible
                const latestWithStock = [...row.product_productions]
                    .reverse()
                    .find(production => parseFloat(production.profit_margin_porcentage) > 0);
                
                return latestWithStock ? (`${latestWithStock.profit_margin_porcentage} %`) : '0';
            },
            sortable: true,
            center: "true",
        },
        {
            name: 'Accion',
            cell: row => (
                <div className="btn-group" role="group">
                    <button
                    onClick={() => { handleDisableProduct(row.id)}}
                        className="btn btn-warning btn-sm rounded-2 p-2"
                        title="eliminar"
                    >
                        <i className="bi bi-lock-fill"></i> 
                    </button>

                    <button
                        onClick={()=> { setProductSelected(row);}}
                        className="btn btn-primary btn-sm ms-2 rounded-2 p-2"
                        style={{background:'#2DACD6'}}
                        title="editar"
                    >
                        <i className="bi bi-pencil-square fs-6"></i>
                    </button>
                    
                    <button
                        onClick={()=> {
                            setProductSelected(row);
                            setShowSupplyModal(true);
                        }}
                        className="btn btn-primary btn-sm ms-2 rounded-2 p-2"
                        style={{background:'#2DEACD'}}
                        title="Abastecer"
                    >
                        <i className="bi bi-plus"></i>    
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
                    <h1 className='h4'>Gestion de Productos</h1>
                </div>
                
                <div className='card-body p-4'>
                    <div className='d-flex justify-content-between mb-3'>
                        <button
                            onClick={() => setShowModal(true)}
                            className='btn btn-success'
                        >
                            <i className='bi bi-plus-circle'></i> Crear Producto
                        </button>
                    </div>

                    <DataTable
                        title="Lista de Productos"
                        columns={columns}
                        data={product}
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
                        noDataComponent={<div className="alert alert-info">No hay productos registrados</div>}
                    />
                </div>
            </div>
            {showModal && (
                <CreateProductModal
                        onClose={() => setShowModal(false)}
                        onProductCreated={fetchProduct}
                    />
                )}

            {productSelected && (
                <EditProductModal
                    product={productSelected}
                    onClose={() => setProductSelected(null)}
                    onProductUpdate={fetchProduct}
                />
            )}

            {showSupplyModal && productSelected && (
                <SupplyProductModal
                    product={productSelected}
                    onClose={() => {
                        setShowSupplyModal(false);
                        setProductSelected(null);
                    }}
                    onProductSupplied={fetchProduct}
                />
            )}
        </div>
    );
}

export default Product;