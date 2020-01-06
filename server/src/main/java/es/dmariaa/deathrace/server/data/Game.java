package es.dmariaa.deathrace.server.data;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import es.dmariaa.deathrace.server.services.RandomGenerator;
import org.apache.commons.lang3.RandomStringUtils;

import java.util.ArrayList;

public class Game {
    private ArrayList<Player> players;
    private boolean isPrivate = false;
    private String name;
    private String id;
    private int minPlayers;

    @JsonIgnore
    private String gamePassword;

    public Game(String name, int minPlayers, boolean isPrivate) {
        this.name = name;
        this.minPlayers = minPlayers;
        this.isPrivate = isPrivate;
    }

    public String getId() {
        // Generate or return
        if(id==null || id.isEmpty()) {
            id = RandomStringUtils.randomAlphanumeric(8);
        }
        return id;
    }

    public String getName() {
        if(name==null || name.equals("")) {
            name = "Game " + this.getId();
        }
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isPrivate() {
        return isPrivate;
    }

    public void setPrivate(boolean isPrivate) {
        this.isPrivate = isPrivate;
    }

    public int getMinPlayers() {
        return minPlayers;
    }

    public void setMinPlayers(int minPlayers) {
        if(minPlayers < 2) minPlayers = 2;

        this.minPlayers = minPlayers;
    }

    public String getGamePassword() {
        if(this.isPrivate && this.gamePassword==null) {
            this.gamePassword = RandomStringUtils.randomAlphanumeric(8);
        }
        return gamePassword;
    }

    public void setGamePassword(String gamePassword) {
        this.gamePassword = gamePassword;
    }

    public boolean addPlayer(Player player) {
        if(this.players.size() >= minPlayers) return false;
        players.add(player);
        return true;
    }

    public boolean removePlayer(Player player) {
        return players.remove(player);
    }

    public boolean containsPlayer(Player player) {
        return players.contains(player);
    }

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public Player[] getPlayers() {
        if(this.players==null) {
            this.players = new ArrayList<>();
        }

        Player[] players = this.players.toArray(new Player[this.players.size()]);
        return players;
    }
}
