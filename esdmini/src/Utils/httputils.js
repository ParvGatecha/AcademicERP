import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from 'react-toastify';


const API_BASE_URL = "http://localhost:8080/api/v1";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  
  // withCredentials: true,
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(config.headers);
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
      if (error) {
        toast.error(error.response.data.message, {
          position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
          if(error.response.data.statusCode!=406){
            localStorage.removeItem("jwt");
            setTimeout(() => {
              window.location.href = "/";
            }, 5000);
          }
          return new Promise(() => {});
      }
      return Promise.reject(error);
  }
);

export const fetchEmployeesAPI = async () => {
  const response = await axiosInstance.get("/employees/get");
  return response.data;
};

export const updateEmployee = async (employee) => {
  const response = await axiosInstance.put("/employees", employee);
  console.log(response);
  return response;
};

export const loginUser = async (email, password) => {
  const response = await axiosInstance.post("/employees/login", { email, password });
  localStorage.setItem("jwt",response.data.token)
  return response.data;
};

export const disburseSalaries = async (ids) => {
  const response  = await axiosInstance.post("/employees/disburse",ids);
  return response;
};

export const registerEmployee = async (employee) => {
  const response = await axiosInstance.post("/employees/add", employee);
  console.log(response);
  return response;
};

export const getDepartments = async () => {
  const response = await axiosInstance.get("/employees/getDepts");
  console.log("res");
  console.log(response);
  return response.data;
};


