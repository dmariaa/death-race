package es.dmariaa.deathrace.server.services;

import es.dmariaa.deathrace.server.data.Game;
import es.dmariaa.deathrace.server.data.PlayerList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;

@Service
public class GameManager {
    @Autowired
    PlayerList playerList;

    private HashMap<String, Game> games = new HashMap<String, Game>();

    public ArrayList<Game> getGames() {
        return new ArrayList<>(games.values());
    }

    public Game addGame(String name) {
        return addGame(name, 4, false);
    }

    public Game addGame(String name, int minPlayers) {
        return addGame(name, minPlayers, false);
    }

    public Game addGame(String name, int minPlayers, boolean isPrivate) {
        Game game = new Game(name, minPlayers, isPrivate);
        return addGame(game);
    }

    public Game addGame(Game game) {
        this.games.put(game.getId(), game);
        return game;
    }

    public Game getGame(String id) {
        return games.get(id);
    }

    public boolean removeGame(Game game) {
        return removeGame(game.getId());
    }

    public boolean removeGame(String id) {
        Game game = games.remove(id);
        return game != null;
    }
}
