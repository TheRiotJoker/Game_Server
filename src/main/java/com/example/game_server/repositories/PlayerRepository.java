package com.example.game_server.repositories;


import com.example.game_server.models.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Long> {
    public List<Player> findAll();
}
