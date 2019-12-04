package es.dmariaa.deathrace.server.data;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.util.Date;


@JsonPropertyOrder({ "player-name", "score", "score-date" })
public class HighScore {
    @JsonProperty("player-name")
    public String PlayerName;

    @JsonProperty("score")
    public int Score;

    @JsonProperty("score-date")
    public Date ScoreDate;
}
