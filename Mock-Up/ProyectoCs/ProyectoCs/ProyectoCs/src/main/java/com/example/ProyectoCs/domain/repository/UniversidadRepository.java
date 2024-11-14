package com.example.ProyectoCs.domain.repository;

import com.example.ProyectoCs.domain.model.Universidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UniversidadRepository extends JpaRepository<Universidad, Long> {
}
