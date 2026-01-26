package com.example.authsystem.security;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "mysecretkey123";

    public String generateToken(String email) {

        return Jwts.builder()
                .setSubject(email)                 // user identity
                .setIssuedAt(new Date())            // token issue time
                .setExpiration(
                        new Date(System.currentTimeMillis() + 1000 * 60 * 60)
                )                                   // 1 hour
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
}
