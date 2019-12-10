package es.dmariaa.deathrace.server.data;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.unbrokendome.jackson.beanvalidation.JsonValidated;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@JsonValidated
@JsonPropertyOrder({ "uuid", "name", "preferences" })
public class Player {
    @JsonProperty("uuid") private UUID Uuid;
    @JsonProperty("name") @NotEmpty private String Name;
    @JsonProperty("preferences") @Valid @NotNull private PlayerPreferences Preferences;
    private String Password;

    public UUID getUuid() {
        return Uuid;
    }

    public void setUuid(UUID uuid) {
        this.Uuid = uuid;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
        String src = "es.dmariaa.deathrace/" + name;
        byte[] srcBytes = src.getBytes();
        Uuid = Uuid.nameUUIDFromBytes(srcBytes);
    }

    public PlayerPreferences getPreferences() {
        return Preferences;
    }

    public void setPreferences(PlayerPreferences preferences) {
        Preferences = preferences;
    }

    @JsonIgnore
    public String getPassword() {
        return Password;
    }

    @JsonProperty("password")
    public void setPassword(String password) {
        Password = password;
    }
}
