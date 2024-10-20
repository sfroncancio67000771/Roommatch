package com.example.ProyectoCs.application.service;


import com.example.ProyectoCs.domain.model.Estudiante;
import com.example.ProyectoCs.infrastructure.gateway.EstudianteGateway;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;



@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final EstudianteGateway estudianteGateway;

    public CustomUserDetailsService(EstudianteGateway estudianteGateway) {
        this.estudianteGateway = estudianteGateway;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Cargar el estudiante completo por email
        Estudiante estudiante = estudianteGateway.buscarEstudiantePorEmail(email);

        // Si el estudiante no existe, lanzar excepción
        if (estudiante == null) {
            throw new UsernameNotFoundException("Estudiante no encontrado con el email: " + email);
        }

        // Devolver el objeto User de Spring Security
        return User.withUsername(estudiante.getEmail())  // El email será el nombre de usuario
                .password(estudiante.getContraseña()) // Cargar la contraseña cifrada
                .roles(estudiante.getRole()) // Asignar el rol del estudiante
                .build();
    }
}
