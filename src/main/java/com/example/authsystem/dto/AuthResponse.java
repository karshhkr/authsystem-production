package com.example.authsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponse {
    private String token; // Access Token
    private String refreshToken;

    @Builder.Default
    private String type = "Bearer";

    private Long id;
    private String name;
    private String email;
    private String role;
}