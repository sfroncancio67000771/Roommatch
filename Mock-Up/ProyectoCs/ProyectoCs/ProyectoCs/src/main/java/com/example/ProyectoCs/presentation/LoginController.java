package com.example.ProyectoCs.presentation;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    @GetMapping("/login")
    public String login() {
        return "login"; // Asegúrate de tener login.html en templates
    }

    @GetMapping("/loginFailure")
    public String loginFailure() {
        return "loginFailure"; // Asegúrate de tener loginFailure.html en templates
    }
}

