package com.example.authsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;

@SpringBootApplication(exclude = { UserDetailsServiceAutoConfiguration.class })
public class AuthsystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuthsystemApplication.class, args);
    }

}