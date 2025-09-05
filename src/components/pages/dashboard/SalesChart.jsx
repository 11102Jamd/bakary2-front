import React from "react";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler 
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler 
);

const SalesChart = ({ salesData }) => {
    const data = {
        labels: salesData.map(item => {
            const date = new Date(item.date);
                return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
            }),
        datasets: [
            {
                label: 'Numero de Ventas',
                data: salesData.map(item => item.sales),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.2)',
                fill: true,
                tension: 0.4,
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio:false,
        plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Evolución de Ventas'
        }
        },
        scales: {
        y: {
            beginAtZero: true,
            title: {
            display: true,
            text: 'Monto ($)'
            }
        }
        }
    };

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default SalesChart;