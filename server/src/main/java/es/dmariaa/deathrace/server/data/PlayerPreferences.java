package es.dmariaa.deathrace.server.data;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.unbrokendome.jackson.beanvalidation.JsonValidated;

@JsonValidated
@JsonPropertyOrder({ "game-sound", "game-sound-volume", "game-music", "game-music-volume" })
public class PlayerPreferences {
    @JsonProperty(value = "game-sound")
    public boolean GameSound;

    @JsonProperty(value = "game-sound-volume")
    public float GameSoundVolume;

    @JsonProperty(value = "game-music")
    public boolean GameMusic;

    @JsonProperty(value = "game-music-volume")
    public float GameSoundMusic;

}
