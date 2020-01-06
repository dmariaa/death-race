package es.dmariaa.deathrace.server;

import es.dmariaa.deathrace.server.services.GameManager;
import es.dmariaa.deathrace.server.websockets.GameManagerWebsocket;
import es.dmariaa.deathrace.server.websockets.GameWebsocket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableAutoConfiguration
@EnableWebSocket
@ComponentScan("es.dmariaa.deathrace.server")
public class AppConfiguration implements WebSocketConfigurer {
    @Autowired
    private GameManagerWebsocket gameHallWebsocket;

    @Autowired
    private GameWebsocket gameManager;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry webSocketHandlerRegistry) {
        webSocketHandlerRegistry.addHandler(gameHallWebsocket, "/game-manager").setAllowedOrigins("*");
        webSocketHandlerRegistry.addHandler(gameManager, "/game-play").setAllowedOrigins("*");
    }
}
