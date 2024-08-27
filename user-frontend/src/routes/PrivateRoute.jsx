import React, { useEffect, useState } from 'react';
import { Navigate ,Outlet } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/loader/Loader'

const PrivateRoute = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const result = await api.checkAuthenticate();
            if (result.error) {
                setIsAuthenticated(false);
            } else {
                setIsAuthenticated(true);
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    if (loading) return <Loader/>; // Optional: Show a loading spinner or message

    return isAuthenticated ? <Outlet/>: <Navigate to="/login" />;
};

export default PrivateRoute;
