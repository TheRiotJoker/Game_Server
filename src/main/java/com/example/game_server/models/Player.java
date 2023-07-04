package com.example.game_server.models;


import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
public class Player {

    @Id
    @GeneratedValue(generator = "uuid2")
    @UuidGenerator
    @Column(name = "player_id", columnDefinition = "uuid")
    private UUID id;

    @Column(unique = true)
    private String username;
    private String password;

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getId() {
        return id;
    }
}
