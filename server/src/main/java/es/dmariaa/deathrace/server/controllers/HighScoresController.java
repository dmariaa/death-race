package es.dmariaa.deathrace.server.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HighScoresController {
    @RequestMapping(value = "/high-scores", method = RequestMethod.GET)
    public string getHighScores()
    {

    }

    @RequestMapping(value = "/high-scores", method = RequestMethod.POST)
    public string postHighScores()
    {

    }
}
