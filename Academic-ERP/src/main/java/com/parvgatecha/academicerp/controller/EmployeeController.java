package com.parvgatecha.academicerp.controller;

import com.parvgatecha.academicerp.dto.employee.EmployeeAuthResponse;
import com.parvgatecha.academicerp.dto.employee.EmployeeRequest;
import com.parvgatecha.academicerp.dto.employee.EmployeeResponse;
import com.parvgatecha.academicerp.dto.employee.LoginRequest;
import com.parvgatecha.academicerp.helper.JWTHelper;
import com.parvgatecha.academicerp.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/api/v1/employees")
public class EmployeeController {
    private final EmployeeService employeeService;
    private final JWTHelper jwtHelper;

    @PostMapping("/add")
    public ResponseEntity<String> addEmployee(@RequestBody @Valid EmployeeResponse employee) {
        return ResponseEntity.ok(employeeService.addEmployee(employee));
    }

    @PostMapping()
    public ResponseEntity<EmployeeAuthResponse> loginEmployee(@RequestBody @Valid LoginRequest loginRequest) {
        EmployeeAuthResponse employeeAuthResponse = employeeService.loginCustomer(loginRequest);
        if (employeeAuthResponse.statusCode() == 201) {
            return ResponseEntity.ok(employeeService.loginCustomer(loginRequest));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(employeeAuthResponse);
        }
    }

    @GetMapping()
    public ResponseEntity<List<EmployeeResponse>> getEmployees(@RequestHeader(name="Authorization") String authToken) {
        String token = authToken.split(" ")[1].trim();
        Long id = jwtHelper.extractUserId(token);
        List<EmployeeResponse> response = employeeService.getAllEmployees(id);
        System.out.println(response);
        return ResponseEntity.ok(response);
    }

    @PutMapping()
    public ResponseEntity<String> updateEmployee(@RequestBody @Valid EmployeeResponse request) {
        return ResponseEntity.ok(employeeService.updateEmployee(request));
    }

    @PostMapping("/disburse")
    public ResponseEntity<String> disburseSalary(@RequestBody @Valid Set<EmployeeResponse> emps) {
        System.out.println(emps);
        return ResponseEntity.ok(employeeService.disburseSalary(emps));
    }
}
