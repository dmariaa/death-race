package es.dmariaa.deathrace.server.data;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.util.Date;


@JsonPropertyOrder({ "player-name", "score", "score-date" })
public class HighScore  implements Comparable<HighScore> {
    @JsonProperty("player-name")
    public String PlayerName;

    @JsonProperty("score")
    public int Score;

    @JsonProperty("score-date")
    public Date ScoreDate;

    @Override
    public int compareTo(HighScore o) {
        return o.Score - this.Score;
    }
}
