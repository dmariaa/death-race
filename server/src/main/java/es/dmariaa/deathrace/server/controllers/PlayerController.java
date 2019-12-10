package es.dmariaa.deathrace.server.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import es.dmariaa.deathrace.server.data.LoginData;
import es.dmariaa.deathrace.server.data.Player;
import es.dmariaa.deathrace.server.data.PlayerList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.unbrokendome.jackson.beanvalidation.BeanValidationModule;

import javax.validation.Validation;
import javax.validation.ValidatorFactory;
import java.io.IOException;

@RestController
public class PlayerController {
    @Autowired
    private PasswordEncoder passwordEncoder;

    private ObjectMapper objectMapper;

    public PlayerController(ObjectMapper objectMapper) {
        ValidatorFactory validatorFactory = Validation.byDefaultProvider()
                .configure()
                .buildValidatorFactory();

        BeanValidationModule module = new BeanValidationModule(validatorFactory);

        this.objectMapper = new ObjectMapper()
                .registerModule(module);
    }

    @GetMapping("/players")
    public String GetPlayers() throws RestException {
        try {
            return objectMapper.writeValueAsString(PlayerList.getInstance().Get());
        } catch (IOException e) {
            throw new RestException(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    @GetMapping("/players/{uuid}")
    public String GetPlayer(@PathVariable String uuid) throws RestException {
        try {
            Player player = PlayerList.getInstance().GetOne(uuid);
            if(player==null) {
                throw new RestException("Player not found", HttpStatus.NOT_FOUND, null);
            }
            return objectMapper.writeValueAsString(player);
        } catch (IOException e) {
            throw new RestException(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    @PostMapping("/players")
    public String postPlayer(@RequestBody String body) throws RestException {
        try {
            Player player = objectMapper.readValue(body, Player.class);
            Player existingPlayer = PlayerList.getInstance().GetOne(player.getUuid().toString());
            if(existingPlayer != null) {
                throw new RestException("Player already exists", HttpStatus.CONFLICT, null);
            }
            player.setPassword(passwordEncoder.encode(player.getPassword()));
            return objectMapper.writeValueAsString(PlayerList.getInstance().Add(player));
        } catch(JsonProcessingException e) {
            throw new RestException(e.getMessage(), HttpStatus.BAD_REQUEST, e);
        } catch (IOException e) {
            throw new RestException(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    @PostMapping("/players/login")
    public String loginPlayer(@RequestBody LoginData body) throws RestException {
        try {
            Player player;

            if(body.getUuid() != null && !body.getUuid().isEmpty()) {
                player = PlayerList.getInstance().GetOne(body.getUuid());
            } else {
                player = PlayerList.getInstance().GetOneByName(body.getName());
            }

            if(player==null) {
                throw new RestException("Player not found", HttpStatus.NOT_FOUND, null);
            }
            if(passwordEncoder.matches(body.getPassword(), player.getPassword())) {
                return objectMapper.writeValueAsString(player);
            } else {
                throw new RestException("Password not valid", HttpStatus.UNAUTHORIZED, null);
            }
        } catch (IOException e) {
            throw new RestException(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, e);
        }

    }
}
