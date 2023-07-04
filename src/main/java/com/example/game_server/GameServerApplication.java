package com.example.game_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.example.game_server.models")
public class GameServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(GameServerApplication.class, args);
    }

}
