package com.example.authsystem.service;
import com.example.authsystem.dto.AuthResponse;
import com.example.authsystem.dto.LoginRequest;
import com.example.authsystem.dto.RegisterRequest;
import com.example.authsystem.dto.UserResponse;
import com.example.authsystem.entity.User;
public interface UserService {
    UserResponse registerUser(RegisterRequest request);
   AuthResponse login(LoginRequest request);
}
