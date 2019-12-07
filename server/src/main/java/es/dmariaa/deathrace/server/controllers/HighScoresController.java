package es.dmariaa.deathrace.server.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import es.dmariaa.deathrace.server.data.HighScore;
import es.dmariaa.deathrace.server.data.HighScoresList;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
public class HighScoresController {
    private ObjectMapper objectMapper;

    public HighScoresController() {
        this.objectMapper = new ObjectMapper();
    }

    @GetMapping(value = "/high-scores")
    public String getHighScores() throws RestException {
        try {
            return HighScoresList.getInstance().Get();
        } catch (IOException e) {
            throw new RestException(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    @PostMapping("/high-scores")
    public String postHighScore(@RequestBody String body) throws RestException {
        try {
            HighScore score = objectMapper.readValue(body, HighScore.class);
            return HighScoresList.getInstance().Add(score);
        } catch (JsonProcessingException e) {
            throw new RestException(e.getMessage(), HttpStatus.BAD_REQUEST, e);
        } catch (IOException e) {
            throw new RestException(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }
}