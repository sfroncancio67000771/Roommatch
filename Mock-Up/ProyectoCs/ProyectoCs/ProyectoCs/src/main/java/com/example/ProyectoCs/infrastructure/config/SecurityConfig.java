package com.example.ProyectoCs.infrastructure.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Autowired
    private CustomAuthenticationSuccessHandler successHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/login", "/oauth2/**", "/api/v1/estudiantes/registrar",
                                "/api/v1/propietarios/registrar", "/api/v1/propietarios/crearhab",
                                "/api/v1/estudiantes/crear", "/api/v1/alojamiento/filtrar", "/error") // Permitir acceso a /error
                        .permitAll()
                        .anyRequest().authenticated() // Las demás rutas requieren autenticación
                )
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/login")
                        .successHandler(successHandler)
                        .failureUrl("/loginFailure")
                )
                .csrf().disable(); // Deshabilitar CSRF si no es necesario
        return http.build();
    }
}
