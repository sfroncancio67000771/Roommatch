package com.example.ProyectoCs.domain.repository;

import com.example.ProyectoCs.domain.model.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EstudianteRepository extends JpaRepository<Estudiante, UUID> {
    Estudiante findByEmail(String email);
}
