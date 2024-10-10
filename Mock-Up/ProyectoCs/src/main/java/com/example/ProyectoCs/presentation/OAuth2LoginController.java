package com.example.ProyectoCs.presentation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class OAuth2LoginController {
    @GetMapping("/login/oauth2/code/microsoft")
    public String redirectMicrosoft() {
        // Redirigir a la página de filtros después de un inicio de sesión exitoso
        return "redirect:http://127.0.0.1:5501/Filtros/Pagina%20Filtros.html";
    }
}


