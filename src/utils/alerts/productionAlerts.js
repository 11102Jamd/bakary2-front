import Swal from "sweetalert2";

/**
 * 
 * @returns Alertas de creacion de produccion
 */
export const successCreateProduction = () => {
    return Swal.fire({
        title:"Exito",
        text:"Produccion creada con exito",
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

export const errorCreateProduction = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo crear la Produccion",
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
 * @returns Alerta de error al obtener los detalles de la produccion
 */
export const errorShowDetailsProduction = () => {
    return Swal.fire({
        title:"Error",
        text:"No se puedo traer la produccion con detalles",
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
 * @returns Alertas de eliminar la Produccion
 */
export const showConfirmDeleteProduction = () => {
    return Swal.fire({
        title:"¿Estas Seguro?",
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton:true,
        confirmButtonColor:'#176FA6',
        cancelButtonColor: '#f60606',
        confirmButtonText: 'Si, Eliminar',
        cancelButtonText: 'Cancelar',
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
    });
}

export const errorDeleteProduction = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo eliminar la produccion",
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

export const successDeleteProduction = () => {
    return Swal.fire({
        title:"Exito",
        text:"Produccion elimnada con exito",
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