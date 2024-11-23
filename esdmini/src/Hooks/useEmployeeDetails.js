import { useState, useEffect } from "react";
import { fetchEmployeesAPI } from "../Utils/httputils";
import Employee from "../Model/Employee";

const useEmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployees = async () => {
    const token = localStorage.getItem("jwt");
    try {
      setLoading(true);
      if (!token) throw new Error("Unauthorized: No token found");
      const data = await fetchEmployeesAPI(token);
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
