import React from "react";

const StatsCards = ({stats, productionStats, inventoryValue}) => {
    const statItems = [
        {
            title: 'Ventas Totales',
            value: stats.cant_sales || 0,
            icon: 'bi-currency-dollar',
            color: 'primary',
            bg: 'bg-primary'
        },
        {
            title: 'Órdenes Totales',
            value: stats.total_orders || 0,
            icon: 'bi-cart',
            color: 'success',
            bg: 'bg-success'
        },
        {
            title: 'Usuarios',
            value: stats.total_users || 0,
            icon: 'bi-people',
            color: 'info',
            bg: 'bg-info'
        },
        {
            title: 'Productos',
            value: stats.total_products || 0,
            icon: 'bi bi-cup-hot',
            color: 'warning',
            bg: 'bg-warning'
        },
        {
            title: 'Producciones',
            value: stats.completed_productions || 0,
            icon: 'bi-gear',
            color: 'secondary',
            bg: 'bg-secondary'
        },
        {
            title: 'Valor Inventario',
            value: `$${inventoryValue.toLocaleString()}`,
            icon: 'bi-inboxes',
            color: 'dark',
            bg: 'bg-dark'
        }
    ];

    return(
        <div className="row">
            {statItems.map((item, index) => (
                <div key={index} className="col-md-6 col-lg-4 col-xl-2 mb-3">
                <div className={`card text-white ${item.bg} shadow-sm`}>
                    <div className="card-body py-2 px-3">
                    <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                        <h6 className="card-title small mb-1">{item.title}</h6>
                        <h5 className="card-text fw-bold mb-0">{item.value}</h5>
                        </div>
                        <div className="ms-3">
                        <i className={`bi ${item.icon} fs-3 opacity-50`}></i>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            ))}
        </div>
    );
}

export default StatsCards;