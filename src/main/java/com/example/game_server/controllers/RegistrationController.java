package com.example.game_server.controllers;

import com.example.game_server.services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/playerRegistration")
public class RegistrationController {
    private final PlayerService playerService;

    @Autowired
    public RegistrationController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @RequestMapping
    public ModelAndView openRegistration() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("Register_Page");
        return modelAndView;
    }
    @PostMapping
    public ModelAndView registrationAttempt(@RequestParam("username") String username,
                                            @RequestParam("password") String password) {
        playerService.registerUser(username,password);
        return openRegistration();
    }

}
