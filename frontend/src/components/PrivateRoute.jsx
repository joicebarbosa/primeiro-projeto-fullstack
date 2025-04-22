import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const isAuthenticated = localStorage.getItem('authToken');
    console.log('Is authenticated (value):', isAuthenticated); // Veja o valor exato
    console.log('Is authenticated (boolean):', !!isAuthenticated); // Veja a conversão para booleano
    return isAuthenticated === null ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;