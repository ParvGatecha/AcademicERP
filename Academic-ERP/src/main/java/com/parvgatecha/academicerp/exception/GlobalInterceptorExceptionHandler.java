package com.parvgatecha.academicerp.exception;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;

@Component
public class GlobalInterceptorExceptionHandler implements HandlerExceptionResolver {

    @Override
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        if (ex instanceof JwtTokenNotValid) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            try {
                response.getWriter().write("{\"message\":\"" + ex.getMessage() + "\",\"statusCode\":401}");
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.setContentType("application/json");
            try {
                response.getWriter().write("{\"message\":\"Internal Server Error\",\"statusCode\":500}");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return new ModelAndView(); // No further processing
    }
}
