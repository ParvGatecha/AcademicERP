package com.parvgatecha.academicerp.exception;

import com.parvgatecha.academicerp.model.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalException {

    @ExceptionHandler(value = EmployeeNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleExceptionStudentDoesNotExists(EmployeeNotFoundException studentDoesNotExists) {
        ErrorResponse er=new ErrorResponse();
        er.setMessage(studentDoesNotExists.getMessage());
        er.setStatusCode(HttpStatus.NOT_FOUND.value());
        return new ResponseEntity<>(er, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = JwtTokenNotValid.class)
    public ResponseEntity<ErrorResponse> handleExceptionJwtTokenNotValid(JwtTokenNotValid tokenNotValid) {
        ErrorResponse er=new ErrorResponse();
        System.out.println("erherhergw");
        er.setMessage(tokenNotValid.getMessage());
        er.setStatusCode(HttpStatus.UNAUTHORIZED.value());
        return new ResponseEntity<>(er, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        ErrorResponse er=new ErrorResponse();
        er.setMessage(e.getMessage());
        er.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        return new ResponseEntity<>(er, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}