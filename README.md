# ESD-Project
Project work for Enterprise Software Development.

Task: To create a salary disbursement system which allows the employees to disburse the salary of a single faculty or a selection of faculties.

The primary goal of our project was to develop an interactive and user-friendly interface for employees and administrators. The system needed to ensure secure and seamless salary transactions, restricted to authenticated users only.

Backend (Using Spring Boot):

Controller Layer -
This acts as the entry point for the application, handling user requests and directing them to the appropriate service for processing.
EmployeeController: Manages employee-related requests, such as retrieving and updating employee data.

Service Layer -
This layer contains the business logic of the application.
EmployeeService: Implements all business operations related to employees.

Repository Layer - 
This layer interacts directly with the database, performing CRUD (Create, Read, Update, Delete) operations. We use JPA (Java Persistence API) for database operations.

DepartmentsRepo: Handles department-related data.
EmployeeRepo: Manages employee information.
EmployeeSalaryRepo: Deals with salary-related records.

Model/Entity Layer
This layer defines the application's data structures, representing database tables as Java classes. Each field in the class corresponds to a column in the database.
The entities in our project are:
Departments
EmployeeAccounts
Employees
EmployeeSalary

Frontend (Using React):

-The user enters their credentials (e.g., email and password) and sends a POST request to the backend.
-On successful authentication, the backend generates and returns a JWT token.
-The frontend securely stores this token (e.g., in local storage or cookies).
-The token is included in subsequent requests to access protected resources.
-If the token expires, the user is redirected to the login page or given an option to refresh the token.
-Once Login is successful, On the next page all the profiles of employees are displayed. Employees having faculty as department will have a checkbox
on selecting it "disburse" button will be enabled using which employee can disburse the salary of that employee.
-We have also implemented a page for registeration of new employees and also modification of existing employees has been implemented.

Database Design:
Departments

Fields: department_id, capacity, name, department
EmployeeAccounts

Fields: employee_id, balance
Employees

Fields: first_name, last_name, email, title, salary, photograph_path, password, department
EmployeeSalary

Fields: id, employee_id, payment_date, amount, description
