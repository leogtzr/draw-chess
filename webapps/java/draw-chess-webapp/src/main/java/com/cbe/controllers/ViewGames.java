package com.cbe.controllers;

import com.cbe.persistence.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class ViewGames {

    @Autowired
    private GameRepository gameRepository;

    @GetMapping("/viewgames.do")
    public String viewGames(final Model model) {
        final List<String> names = gameRepository.names();
        model.addAttribute("names", names);
        return "viewGames";
    }
}
