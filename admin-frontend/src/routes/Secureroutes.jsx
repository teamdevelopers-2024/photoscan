import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import api from "../services/api";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(null);
  useEffect(() => {
    checkAdminStatus();
  }, []);
  const checkAdminStatus = async () => {
    try {
      const response = await api.status()
      console.log("this is api response : ",response)
      if (response.loggedIn) {
        setIsAdmin(true);
      } else {
        setIsAdmin(null);
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
     return <div>loading ...</div>;
  }

  return isAdmin ? <Outlet /> : <Navigate to="/" />;

}

export default ProtectedRoute;
