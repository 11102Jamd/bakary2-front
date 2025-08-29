import Swal from "sweetalert2";

/**
 * 
 * @returns Alertas de creacion de Insumo
 */
export const succesCreateInput = () => {
    return Swal.fire({
        title:"Exito",
        text:"Insumo creado con exito",
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

export const errorCreateInput = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo crear el insumo",
        icon:"error",
        background:"#e6fff5",
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
 * @returns Alertas de Edicion de Insumo
 */
export const succesUpdateInput = () => {
    return Swal.fire({
        title:"Exito",
        text:"Insumo actualizado con exito",
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

export const errorUpdateInput = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo actualizar insumo",
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