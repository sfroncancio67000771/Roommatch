package com.example.ProyectoCs.application.service;

import com.example.ProyectoCs.domain.model.Rol;
import com.example.ProyectoCs.domain.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
public class RolInitializationService {

    private final RolRepository rolRepository;

    @Autowired
    public RolInitializationService(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    @PostConstruct
    public void init() {
        // Verificar si el rol "ESTUDIANTE" ya existe en la base de datos
        Rol rolEstudiante = rolRepository.findByNombre("ESTUDIANTE");
        if (rolEstudiante == null) {
            // Si no existe, crearlo
            rolEstudiante = new Rol();
            rolEstudiante.setNombre("ESTUDIANTE");
            rolRepository.save(rolEstudiante);
            System.out.println("Rol 'ESTUDIANTE' creado.");
        } else {
            System.out.println("Rol 'ESTUDIANTE' ya existe.");
        }
    }
}
