import React from "react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { disableRecipe, getRecipe } from "../../../api/recipe";
import paginationOptions from "../../../utils/styles/paginationOptions";
import customStyles from "../../../utils/styles/customStyles";
import CreateRecipeModal from "./CreateRecipeModal";
import ShowRecipeModal from "./ShowRecipeModal";
import EditRecipeModal from "./EditRecipeModal";
import { errorDisableRecipe, showConfirmDisableRecipe, successDisableRecipe } from "../../../utils/alerts/recipeAlert";
import { useAuth } from "../../context/AuthContext";


function Recipe(){
    const {user} = useAuth();

    if (!user) return null;

    const [recipe, setRecipe] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [recipeSelected, setRecipeSelected] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        fetchRecipe();
    }, []);

    const fetchRecipe = async() => {
        try {
            setPending(true);   
            const data = await getRecipe();
            setRecipe(data);
            setPending(false);
        } catch (error) {
            console.error("error al obtener la lista de Recetas", error);
            setPending(false);              
        };
    };

    const handleDisableRecipe = async(id) => {
        const result = await showConfirmDisableRecipe();
        if (result.isConfirmed) {
            try {
                await disableRecipe(id);
                await successDisableRecipe();
                await fetchRecipe();
            } catch (error) {
                console.error("error al inhabilitar la receta", error);
                await errorDisableRecipe();                
            };
        };
    };

    const columns = [
        {
            name:'Receta',
            selector: row => `${row.id} ${row.name}`,
            sortable: true,
            center: "true" 
        },
        {
            name:'Cantidad',
            selector: row => `${row.yield_quantity} unidades`,
            sortable: true,
            center: "true" 
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className="btn-group" role="group">
                    {user.rol === 'Administrador' && (
                        <button 
                            onClick={() => handleDisableRecipe(row.id)}
                            className='btn btn-warning btn-sm rounded-2 p-2'
                            title="Inhabilitar"
                        >
                            <i className="bi bi-lock-fill"></i>
                        </button>
                    )}
                    <button 
                        onClick={() => setRecipeSelected(row)} 
                        className='btn btn-info btn-sm ms-2 rounded-2 p-2'
                        title="Ver Detalles"
                    >
                        <i className="bi bi-eye fs-6"></i>
                    </button>
                    <button

                        onClick={()=> { 
                            setRecipeSelected(row);
                            setShowModal(true);
                        }}

                        className="btn btn-primary btn-sm ms-2 rounded-2 p-2"
                        style={{background:'#2DACD6'}}
                        title="editar"
                    >
                        <i className="bi bi-pencil-square fs-6"></i>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            center:"true"
        }
    ];

    return(
        <div className='container-fluid mt-4'>
            <div className='card'>
                <div className='card-header text-white' style={{background:'#176FA6'}}>
                    <h1 className='h4'>Gestión de Recetas</h1>
                </div>

                <div className='card-body p-4'>
                    <div className='d-flex justify-content-between mb-3'>
                        <button 
                            onClick={() => setShowModal(true)} 
                            className='btn btn-success'
                        >
                            <i className="bi bi-plus-circle"></i> Crear Receta
                        </button>
                    </div>

                    <DataTable
                        title="Lista de Recetas"
                        columns={columns}
                        data={recipe}
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
                        noDataComponent={<div className="alert alert-info">No hay recetas Registradas</div>}
                    />
                </div>
            </div>

            {showModal && (
                <CreateRecipeModal
                    onClose={() => setShowModal(false)}
                    onRecipeCreated={fetchRecipe}
                />
            )}

            {recipeSelected && (
                <ShowRecipeModal
                    show={true}
                    onHide={() => setRecipeSelected(null)}
                    recipeId={recipeSelected.id}
                />
            )}

            {showModal && recipeSelected && (
                <EditRecipeModal
                    recipeId={recipeSelected.id}
                    onClose={() => {
                        setShowModal(false);
                        setRecipeSelected(null);
                    }}
                    onRecipeUpdated={() => {
                        setShowModal(false);
                        setRecipeSelected(null);
                        fetchRecipe();
                    }}
                />
            )}
        </div>
    );
}

export default Recipe;