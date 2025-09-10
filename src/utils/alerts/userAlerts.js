import Swal from "sweetalert2";

/**
 * 
 * @returns Alertas de creaciond e Usuario
 */
export const succesCreateUser = () => {
    return Swal.fire({
        title:"Exito",
        text:"Usuario creado con exito",
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
        background: "#e6fff5",
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

export const errorCreateUser = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo crear el Usuario",
        icon:"error",
        background:"#fff",
        color:"#220900",
        width :'350px',
    });
};

/**
 * 
 * @returns Editar usuario
 */
export const succesUpdateUser = () => {
    return Swal.fire({
        title:"Exito",
        text:"Usuario editado con exito",
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
        background: "#e6fff5",
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

export const errorUpdateUser = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo editar el Usuario",
        icon:"error",
        background:"#fff",
        color:"#220900",
        width :'350px',
    });
};



/**
 * 
 * @returns Alertas de Inhabilit6ar Usuario
 */
export const showConfirmDisableUser = () => {
    return Swal.fire({
        title:"¿Estas Seguro?",
        text: "El usuario que inhabilites no accedera despues",
        icon: 'warning',
        showCancelButton:true,
        confirmButtonColor:'#176FA6',
        cancelButtonColor: '#f60606',
        confirmButtonText: 'Si, Inhabilitar',
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
        background:"#Afffff",
        color:"#220900",
    });
}

export const errorDisableUser = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo deshabilitar el Usuario",
        icon:"error",
        background:"#fff",
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

export const successDisableUser = () => {
    return Swal.fire({
        title:"Exito",
        text:"Usuario Deshabilitado con exito",
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
        iconColor: '#77EE74',  
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