import { logout } from "../../../api/auth";

function Welcome(){
    return(
        <div>
            <div>
                <h1>Bienvenido a Pan Yuca Que Rico</h1>
            </div>
            <div>
                <p>
                    Este es un software que va ayudar al registro de compras
                    Pedidos y fabricacion, sin embargo tenga en cuenta que dependiendo
                    el rol de que se le ha asignado ahi funciones a las que puede o acceder
                </p>
            </div>
            <button className="dropdown-item" onClick={logout}>
                <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
            </button>
        </div>
    );
}
export default Welcome;