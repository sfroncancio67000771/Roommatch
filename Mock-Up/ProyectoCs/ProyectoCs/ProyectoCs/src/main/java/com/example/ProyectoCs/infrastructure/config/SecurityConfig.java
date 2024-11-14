package com.example.ProyectoCs.infrastructure.config;

import com.example.ProyectoCs.application.service.CustomUserDetailsService;
import com.example.ProyectoCs.infrastructure.gateway.EstudianteGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
public class SecurityConfig {

    private final CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;
    private final EstudianteGateway estudianteGateway;

    @Autowired
    public SecurityConfig(CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler, EstudianteGateway estudianteGateway) {
        this.customAuthenticationSuccessHandler = customAuthenticationSuccessHandler;
        this.estudianteGateway = estudianteGateway;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        // Aquí pasamos el EstudianteGateway al constructor de CustomUserDetailsService
        return new CustomUserDetailsService(estudianteGateway);
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
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
                        .failureUrl("http://127.0.0.1:5502/Errores/504.html")
                        .successHandler(customAuthenticationSuccessHandler)
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("http://127.0.0.1:5501/Navegabilidad%20Roommatch/Pagina%20principal/Espa%C3%B1ol.html")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .clearAuthentication(true)
                ).formLogin(form -> form
                        .loginPage("/login")
                        .successHandler((request, response, authentication) -> response.sendRedirect("/redirectAfterLogin"))
                        .failureUrl("/loginFailure")
                )
                .csrf().disable();


        return http.build();
}
}