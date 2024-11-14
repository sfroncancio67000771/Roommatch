package com.example.ProyectoCs.infrastructure.persistence;

import com.example.ProyectoCs.domain.model.Estudiante;
import com.example.ProyectoCs.domain.repository.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class EstudiantePersistenceService {

    private final EstudianteRepository estudianteRepository;

    @Autowired
    public EstudiantePersistenceService(EstudianteRepository estudianteRepository) {
        this.estudianteRepository = estudianteRepository;
    }

    public Estudiante findEstudianteById(UUID idEstudiante) { // Corregir el tipo de dato del parámetro a UUID
        return estudianteRepository.findById(idEstudiante)
                .orElseThrow(() -> new IllegalArgumentException("Estudiante no encontrado con ID: " + idEstudiante));
    }
}
