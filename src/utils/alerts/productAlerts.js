import Swal from "sweetalert2";

/**
 * 
 * @returns Alertas de creacion de producto
 */
export const succesCreateProduct = () => {
    return Swal.fire({
        title:"Exito",
        text:"product creado con exito",
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

export const errorCreateProduct = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo crear el producto",
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

/**
 * 
 * @returns Alertas de Edicion de Insumo
 */
export const succesUpdateProduct = () => {
    return Swal.fire({
        title:"Exito",
        text:"producto actualizado con exito",
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

export const errorUpdateProduct = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo actualizar insumo",
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


/**
 * 
 * @returns Alertas de abasteceimiento de Producto
 */
export const successSupplyProduct = () => {
    return Swal.fire({
        title:"Exito",
        text:"producto abastecido con exito",
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

export const errorSupplyProduct = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo abastecer el producto",
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



/**
 * 
 * @returns Alertas de Inhabilit6ar Usuario
 */
export const showConfirmDisableProduct = () => {
    return Swal.fire({
        title:"¿Estas Seguro?",
        text: "El Producto que inhabilites no podras utilizarlo despues",
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

export const errorDisableProduct = () => {
    return Swal.fire({
        title:"Error",
        text:"No se pudo Inhabilitar el producto",
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

export const successDisableProduct = () => {
    return Swal.fire({
        title:"Exito",
        text:"Producto Inhabilitado con exito",
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