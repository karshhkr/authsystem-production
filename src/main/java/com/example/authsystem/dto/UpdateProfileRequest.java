package com.example.authsystem.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class UpdateProfileRequest {
    @NotEmpty
public String name;
}
