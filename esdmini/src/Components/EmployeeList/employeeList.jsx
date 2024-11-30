import React, { useState, useEffect } from "react";
import { Pagination, InputLabel, FormControl, Select, MenuItem, List, Modal, Box, Typography, TextField, Button } from "@mui/material";
import EmployeeCard from "../Presentation/EmployeeCard";
import useEmployeeDetails from "../../Hooks/useEmployeeDetails";
import { updateEmployee, disburseSalaries } from "../../Utils/httputils";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeList = () => {
  const {employees, loading, error, fetchEmployees } = useEmployeeDetails();
  const [selectedEmployees, setSelectedEmployees] = useState(new Set());
  const [openModal, setOpenModal] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [paginatedEmployees, setPaginatedEmployees] = useState([]);

  const departmentNames = [...new Set(employees.map((employee) => employee.department))];
  const titles = [...new Set(employees.map((employee) => employee.title))];


  const filteredEmployees = employees.filter((employee) => {
    const matchesDepartment = selectedDepartment
        ? employee.department === selectedDepartment
        : true;

    const matchesTitle = selectedTitle
        ? employee.title?.toLowerCase() === selectedTitle.toLowerCase()
        : true;

    const matchesSearch = Object.values(employee).some((value) =>
        value ? 
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        : false
    );

    return matchesDepartment && matchesTitle && matchesSearch;
  });

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    setCurrentPage(1);
  };

  const handleTitleChange = (event) => {
    setSelectedTitle(event.target.value);
    setCurrentPage(1);
  };


  const handleCheckboxChange = (event, employee) => {
    const updatedSelection = new Set(selectedEmployees);
    event.target.checked ? updatedSelection.add(employee) : updatedSelection.delete(employee);
    setSelectedEmployees(updatedSelection);
  };

  const handleModifyClick = (employee) => {
    setEditedEmployee({ ...employee });
    setOpenModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async () => { 
    try {
      await updateEmployee(editedEmployee);
      fetchEmployees();
      setOpenModal(false);
      toast.success('Employee Salary Modified', {
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
    } catch (error) {
      alert("Error updating employee: " + error.message);
    }
  };


  const handleDisburse = () => {
    if (selectedEmployees.size > 0) {
      const employeeIds = Array.from(selectedEmployees);
      disburseSalaries(employeeIds);
      setSelectedEmployees(new Set());
      toast.success('Salary Disbursed', {
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
      console.log('Disbursing funds to employees:', selectedEmployees);
    }
  };

  const handlePageChange = (event, value) => {
    console.log(`Page changing to: ${value}`);
    setCurrentPage(value);
  };

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setPageSize(newSize);
    setCurrentPage(1);
    setPaginatedEmployees(filteredEmployees.slice(0, newSize));
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredEmployees.length);
    setPaginatedEmployees(filteredEmployees.slice(startIndex, endIndex));
  }, [filteredEmployees, pageSize, currentPage]);
  
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel>Department</InputLabel>
        <Select
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          label="Department"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {departmentNames.map((department) => (
            <MenuItem key={department} value={department}>
              {department}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth style={{ marginBottom: "20px" }}>
          <InputLabel>Title</InputLabel>
          <Select value={selectedTitle} onChange={handleTitleChange} label="Title">
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {titles.map((title) => (
                <MenuItem key={title} value={title}>
                  {title}
                </MenuItem>
            ))}
          </Select>
        </FormControl>

      <TextField
        fullWidth
        variant="outlined"
        label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <hr></hr>

      <List>
        {paginatedEmployees.map((employee) => (
          <EmployeeCard
            key={employee.employee_id}
            employee={employee}
            isSelected={selectedEmployees.has(employee)}
            onCheckboxChange={handleCheckboxChange}
            onModifyClick={handleModifyClick}
          />
        ))}
      </List>

      <div style={{ display: "flex", flexDirection:"column",justifyContent: "center", alignItems: "center", gap: "2rem" }}>
        <div>
          <label htmlFor="page-size-select" style={{ marginRight: "0.5rem" }}>
            Items per page:
          </label>
          <Select
            id="page-size-select"
            value={pageSize}
            onChange={handlePageSizeChange}
            style={{ width: "100px" }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </div>

        <Pagination
          count={Math.ceil(filteredEmployees.length / pageSize)} 
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)} sx={{display:"flex", alignSelf:"center", justifySelf:"center"}}>
        <Box sx={{ width: 400, p: 4, bgcolor: "background.paper", margin: "auto" }}>
          <Typography variant="h6">Edit Employee</Typography>
          <TextField disabled name="first_name" label="First Name" fullWidth margin="normal" value={editedEmployee?.first_name || ""} onChange={handleInputChange} />
          <TextField disabled name="last_name" label="Last Name" fullWidth margin="normal" value={editedEmployee?.last_name || ""} onChange={handleInputChange} />
          <TextField disabled name="email" label="Email" fullWidth margin="normal" value={editedEmployee?.email || ""} onChange={handleInputChange} />
          <TextField disabled name="title" label="Title" fullWidth margin="normal" value={editedEmployee?.title || ""} onChange={handleInputChange} />
          <TextField name="salary" label="Salary" fullWidth margin="normal" value={editedEmployee?.salary || ""} onChange={handleInputChange} />
          <TextField disabled name="department" label="Department" fullWidth margin="normal" value={editedEmployee?.department || ""} onChange={handleInputChange} />
          <Button variant="contained" color="primary" onClick={handleFormSubmit}>Save Changes</Button>
        </Box>
      </Modal>

      {selectedEmployees.size > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
          <Button variant="contained" color="success" onClick={handleDisburse}>
            Disburse
          </Button>
        </Box>
      )}

    </div>
  );
};

export default EmployeeList;
