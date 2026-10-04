package com.example.authsystem.repository;

import com.example.authsystem.entity.RefreshToken;
import com.example.authsystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);

    @Query("SELECT r FROM RefreshToken r JOIN FETCH r.user WHERE r.token = :token")
    Optional<RefreshToken> findByTokenWithUser(@Param("token") String token);

    @Modifying
    int deleteByUser(User user);
}