package com.example.ProyectoCs.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
public class SecurityConfig {

    private final CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;

    public SecurityConfig(CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler) {
        this.customAuthenticationSuccessHandler = customAuthenticationSuccessHandler;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/login", "/logout", "/oauth2/",
                                "/api/v1/estudiantes/**",
                                "/api/v1/propietarios/**",
                                "/api/v1/estudiantes/reservas/**",
                                "/api/v1/propietarios/registrar",
                                "/error", "/api/v1/alojamiento/**",
                                "/api/v1/fotos/**", "/public",
                                "/api/v1/propietarios/habitaciones/conteo",
                                "/api/v1/propietarios/habitaciones/precios").permitAll()  // Agrega esta ruta
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/login")
                        .failureUrl("http://127.0.0.1:5501/Errores/504.html")
                        .successHandler(customAuthenticationSuccessHandler)
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("http://127.0.0.1:5501/Navegabilidad%20Roommatch/Pagina%20principal/Espa%C3%B1ol.html")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .clearAuthentication(true)
                )
                .csrf().disable();

        return http.build();
}
}