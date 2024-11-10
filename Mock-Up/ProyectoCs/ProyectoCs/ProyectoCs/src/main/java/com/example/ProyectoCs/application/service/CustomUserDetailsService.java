package com.example.ProyectoCs.application.service;

import com.example.ProyectoCs.application.usecase.EstudianteUserDetails;
import com.example.ProyectoCs.application.usecase.PropietarioUserDetails;
import com.example.ProyectoCs.domain.model.Estudiante;
import com.example.ProyectoCs.domain.model.Propietario;
import com.example.ProyectoCs.domain.repository.EstudianteRepository;
import com.example.ProyectoCs.domain.repository.PropietarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private EstudianteRepository estudianteRepository;

    @Autowired
    private PropietarioRepository propietarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Buscar en la tabla Estudiante
        Estudiante estudiante = estudianteRepository.findByEmail(email);

        if (estudiante != null) {
            return new EstudianteUserDetails(estudiante);
        }

        // Si no se encuentra en la tabla Estudiante, buscar en la tabla Propietario
        Optional<Propietario> propietario = propietarioRepository.findByEmail(email);

        if (propietario != null) {
            return new PropietarioUserDetails(propietario);
        }

        // Si no se encuentra el usuario en ninguna de las dos tablas, lanzar excepción
        throw new UsernameNotFoundException("Usuario no encontrado con el email: " + email);
    }
}
