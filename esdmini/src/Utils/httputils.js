import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

// Generic Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchEmployeesAPI = async () => {
  const response = await axiosInstance.get("/employees");
  console.log(response);
  return response.data;
};

export const updateEmployee = async (employee) => {
  const response = await axiosInstance.put("/employees", employee);
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axiosInstance.post("/employees", { email, password });
  localStorage.setItem("jwt",response.data.token)
  return response.data;
};

export const disburseSalaries = async (ids) => {
  console.log(ids);
  const response  = await axiosInstance.post("/employees/disburse",ids);
  return response;
};
