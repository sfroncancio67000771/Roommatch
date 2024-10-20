package com.example.ProyectoCs.presentation;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {

    // Método para mostrar el formulario de inicio de sesión
    @GetMapping("/login")
    public String login() {
        return "login"; // Asegúrate de tener un login.html en templates
    }

    // Método para manejar la falla en el inicio de sesión
    @GetMapping("/loginFailure")
    public String loginFailure() {
        return "loginFailure"; // Asegúrate de tener un loginFailure.html en templates
    }

    // Método para redirigir al usuario después del inicio de sesión exitoso
    @GetMapping("/redirectAfterLogin")
    public ModelAndView redirectAfterLogin() {
        // Obtén la autenticación actual
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Verifica si el usuario tiene el rol de "ESTUDIANTE"
        if (authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ESTUDIANTE"))) {
            // Redirige a la página específica para estudiantes
            return new ModelAndView("redirect:/paginaPrincipalEstudiante"); // Cambia la URL según sea necesario
        }

        // Redirige a una página genérica si no es "ESTUDIANTE"
        return new ModelAndView("redirect:/paginaPrincipal");
    }
}


