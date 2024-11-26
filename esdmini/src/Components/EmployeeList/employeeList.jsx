import React, { useState, useEffect } from "react";
import { Pagination, InputLabel, FormControl, Select, MenuItem, List, Modal, Box, Typography, TextField, Button, Dialog, DialogContentText, DialogContent, DialogTitle, DialogActions } from "@mui/material";
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
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [paginatedEmployees, setPaginatedEmployees] = useState([]);

  const departmentNames = [...new Set(employees.map((employee) => employee.department))];

  const filteredEmployees = employees.filter((employee) => {
    // Check if the employee matches the department filter
    const matchesDepartment = selectedDepartment
      ? employee.department === selectedDepartment
      : true;

    // Check if the employee matches the search query in any of the fields
    const matchesSearch = Object.values(employee).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );

    return matchesDepartment && matchesSearch;
  });

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    setCurrentPage(1); // Reset to first page when filter is applied
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
      toast.success('Employee Modified', {
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


  // Handle disburse action
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

  // Function to handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    const startIndex = (value - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPaginatedEmployees(filteredEmployees.slice(startIndex, endIndex));
  };

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when page size changes
    setPaginatedEmployees(filteredEmployees.slice(0, newSize));
  };

  useEffect(() => {
    setPaginatedEmployees(filteredEmployees.slice(0, pageSize));
  }, [filteredEmployees, pageSize]);
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      
      {/* Department Filter */}
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

      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <hr classN></hr>

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

      {/* Pagination and Page Size Selector */}
      <div style={{ display: "flex", flexDirection:"column",justifyContent: "center", alignItems: "center", gap: "2rem" }}>
        {/* Page Size Selector */}
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

        {/* Pagination */}
        <Pagination
          count={Math.ceil(filteredEmployees.length / pageSize)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>

      {/* Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ width: 400, p: 4, bgcolor: "background.paper", margin: "auto", mt: "15%" }}>
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

      {/* Disburse Button: Visible only if at least one employee is selected */}
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
