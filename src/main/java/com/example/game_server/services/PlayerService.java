package com.example.game_server.services;

import com.example.game_server.models.Player;
import com.example.game_server.repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public void registerUser(String username, String password) {
        Player player = new Player();
        player.setPassword(password);
        player.setUsername(username);
        playerRepository.save(player);
    }
    public String[] getAllPlayers() {
        List<Player> playerList = playerRepository.findAll();
        String[] strings = new String[playerList.size()];
        int counter = 0;
        for(Player p : playerList) {
            strings[counter] = p.getUsername();
            counter++;
        }
        return strings;
    }
}
