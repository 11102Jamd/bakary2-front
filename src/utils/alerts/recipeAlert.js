import Swal from "sweetalert2";

/**
 * 
 * @returns Alertas de creacion de producto
 */
export const successCreateRecipe = () => {
    return Swal.fire({
        title:"Exito",
        text:"Receta creada con exito",
        icon:"success",
        showClass: {
            popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
            `
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster'
        },
        width :'350px',
        background:"#e6fff5",
        color:"#220900",
        iconColor: '#77EE74',  // color del círculo del ícono
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#04A1FF",
        customClass: {
            popup: "my-swal-popup",
            title: "my-swal-title",
            htmlContainer: "my-swal-text",
            confirmButton: "my-swal-button",
        }
    });
};

export const errorCreateRecipe = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo crear la Receta",
        icon:"error",
        background:"#Afffff",
        color:"#220900",
        width :'350px',
        customClass: {
            popup: "my-swal-popup",
            title: "my-swal-title",
            htmlContainer: "my-swal-text",
            confirmButton: "my-swal-button",
        }
    });
};

/**
 * 
 * @returns Alerta de error al obtener los dealles
 */
export const errorShowDetailsRecipe = () => {
    return Swal.fire({
        title:"Error",
        text:"No se puedo traer la receta con detalles",
        icon:"error",
        background:"#Afffff",
        color:"#220900",
        width :'350px',
        customClass: {
            popup: "my-swal-popup",
            title: "my-swal-title",
            htmlContainer: "my-swal-text",
            confirmButton: "my-swal-button",
        }
    });
};


/**
 * 
 * @returns Alertas de edicion de Receta
 */
export const successUpdateRecipe = () => {
    return Swal.fire({
        title:"Exito",
        text:"Receta editada con exito",
        icon:"success",
        showClass: {
            popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
            `
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster'
        },
        width :'350px',
        background:"#e6fff5",
        color:"#220900",
        iconColor: '#77EE74',  // color del círculo del ícono
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#04A1FF",
        customClass: {
            popup: "my-swal-popup",
            title: "my-swal-title",
            htmlContainer: "my-swal-text",
            confirmButton: "my-swal-button",
        }
    });
};

export const errorUpdateRecipe = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo editar la Receta",
        icon:"error",
        background:"#Afffff",
        color:"#220900",
        width :'350px',
        customClass: {
            popup: "my-swal-popup",
            title: "my-swal-title",
            htmlContainer: "my-swal-text",
            confirmButton: "my-swal-button",
        }
    });
};