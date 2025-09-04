import React, { useState, useEffect } from 'react';
import {logout} from "../../../api/auth";
import StatsCards from '../dashboard/StatsCards';
import SalesChart from '../dashboard/SalesChart';
import UserDistributionChart from '../dashboard/UserDistributionChart';
import TopProductsChart from '../dashboard/TopProductsChart';
import OrdersChart from '../dashboard/OrderChart';
import DateFilter from '../dashboard/DateFilter';
import { 
    getDashboardStats,
    getInventoryValue, 
    getOrdersData, 
    getProductionStats, 
    getSalesData, 
    getTopProducts, 
    getUserStats 
} from '../../../api/dashboard';

const Welcome = () => {
    const [stats, setStats] = useState({});
    const [salesData, setSalesData] = useState([]);
    const [ordersData, setOrdersData] = useState([]);
    const [userStats, setUserStats] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [productionStats, setProductionStats] = useState({});
    const [inventoryValue, setInventoryValue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dateRange, setDateRange] = useState({
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Hace 30 días
        endDate: new Date()
    });

    useEffect(() => {
        fetchDashboardData();
    }, [dateRange]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);

            const formattedStartDate = dateRange.startDate.toISOString().split('T')[0];
            const formattedEndDate = dateRange.endDate.toISOString().split('T')[0];

            const [
                statsResponse, 
                salesResponse, 
                ordersResponse, 
                userResponse, 
                productsResponse,
                productionResponse,
                inventoryResponse
            ] = await Promise.all([
                getDashboardStats(),
                getSalesData(formattedStartDate, formattedEndDate),
                getOrdersData(formattedStartDate, formattedEndDate),
                getUserStats(),
                getTopProducts(),
                getProductionStats(formattedStartDate, formattedEndDate),
                getInventoryValue() 
            ]);

            setStats(statsResponse);
            setSalesData(salesResponse);
            setOrdersData(ordersResponse);
            setUserStats(userResponse);
            setTopProducts(productsResponse);
            setProductionStats(productionResponse);
            setInventoryValue(inventoryResponse.total_value || 0);

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setError(error.response?.data?.error || 'Error al cargar los datos del dashboard');
        } finally {
            setLoading(false);
        }
    };


        const handleDateChange = (startDate, endDate) => {
            setDateRange({ startDate, endDate });
        };

        const handleRefresh = () => {
            fetchDashboardData();
        };

    if (loading) {
        return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
        );
    }

    return (
        <div className="container-fluid mt-4">
            <div className="row mb-2">
                <div className="col-md-8">
                    <h3 className='mb-2'>Bienvenido a Pan Yuca Que Rico</h3>
                    <p className="text-muted small">
                        Sistema de gestión para registro de compras, pedidos y fabricación.
                    </p>
                </div>
                <div className="col-md-4 text-end">
                    <button className="btn btn-outline-primary me-2" onClick={handleRefresh}>
                        <i className="bi bi-arrow-clockwise"></i> Actualizar
                    </button>
                    <button className="btn btn-outline-danger" onClick={logout}>
                        <i className="bi bi-box-arrow-right me-1"></i> Cerrar sesión
                    </button>
                </div>
            </div>

            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {error}
                <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                </div>
            )}

            {/* Filtros de fecha */}
            <DateFilter onDateChange={handleDateChange} />

            {/* Tarjetas de estadísticas */}
            <StatsCards stats={stats} productionStats={productionStats} inventoryValue={inventoryValue} />

            {/* Gráficos principales */}
            <div className="row mt-1">
                <div className="col-sm-8">
                    <div className="card mb-2">
                        <div className="card-header bg-primary text-white py-1 px-2">
                            <h6 className="card-title mb-0 small">Ventas por Período</h6>
                        </div>
                        <div className="card-body p-1" style={{height:'200px'}}>
                            <SalesChart salesData={salesData} />
                        </div>
                    </div>

                    <div className="card mb-2">
                        <div className="card-header bg-success text-white py-1 px-2">
                            <h6 className="card-title mb-0 small">Órdenes por Período</h6>
                        </div>
                        <div className="card-body p-1" style={{height:'200px'}}>
                            <OrdersChart ordersData={ordersData} />
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card mb-2">
                        <div className="card-header bg-info text-white py-1 px-2">
                            <h6 className="card-title mb-0 small">Distribución de Usuarios</h6>
                        </div>
                        <div className="card-body p-1">
                            <UserDistributionChart userStats={userStats} />
                        </div>
                    </div>

                    <div className="card mb-2">
                        <div className="card-header bg-warning text-dark py-1 px-2">
                            <h6 className="card-title mb-0 small">Productos Más Vendidos</h6>
                        </div>
                        <div className="card-body p-1">
                            <TopProductsChart topProducts={topProducts} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Welcome;