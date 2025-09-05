import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet} from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import RoleBasedControl from './components/RoleBasedControl';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import MainContent from './components/layout/mainContent';
import Footer from './components/layout/Footer';
import Welcome from './components/pages/welcome/Welcome';
import Input from './components/pages/input/InputList';
import Product from './components/pages/product/ProductList';
import Login from './components/pages/auth/Login';
import User from './components/pages/user/UserList';
import Order from './components/pages/order/OrderList';
import Recipe from './components/pages/recipe/RecipeList';
import Sale from './components/pages/sale/SaleList';
import Production from './components/pages/production/ProductionList';
import ReportDownloader from './components/pages/report/ReportDownloader';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'
import ResetPassword from './components/pages/auth/ResetPassword';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/reset-password' element={<ResetPassword/>}/>
          <Route element={
            <PrivateRoute>
              <div className="app-container">
                <Sidebar />
                <div className="main-content-wrapper">
                  <Header />
                  <MainContent>
                    <Outlet />
                  </MainContent>
                  <Footer/>
                </div>
              </div>
            </PrivateRoute>
          }>
          <Route index element={<Navigate to="/welcome" replace />} />
          <Route path="/welcome" element={<Welcome />} />
          
          <Route path='/insumos' element={
            <RoleBasedControl allowedRoles={['Administrador', 'Panadero', 'Cajero']}>
              <Input></Input>
            </RoleBasedControl>
          }/>

          <Route path='/productos' element={
            <RoleBasedControl allowedRoles={['Administrador', 'Panadero', 'Cajero']}>
              <Product></Product>
            </RoleBasedControl>
          }/>

          <Route path='/usuarios' element={
            <RoleBasedControl allowedRoles={['Administrador']}>
              <User/>
            </RoleBasedControl>
          }/>
            
          <Route path='/compras' element={
            <RoleBasedControl allowedRoles={['Administrador', 'Cajero']}>
              <Order/>
            </RoleBasedControl>
          }/>

          <Route path='/ventas' element={
            <RoleBasedControl allowedRoles={['Administrador', 'Cajero']}>
              <Sale/>
            </RoleBasedControl>
          }/>

          <Route path='/recetas' element={
            <RoleBasedControl allowedRoles={['Administrador', 'Panadero']}>
              <Recipe/>
            </RoleBasedControl>
          }/>

          <Route path='/producciones' element={
            <RoleBasedControl allowedRoles={['Administrador', 'Panadero']}>
              <Production/>
            </RoleBasedControl>
          }/>

          <Route path='/reportes' element={
            <RoleBasedControl allowedRoles={['Administrador']}>
              <ReportDownloader/>
            </RoleBasedControl>
          }/>
          </Route>
          
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
