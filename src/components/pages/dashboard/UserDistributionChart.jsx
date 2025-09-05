import React from "react";
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const UserDistributionChart = ({ userStats }) => {
    const data = {
        labels: userStats.map(item => item.rol),
        datasets: [
        {
            data: userStats.map(item => item.total),
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
        },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: true,
            text: 'Distribución de Usuarios por Rol'
        }
        }
    };

    return (
        <div className="chart-container" style={{height:'200px'}}>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default UserDistributionChart;