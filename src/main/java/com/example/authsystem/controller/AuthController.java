package com.example.authsystem.controller;

import com.example.authsystem.dto.AuthResponse;
import com.example.authsystem.dto.LoginRequest;
import com.example.authsystem.dto.RefreshTokenRequest;
import com.example.authsystem.dto.RegisterRequest;
import com.example.authsystem.dto.UserResponse;
import com.example.authsystem.service.RefreshTokenService;
import com.example.authsystem.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5174")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final RefreshTokenService refreshTokenService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.registerUser(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(userService.login(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<Map<String, String>> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        String newAccessToken = refreshTokenService.refreshAccessToken(request.refreshToken());
        return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(@Valid @RequestBody RefreshTokenRequest request) {
        refreshTokenService.logout(request.refreshToken());
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }
}