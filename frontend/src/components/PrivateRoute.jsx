// frontend/src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const isAuthenticated = localStorage.getItem('accessToken'); // Obtém o token salvo com a chave 'accessToken'
    
    console.log('PrivateRoute.jsx: Is authenticated (value):', isAuthenticated); 
    console.log('PrivateRoute.jsx: Is authenticated (boolean):', !!isAuthenticated); 

    // Se isAuthenticated for verdadeiro (ou seja, se houver um token), renderiza o Outlet (componente filho).
    // Caso contrário, redireciona para a página de login. O 'replace' impede que o usuário volte para a página protegida pelo histórico do navegador.
    return !!isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;