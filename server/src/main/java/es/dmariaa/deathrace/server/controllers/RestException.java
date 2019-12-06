package es.dmariaa.deathrace.server.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.PrintWriter;
import java.io.StringWriter;

public class RestException extends Exception {
    private HttpStatus code;

    public RestException(String message, HttpStatus code, Exception parentException) {
        super("Rest Exception: " + message);
        this.code = code;
        this.setStackTrace(parentException.getStackTrace());
    }

    public ResponseEntity<Object> toResponseEntity()
    {
        return new ResponseEntity<>(this.getMessage() + "\n" + getStackTraceAsString(), this.code);
    }

    private String getStackTraceAsString()
    {
        StringWriter stringWriter = new StringWriter();
        PrintWriter printWriter = new PrintWriter(stringWriter);
        this.printStackTrace(printWriter);
        return printWriter.toString();
    }
}
