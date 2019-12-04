package es.dmariaa.deathrace.server;

import org.springframework.boot.autoconfigure.*;
import org.springframework.context.annotation.*;

@Configuration
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
public class Configuration {
	
}
