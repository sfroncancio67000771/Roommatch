package com.example.ProyectoCs.domain.repository;

import com.example.ProyectoCs.domain.model.Propietario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PropietarioRepository extends JpaRepository<Propietario, Long> {
    Optional<Propietario> findByEmail(String email);
    Optional<Propietario> findById(Long id);
}