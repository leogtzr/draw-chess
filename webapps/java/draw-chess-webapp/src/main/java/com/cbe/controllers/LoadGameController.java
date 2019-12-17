package com.cbe.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoadGameController {
    @GetMapping("/load.do")
    public String loadGame(@RequestParam("name") final String name) {
        return "loadGame";
    }
}
