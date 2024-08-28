import React, { useEffect, useState, useRef } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/loader/Loader';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const effectRan = useRef(false); // Add a ref to track if effect ran

  useEffect(() => {
    if (effectRan.current) return; // Prevents running the effect again

    const checkAuth = async () => {
      try {
        const result = await api.checkAuthenticate();
        setIsAuthenticated(!result.error);
      } catch (error) {
        console.error('Error during authentication check:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    effectRan.current = true; // Mark effect as ran

    // Cleanup function
    return () => {
      effectRan.current = false; // Reset for cleanup in case of future re-renders
    };
  }, []);
  const dispatch = useDispatch();

  if(isAuthenticated){
    api.fetchUser().then((data)=>{
      dispatch(setUser(data));
    }).catch((err)=>{

    })
     


  }

  if (loading) return <Loader />;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
