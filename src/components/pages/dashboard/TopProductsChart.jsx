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

const TopProductsChart = ({ topProducts }) => {
    const data = {
        labels: topProducts.map(item => item.name),
        datasets: [
        {
            label: 'Cantidad Vendida',
            data: topProducts.map(item => item.total_sold),
            backgroundColor: 'rgba(255, 159, 64, 0.7)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
        },
        ],
    };

    const options = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: true,
            text: 'Top 5 Productos Más Vendidos'
        }
        },
        scales: {
        x: {
            beginAtZero: true,
            title: {
            display: true,
            text: 'Unidades Vendidas'
            }
        }
        }
    };

    return (
        <div className="chart-container" style={{height:'200px'}}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default TopProductsChart;