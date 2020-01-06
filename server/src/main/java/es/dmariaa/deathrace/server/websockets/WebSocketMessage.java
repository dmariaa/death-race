package es.dmariaa.deathrace.server.websockets;

public abstract class WebSocketMessage {
    private String command;

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }
}
