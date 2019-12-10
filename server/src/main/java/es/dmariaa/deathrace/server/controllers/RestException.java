package es.dmariaa.deathrace.server.controllers;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.PrintWriter;
import java.io.StringWriter;

public class RestException extends Exception {
    private HttpStatus code;
    private boolean isException;

    public RestException(String message, HttpStatus code, Exception parentException) {
        super(message);
        this.code = code;
        this.isException = parentException != null;
        if(this.isException) {
            this.setStackTrace(parentException.getStackTrace());
        }
    }

    public ResponseEntity<Object> toResponseEntity() {
        String message = this.getMessage();

        if(this.isException) {
            message += "\n" + getStackTraceAsString();
        }

        RestExceptionData data = new RestExceptionData(message, this.isException);

        String response = null;
        try {
            response = (new ObjectMapper()).writeValueAsString(data);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(response, this.code);
    }

    private String getStackTraceAsString()
    {
        StringWriter stringWriter = new StringWriter();
        PrintWriter printWriter = new PrintWriter(stringWriter);
        this.printStackTrace(printWriter);
        return printWriter.toString();
    }
}

class RestExceptionData {
    @JsonProperty("message")
    public String message;

    @JsonProperty("internal-error")
    public boolean error;

    public RestExceptionData(String message, boolean error) {
        this.message = message;
        this.error = error;
    }
}
