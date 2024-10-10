package com.example.ProyectoCs.domain.repository;

import com.example.ProyectoCs.domain.model.Foto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FotoRepository extends JpaRepository<Foto, Long> {
}
