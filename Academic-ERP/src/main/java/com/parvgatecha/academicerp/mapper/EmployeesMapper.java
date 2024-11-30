package com.parvgatecha.academicerp.mapper;

import com.parvgatecha.academicerp.dto.employee.EmployeeRequest;
import com.parvgatecha.academicerp.dto.employee.EmployeeResponse;
import com.parvgatecha.academicerp.entity.EmployeeSalary;
import com.parvgatecha.academicerp.entity.Employees;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
public class EmployeesMapper {
    public Employees toEntity(EmployeeRequest request) {
        return Employees.builder().email(request.email()).password(request.password()).build();
    }

    public EmployeeResponse toResponse(Employees employees) {
        List<EmployeeSalary> salaries = employees.getSalaries();
        System.out.println("------------");
        System.out.println(salaries.size());
        LocalDateTime paymentDate = employees.getSalaries().stream()
                .max(Comparator.comparing(EmployeeSalary::getPaymentDate))
                .map(EmployeeSalary::getPaymentDate)
                .orElse(null);
        return new EmployeeResponse(
                employees.getEmployeeId(),
                employees.getFirstName(),
                employees.getLastName(),
                employees.getEmail(),
                employees.getTitle(),
                employees.getSalary(),
                employees.getPhotographPath(),
                employees.getDepartment().getName(),
                paymentDate,
                null
        );
    }
}