class Employee {
  constructor({ employee_id, first_name, last_name, email, title, salary, department, photograph_path }) {
    this.employee_id = employee_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.title = title;
    this.salary = salary;
    this.department = department;
    this.photograph_path = photograph_path;
  }

  fullName() {
    return `${this.first_name} ${this.last_name}`;
  }
}

export default Employee;
