package com.parvgatecha.academicerp.dto.employee;

import com.fasterxml.jackson.annotation.JsonProperty;

public record EmployeeAuthResponse(
        @JsonProperty("token")
        String token,

        @JsonProperty("message")
        String message,

        @JsonProperty("statusCode")
        int statusCode
) {
}
