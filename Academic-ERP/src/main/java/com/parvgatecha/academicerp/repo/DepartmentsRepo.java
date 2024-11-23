package com.parvgatecha.academicerp.repo;

import com.parvgatecha.academicerp.entity.Departments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentsRepo extends JpaRepository<Departments, Long> {
    Departments findByName(String name);
}
