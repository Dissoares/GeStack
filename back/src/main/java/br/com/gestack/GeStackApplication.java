package br.com.gestack;

import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.SpringApplication;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
@SpringBootApplication
public class GeStackApplication {

	public static void main(String[] args) {
		SpringApplication.run(GeStackApplication.class, args);
	}

}
