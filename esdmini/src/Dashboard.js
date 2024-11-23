import React from "react";
import { Button } from "@mui/material"; // Import MUI Button for better styling
import { useNavigate } from "react-router-dom"; // For React Router v6

import UserList from "./Components/EmployeeList/employeeList";

const Dashboard = () => {
  // Use navigate instead of history in React Router v6
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication state (e.g., tokens, user data)
    localStorage.removeItem("jwt"); // Example for token removal

    // Redirect to the login page after logout
    navigate("/");
  };

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
