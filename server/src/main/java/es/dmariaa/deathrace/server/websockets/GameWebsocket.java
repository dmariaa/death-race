package es.dmariaa.deathrace.server.websockets;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.introspect.AnnotatedMember;
import com.fasterxml.jackson.databind.introspect.JacksonAnnotationIntrospector;
import es.dmariaa.deathrace.server.data.Game;
import es.dmariaa.deathrace.server.data.Player;
import es.dmariaa.deathrace.server.data.PlayerList;
import es.dmariaa.deathrace.server.services.GameManager;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import javax.xml.soap.Text;
import java.io.IOException;
import java.util.HashMap;

@Component
public class GameWebsocket extends TextWebSocketHandler {
    Logger logger = LoggerFactory.getLogger(GameWebsocket.class);
    private ObjectMapper objectMapper = new ObjectMapper();

    private HashMap<String, ImmutablePair<WebSocketSession, Game>> playerSessions = new HashMap<>();

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
//        try {
            String gameId = node.get("game").asText();
            String playerUUID = node.get("player").asText();
            Player player = playerList.GetOne(playerUUID);
            Game game = gameManager.getGame(gameId);

            if(command.equals("JOIN_GAME")) {
                game.addPlayer(player);
                playerSessions.put(playerUUID, new ImmutablePair<WebSocketSession, Game>(session, game));
                notifyPlayers(game, new JoinGameResponse(game));
            } else if(command.equals("GAME_UPDATED") || command.equals("GAME_STARTED")) {   // Broadcast
                notifyPlayers(game, message);
            } else if(command.equals("INPUT")) {                                            // Send to host
                Player host = game.getPlayers()[0];
                notifyPlayer(host, message);
            } else if(command.equals("COUNTDOWN")) {
                notifyPlayers(game, message);
            }
 //       } catch(NullPointerException exception) {
 //           int n = 1;
 //       }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        playerSessions.forEach((String playerUUID, ImmutablePair<WebSocketSession, Game> data) -> {
            WebSocketSession playerSession = data.left;
            Game game = data.right;

            if(playerSession.equals(session)) {
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
            }
        });
    }

    private void notifyPlayers(Game game, WebSocketMessage message) throws IOException {
        String responseString = objectMapper.writeValueAsString(message);
        this.notifyPlayers(game, new TextMessage(responseString));
    }

    private void notifyPlayers(Game game, TextMessage message) throws IOException {
        Player[] players = game.getPlayers();

        for(int i=0, length=players.length; i < length; i++ ) {
            String pUUID = players[i].getUuid().toString();
            WebSocketSession psession = playerSessions.get(pUUID).getLeft();
            psession.sendMessage(message);
        }
    }

    private void notifyPlayer(Player player, TextMessage message) throws IOException {
        ImmutablePair<WebSocketSession, Game> data = this.playerSessions.get(player.getUuid().toString());
        if(data != null) {
            data.left.sendMessage(message);
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
