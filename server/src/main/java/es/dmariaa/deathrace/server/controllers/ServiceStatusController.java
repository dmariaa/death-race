package es.dmariaa.deathrace.server.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServiceStatusController {
	@RequestMapping("/status")
	public String status() {
		return "Hello World";
	}
}
