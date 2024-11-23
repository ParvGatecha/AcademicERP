package com.parvgatecha.academicerp.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {

    private String message;
    private int statusCode;

    public ErrorResponse(String message) {
        super();
        this.message = message;
    }

}