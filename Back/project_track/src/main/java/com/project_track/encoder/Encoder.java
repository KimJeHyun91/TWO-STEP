package com.project_track.encoder;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class Encoder {
	@Bean
	public PasswordEncoder password_encoder() {
		return new BCryptPasswordEncoder();
	}
}
