package es.dmariaa.deathrace.server.controllers;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class RestExceptionHandler  extends ResponseEntityExceptionHandler {
    @ExceptionHandler(RestException.class)
    protected ResponseEntity<Object> handleRestException(RestException exception) {
        return exception.toResponseEntity();
    }
}
