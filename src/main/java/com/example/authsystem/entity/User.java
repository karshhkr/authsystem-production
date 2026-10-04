package com.example.authsystem.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    // enum role stored as string
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // soft delete with Lombok Builder default fallback mapped to is_deleted column
    @Builder.Default
    @Column(name = "is_deleted", nullable = false, columnDefinition = "boolean default false")

    private boolean isDeleted = false;

    @Column(name = "deleted_at")
    private Instant deletedAt;

    public void setIsDeleted(boolean b) {
    }
}