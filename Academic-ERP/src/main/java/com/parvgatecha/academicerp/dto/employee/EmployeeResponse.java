package com.parvgatecha.academicerp.dto.employee;

import com.fasterxml.jackson.annotation.JsonProperty;

public record EmployeeResponse(
        @JsonProperty("employee_id")
        Long employeeId,

        @JsonProperty("first_name")
        String firstName,

        @JsonProperty("last_name")
        String lastName,

        @JsonProperty("email")
        String email,

        @JsonProperty("title")
        String title,

        @JsonProperty("salary")
        Double salary,

        @JsonProperty("photograph_path")
        String photographPath,

        @JsonProperty("department")
        String departmentName,

        @JsonProperty("paymentDate")
        java.time.LocalDateTime paymentDate,

        @JsonProperty("password")
        String password
) {
}
