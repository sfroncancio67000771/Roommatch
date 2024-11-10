package com.example.ProyectoCs.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
public class SecurityConfig {

    private final CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;

    // Inyectar el CustomAuthenticationSuccessHandler
    public SecurityConfig(CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler) {
        this.customAuthenticationSuccessHandler = customAuthenticationSuccessHandler;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests(auth -> auth
                        .requestMatchers("/", "/login", "/oauth2/**",
                                "/api/v1/estudiantes/**",  // Estudiantes
                                "/api/v1/estudiantes/reservas/**",  // Reservas de estudiantes
                                "/api/v1/propietarios/registrar",
                                "/error", "/api/v1/alojamiento/**",
                                "/api/v1/fotos/**", "/public").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/login")
                        .failureUrl("/loginFailure")
                        .successHandler(customAuthenticationSuccessHandler)  // Configurar el handler
                )
                .csrf().disable();  // Deshabilitar CSRF si no es necesario

        return http.build();
    }
}
