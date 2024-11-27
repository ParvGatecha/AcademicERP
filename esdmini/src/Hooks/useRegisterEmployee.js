import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDepartments, registerEmployee } from '../Utils/httputils';
import { ToastContainer, toast, Bounce } from 'react-toastify';

const useRegisterEmployee = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        title: '',
        department: '',
        salary: '',
        photograph_path: '',
        password: '',
    });

    const [departments, setDepartments] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleRegister = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await registerEmployee(formData);
            if (response.status === 200) {
                toast.success('Employee Registered', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition:Bounce,
                    });
                navigate('/');
            } else {
                const data = await response.json();
                setError(data.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred while registering. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    const fetchDepartments = async () => {
        try {
          setLoading(true);
          const data = await getDepartments();
            console.log("ddd"+data);
          setDepartments(data.map((emp) => emp.name));
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
        fetchDepartments();
    }, []);

    return {
        formData,
        departments,
        error,
        loading,
        handleChange,
        handleRegister,
    };
};

export default useRegisterEmployee;
