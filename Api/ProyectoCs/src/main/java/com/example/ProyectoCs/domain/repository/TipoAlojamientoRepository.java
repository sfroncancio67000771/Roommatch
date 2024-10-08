package com.example.ProyectoCs.domain.repository;

import com.example.ProyectoCs.domain.model.TipoAlojamiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoAlojamientoRepository extends JpaRepository<TipoAlojamiento, Long> {
}
