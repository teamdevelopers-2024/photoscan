import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  console.log("children", children);
  const [isAdmin, setIsAdmin] = useState(null);
  useEffect(() => {
    checkAdminStatus();
  }, []);
  const checkAdminStatus = async () => {
    try {
      const response = await fetch("https://api.photoscan.co.in/admin/status", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data.loggedIn) {
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
