package com.project_track;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class ProjectTrackApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectTrackApplication.class, args);
	}

}
