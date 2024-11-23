package com.parvgatecha.academicerp.repo;

import com.parvgatecha.academicerp.entity.EmployeeAccounts;
import com.parvgatecha.academicerp.entity.Employees;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeAccountsRepo extends JpaRepository<EmployeeAccounts, Long> {
    EmployeeAccounts findByEmployee(Employees employee);
}
