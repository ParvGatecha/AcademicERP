import React from 'react';
import useRegisterEmployee from './Hooks/useRegisterEmployee';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { getDepartments } from './Utils/httputils';
import iiitbImage from './Assets/iiitb-image.jpeg';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    CircularProgress,
    Alert,
    InputLabel,
    Select,
    MenuItem,
    FormControl
} from '@mui/material';
import './App.css';

const Register = () => {
    const { formData, departments, error, loading, handleChange, handleRegister } = useRegisterEmployee();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${iiitbImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(5px)',
                    zIndex: -1,
                }}
            />

            <Paper
                elevation={5}
                sx={{
                    padding: 3,
                    borderRadius: 3,
                    maxWidth: 500,
                    width: '90%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    Register
                </Typography>

                <form onSubmit={handleRegister}>
                    {[
                        { label: 'First Name', name: 'first_name', type: 'text' },
                        { label: 'Last Name', name: 'last_name', type: 'text' },
                        { label: 'Email', name: 'email', type: 'email' },
                        { label: 'Title', name: 'title', type: 'text' },
                        { label: 'Salary', name: 'salary', type: 'number' },
                        { label: 'Photograph Path', name: 'photograph_path', type: 'text' },
                        { label: 'Password', name: 'password', type: 'password' },
                    ].map((field, index) => (
                        <Box mb={2} key={index}>
                            <TextField
                                name={field.name}
                                type={field.type}
                                label = {field.label}
                                value={formData[field.name]}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        '& fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#115293',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#0d47a1',
                                        },
                                    },
                                }}
                            />
                        </Box>
                    ))}
   
                    <FormControl fullWidth sx = {{ background: "white" , marginBottom: "20px"}}>

                        <InputLabel>Department</InputLabel>
                            <Select
                            onChange={handleChange}
                            label="Department"
                            name="department"
                            fullWidth
                            required
                            backgroundColor="white"
                            sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        '& fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#115293',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#0d47a1',
                                        },
                                    },
                                }}
                            >
                            {departments.map((department) => (
                                <MenuItem key={department} value={department}>
                                {department}
                                </MenuItem>
                            ))}
                            </Select>
                    </FormControl>

                    {error && (
                        <Box mb={2}>
                            <Alert severity="error">{error}</Alert>
                        </Box>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                        sx={{
                            marginBottom: 2,
                            padding: '10px 0',
                            fontSize: '1rem',
                            background: "blue",
                            '&:hover': {
                                background: "lightblue",
                            },
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Register;
