import React , {useEffect} from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {jwtDecode} from "jwt-decode";


import UserList from "./Components/EmployeeList/employeeList";

const Dashboard = () => {
  const navigate = useNavigate();

  const getTokenExpiryTime = (token) => {
    try {
      const decoded = jwtDecode(token);
      console.log(decoded);
      return decoded.exp * 1000;
    } catch (error) {
      return null;
    }
  };

  const scheduleAutoLogout = (token) => {
    const expiryTime = getTokenExpiryTime(token);
    if (!expiryTime) return;

    const currentTime = Date.now();
    const timeUntilExpiry = expiryTime - currentTime;

    if (timeUntilExpiry > 0) {
      setTimeout(() => {
        toast.warning('JWT token expired', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition:Bounce
          });
        handleLogout();
      }, timeUntilExpiry);
    } else {
      handleLogout();
    }
  };

  
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    
    navigate("/");
  };
  
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      scheduleAutoLogout(token);
    }
  }, []);

  return (
    <div className="dashboard p-0">
      
      <div
        className="bg-primary d-flex align-items-center justify-content-between"
      >
        <h1 className="text-center flex-grow-1 text-white p-4">Dashboard</h1>
        <Button
          onClick={handleLogout}
          className="me-5 fs-5 fw-bold bg-white"
        >
          Logout
        </Button>
      </div>
      <div className="p-3">
        <UserList />
      </div>
    </div>
  );
};

export default Dashboard;
