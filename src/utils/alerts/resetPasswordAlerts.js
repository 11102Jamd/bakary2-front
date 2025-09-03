import Swal from "sweetalert2";

export const successResetPassword = () => {
    return Swal.fire({
        title: "Éxito",
        text: "Contraseña actualizada correctamente",
        icon: "success",
        showClass: {
            popup: `animate__animated animate__fadeInUp animate__faster`
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster'
        },
        width: '350px',
        background: "#e6fff5",
        color: "#220900",
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

export const errorResetPassword = (message = "Error al cambiar la contraseña") => {
    return Swal.fire({
        title: "Error",
        text: message,
        icon: "error",
        background: "#fff",
        color: "#220900",
        width: '350px',
        confirmButtonText: "Entendido",
        confirmButtonColor: "#dc3545",
        customClass: {
            popup: "my-swal-popup",
            title: "my-swal-title",
            htmlContainer: "my-swal-text",
            confirmButton: "my-swal-button",
        }
    });
};