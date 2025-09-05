import React from "react";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const OrdersChart = ({ ordersData }) => {
    const data = {
        labels: ordersData.map(item => {
            const date = new Date(item.date);
            return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
        }),
        datasets: [
            {
                label: 'Número de Órdenes',
                    data: ordersData.map(item => item.orders),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: 0,
        },
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Órdenes por Día' }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: 'Cantidad' }
            }
        }
    };

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <Bar data={data} options={{ ...options, maintainAspectRatio: false }} />
        </div>
    );
};

export default OrdersChart;