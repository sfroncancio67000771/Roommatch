package com.example.ProyectoCs.domain.repository;

import com.example.ProyectoCs.domain.model.Foto;
import com.example.ProyectoCs.domain.model.Alojamiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FotoRepository extends JpaRepository<Foto, Integer> {
    List<Foto> findByAlojamiento(Alojamiento alojamiento);
    Foto findFirstByAlojamientoIdAlojamiento(int idAlojamiento);
    void deleteByAlojamiento(Alojamiento alojamiento);

}
