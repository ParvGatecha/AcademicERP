USE AcademicERP;

INSERT INTO departments (department_id, name, capacity) VALUES
(1, 'Faculty', 10),
(2, 'Intern', 5),
(3, 'Accounts', 10),
(4, 'Student', 10);

INSERT INTO employees (employee_id, first_name, last_name, email, title, photograph_path, salary, department, password) VALUES
(1, 'John','Doe','john.doe@academicuni.ac.in', 'Dean', '/images/john_doe.png', 75000, 1, 'null'),
(2, 'Jane','Doe','jane.doe@academicuni.ac.in', 'Professor', '/images/jane_doe.png', 40000, 2, 'null'),
(3, 'John','Smith','john.smith@academicuni.ac.in', 'Professor', '/images/john_smith.png', 50000, 3, 'null');

INSERT INTO employee_salary (id, employee_id, payment_date, amount, description) VALUES
(1, 1, '2024-11-20', 75000.00, 'October Month Salary'),
(2, 2, '2024-11-20', 40000.00, 'October Month Salary'),
(3, 3, '2024-10-20', 50000.00, 'September Month Salary'),
(4, 3, '2024-11-20', 50000.00, 'October Month Salary');

INSERT INTO employee_accounts (id, employee_id, employee_balance) VALUES
(1, 1, 75000.00),
(2, 2, 40000.00),
(3, 3, 50000.00);
