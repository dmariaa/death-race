package es.dmariaa.deathrace.server.websockets;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.introspect.AnnotatedMember;
import com.fasterxml.jackson.databind.introspect.JacksonAnnotationIntrospector;
import es.dmariaa.deathrace.server.data.Game;
import es.dmariaa.deathrace.server.data.Player;
import es.dmariaa.deathrace.server.data.PlayerList;
import es.dmariaa.deathrace.server.services.GameManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashMap;

@Component
public class GameWebsocket extends TextWebSocketHandler {
    Logger logger = LoggerFactory.getLogger(GameWebsocket.class);
    private ObjectMapper objectMapper = new ObjectMapper();

    private HashMap<String, WebSocketSession> playerSessions = new HashMap<>();

    @Autowired
    GameManager gameManager;

    @Autowired
    PlayerList playerList;

    @Autowired
    GameManagerWebsocket gameManagerWebsocket;

    public GameWebsocket() {
        objectMapper.setAnnotationIntrospector(new JsonIgnoreDisabler());
    }

    static class JsonIgnoreDisabler extends JacksonAnnotationIntrospector {
        @Override
        public boolean hasIgnoreMarker(final AnnotatedMember m){
            return false;
        }
    }


    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        JsonNode node = objectMapper.readTree(message.getPayload());
        String command = node.get("command").asText();
        String playerUUID = node.get("player").asText();
        String gameId = node.get("game").asText();
        Boolean isHost = node.get("host").asBoolean();

        if(command.equals("JOIN_GAME")) {
            Game game = gameManager.getGame(gameId);
            Player player = playerList.GetOne(playerUUID);
            game.addPlayer(player);
            playerSessions.put(playerUUID, session);

            notifyPlayers(game, new JoinGameResponse(game));
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        playerSessions.forEach((String playerUUID, WebSocketSession playerSession) -> {
            if(playerSession.equals(session)) {
                gameManager.getGames().forEach((Game game) -> {
                    Player player = playerList.GetOne(playerUUID);
                    if(player != null && game.containsPlayer(player)) {
                        game.removePlayer(player);

                        if(game.getPlayers().length==0) {
                            logger.info(String.format("Removing player %s", player.getUuid()));
                            gameManager.removeGame(game);
                            try {
                                gameManagerWebsocket.updateGamesLists();
                            } catch (IOException e) {
                                logger.error("No se ha podido comunicar el mensaje", e);
                            }
                        }
                    }

                    try {
                        notifyPlayers(game, new LeaveGameResponse(game));
                    } catch (IOException e) {
                        logger.error("No se ha podido comunicar el mensaje", e);
                    }
                });
            }
        });
    }

    private void notifyPlayers(Game game, WebSocketMessage message) throws IOException {
        String responseString = objectMapper.writeValueAsString(message);

        Player[] players = game.getPlayers();

        for(int i=0, length=players.length; i < length; i++ ) {
            String pUUID = players[i].getUuid().toString();
            WebSocketSession psession = playerSessions.get(pUUID);
            psession.sendMessage(new TextMessage(responseString));
        }
    }


    private class LeaveGameResponse extends WebSocketMessage {
        @Override
        public String getCommand() {
            return "GAME_LEAVED";
        }

        public Game game;

        public LeaveGameResponse(Game game) {
            this.game = game;
        }
    }

    private class JoinGameResponse extends WebSocketMessage {
        @Override
        public String getCommand() {
            return "GAME_JOINED";
        }

        public Game game;

        public JoinGameResponse(Game game) {
            this.game = game;
        }
    }
}
