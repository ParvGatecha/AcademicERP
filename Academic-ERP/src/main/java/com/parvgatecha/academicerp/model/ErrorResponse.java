package com.parvgatecha.academicerp.model;

import java.time.LocalDateTime;

// Ensure this class is not marked as abstract
public class ErrorResponse {
    private String message;
    private LocalDateTime timestamp;
    private int statusCode;

    // Constructor
    public ErrorResponse(String message, LocalDateTime timestamp, int statusCode) {
        this.message = message;
        this.timestamp = timestamp;
        this.statusCode = statusCode;
    }

    // Getters and Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }
}
