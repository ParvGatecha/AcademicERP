import { useState, useEffect } from "react";
import { fetchEmployeesAPI } from "../Utils/httputils";
import Employee from "../Model/Employee";
import { useNavigate } from "react-router-dom";

const useEmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    const token = localStorage.getItem("jwt");
    try {
      setLoading(true);
      if (!token) navigate('/');
      const data = await fetchEmployeesAPI();
      setEmployees(data.map((emp) => new Employee(emp)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return { employees, loading, error, fetchEmployees };
};

export default useEmployeeDetails;
