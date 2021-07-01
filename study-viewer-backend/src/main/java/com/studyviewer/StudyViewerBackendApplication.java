package com.studyviewer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
public class StudyViewerBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudyViewerBackendApplication.class, args);
	}

}
