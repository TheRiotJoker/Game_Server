package com.example.game_server.controllers;

import com.example.game_server.services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.Arrays;

@Controller
public class GameController {

    private final PlayerService playerService;

    @Autowired
    public GameController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @RequestMapping("listPlayers")
    public ModelAndView listAllPlayers() {
        ModelAndView modelAndView = new ModelAndView();
        System.out.println(Arrays.toString(playerService.getAllPlayers()));
        modelAndView.addObject("playernames", playerService.getAllPlayers());
        modelAndView.setViewName("Player_List");
        return modelAndView;
    }
    @RequestMapping("game")
    public ModelAndView getGame() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("Game_Page");
        return modelAndView;
    }
    @PostMapping("/submitScore")
    public ResponseEntity<String> submitScorePlayer(String username, String password, int finalHighscore) {
        System.out.println("Username: "+username+" achieved: "+finalHighscore+" points!");
        if(finalHighscore >= 150) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Password!");
        }
    }
}
