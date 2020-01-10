package es.dmariaa.deathrace.server.websockets;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.introspect.AnnotatedMember;
import com.fasterxml.jackson.databind.introspect.JacksonAnnotationIntrospector;
import es.dmariaa.deathrace.server.data.Game;
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
import java.util.ArrayList;

@Component
public class GameManagerWebsocket extends TextWebSocketHandler {
    private Logger logger = LoggerFactory.getLogger(GameManagerWebsocket.class);
    private ObjectMapper objectMapper = new ObjectMapper();

    private ArrayList<WebSocketSession> sessions = new ArrayList<>();

    @Autowired
    GameManager gameManager;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        JsonNode node = objectMapper.readTree(message.getPayload());

        switch(node.get("command").asText()) {
            case "ADD_GAME":
                addGame(node, session);
                break;
            case "JOIN_GAME":
                joinGame(node, session);
                break;
            default:
                throw new Exception("Invalid command sent");
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        sendGameList(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
        updateGamesLists();
    }

    static class JsonIgnoreDisabler extends JacksonAnnotationIntrospector {
        @Override
        public boolean hasIgnoreMarker(final AnnotatedMember m){
            return false;
        }
    }

    private void joinGame(JsonNode node, WebSocketSession session) throws IOException {
        String playerUUID = node.get("player").asText();
        String gameId = node.get("game").asText();
        String password = node.get("password") != null ? node.get("password").asText() : null;
        Game game = gameManager.getGame(gameId);

        String jsonResponse = "";
        AddGameResponse response = new AddGameResponse();
        response.setCommand("GAME_JOINED");

        if(game.isPrivate() && !password.equals(game.getGamePassword())) {
            response.setCommand("PASSWORD_NOT_VALID");
            jsonResponse = objectMapper.writeValueAsString(response);
        } else {
            response.setData(new Game[] { game });
            ObjectMapper withPasswordObjectMapper = new ObjectMapper();
            withPasswordObjectMapper.setAnnotationIntrospector(new JsonIgnoreDisabler());
            jsonResponse = withPasswordObjectMapper.writeValueAsString(response);
        }

        session.sendMessage(new TextMessage(jsonResponse));
    }

    private void addGame(JsonNode node, WebSocketSession session) throws IOException {
        String playerUUID = node.get("player").asText();
        String name = node.get("name").asText();
        int minPlayers = node.get("minplayers").asInt();
        boolean isPrivate = node.get("private").asBoolean();

        Game game = gameManager.addGame(name, minPlayers, isPrivate);
        AddGameResponse response = new AddGameResponse();
        response.setData(new Game[] { game });
        response.setCommand("GAME_ADDED");

        ObjectMapper withPasswordObjectMapper = new ObjectMapper();
        withPasswordObjectMapper.setAnnotationIntrospector(new JsonIgnoreDisabler());
        session.sendMessage(new TextMessage(withPasswordObjectMapper.writeValueAsString(response)));

        // Broadcast session to all receivers
        for(WebSocketSession webSocketSession : sessions) {
            sendGameList(webSocketSession);
        }
    }

    public void updateGamesLists() throws IOException {
        // Broadcast session to all receivers
        for(WebSocketSession webSocketSession : sessions) {
            if(webSocketSession.isOpen()) {
                logger.debug(String.format("Notifying gamelist update to session %s", webSocketSession.getId()));
                sendGameList(webSocketSession);
            } else {
                sessions.remove(webSocketSession);
            }
        }
    }

    private void sendGameList(WebSocketSession session) throws IOException {
        ArrayList<Game> games = gameManager.getGames();
        AddGameResponse response = new AddGameResponse();
        response.setData(games.toArray(new Game[games.size()]));
        response.setCommand("UPDATE_GAMES");

        String gameList = objectMapper.writeValueAsString(response);
        session.sendMessage(new TextMessage(gameList));
    }

    private class AddGameResponse extends WebSocketMessage {
        private Game[] data;
        public Game[] getData() {
            return data;
        }
        public void setData(Game[] data) {
            this.data = data;
        }
    }
}
