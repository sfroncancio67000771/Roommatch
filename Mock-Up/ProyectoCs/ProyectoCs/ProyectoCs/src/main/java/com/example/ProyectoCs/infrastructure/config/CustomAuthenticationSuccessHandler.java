package com.example.ProyectoCs.infrastructure.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    // La URL de redirección se puede manejar de forma más flexible
    private final String targetUrl = "http://127.0.0.1:5501/Navegabilidad%20Roommatch/Pagina%20principal/Home_Login.html";

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        // Aquí podrías agregar más lógica si es necesario
        // Como un log o alguna verificación adicional antes de redirigir

        // Redirección a la página deseada
        response.sendRedirect(targetUrl);
    }
}
