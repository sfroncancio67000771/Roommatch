package com.example.ProyectoCs.domain.repository;

import com.example.ProyectoCs.domain.model.Alojamiento;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface AlojamientoRepository extends JpaRepository<Alojamiento, Integer> {
    @Modifying
    @Transactional
    @Query(value = "ALTER TABLE alojamiento DROP FOREIGN KEY FKcmv5pg5sr9sdyjpsxch9lv0vd", nativeQuery = true)
    void dropForeignKey();
}
