USE AcademicERP;

ALTER TABLE employees
ADD CONSTRAINT fk_employees_dempartment
FOREIGN KEY (department)
REFERENCES departments(department_id);

ALTER TABLE employee_salary
ADD CONSTRAINT fk_employees_salary
FOREIGN KEY (employee_id)
REFERENCES employees(employee_id);

ALTER TABLE employee_accounts
ADD CONSTRAINT fk_employees_accounts
FOREIGN KEY (employee_id)
REFERENCES employees(employee_id);