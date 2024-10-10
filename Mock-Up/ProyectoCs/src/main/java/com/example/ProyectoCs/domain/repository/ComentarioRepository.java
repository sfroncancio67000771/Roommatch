package com.example.ProyectoCs.domain.repository;

import com.example.ProyectoCs.domain.model.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ComentarioRepository extends JpaRepository<Comentario, UUID> {
}
