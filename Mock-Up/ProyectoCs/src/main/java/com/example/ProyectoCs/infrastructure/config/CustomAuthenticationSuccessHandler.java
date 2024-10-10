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

    private final String targetUrl = "http://127.0.0.1:5501/Sesi%C3%B3n%20Iniciada%20Home/Home_Login.html";

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        // Aquí puedes agregar lógica adicional si es necesario
        response.sendRedirect(targetUrl);
    }
}
