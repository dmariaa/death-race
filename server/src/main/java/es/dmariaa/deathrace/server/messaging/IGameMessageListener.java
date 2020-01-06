package es.dmariaa.deathrace.server.messaging;

import es.dmariaa.deathrace.server.data.Player;

public interface IGameMessageListener extends IMessageListener {
    public Player PlayerAdded();
    public Player PlayerDeleted();
}
