import React from 'react';
import {   Navigate, Outlet } from 'react-router-dom';



const Protectedroute: React.FC = () => {
    const isAuthenticated = !!sessionStorage.getItem('userDetails'); // Check if user is authenticated

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <>
        <Navigate to="/" replace /> 
        {alert('Not allowed to access this page. Please login first.')}
        </> 
    );
};

export default Protectedroute;
