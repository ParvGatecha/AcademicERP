package com.parvgatecha.academicerp.repo;

import com.parvgatecha.academicerp.entity.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepo extends JpaRepository<Employees, Long> {
    Optional<Employees> findByEmail(String email);

    Employees findByEmployeeId(Long employeeId);

    @Query("SELECT e FROM Employees e WHERE e.employeeId != :id")
    List<Employees> getAllExcept(@Param("id") Long id);
}
