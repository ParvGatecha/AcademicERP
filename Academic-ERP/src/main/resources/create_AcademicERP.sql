CREATE DATABASE IF NOT EXISTS AcademicERP;

USE AcademicERP;

CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    capacity INT
);

CREATE TABLE employees(
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255),
    photograph_path VARCHAR(255),
    salary DECIMAL(10,2),
    department INT
);

CREATE TABLE employee_salary(
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    payment_date DATE,
    amount DECIMAL(10,2),
    description TEXT
);

CREATE TABLE employee_accounts(
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    employee_balance DECIMAL(10,2)
);
