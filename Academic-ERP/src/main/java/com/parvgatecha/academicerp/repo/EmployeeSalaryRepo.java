package com.parvgatecha.academicerp.repo;

import com.parvgatecha.academicerp.entity.EmployeeSalary;
import com.parvgatecha.academicerp.entity.Employees;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeSalaryRepo extends JpaRepository<EmployeeSalary, Long> {
    EmployeeSalary findByEmployee(Employees employee);
}
