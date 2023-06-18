package br.com.app.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class ResourceWithErrorsException extends RuntimeException {
    public ResourceWithErrorsException(String message) {
        super(message);
    }
}