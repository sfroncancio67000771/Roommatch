package com.example.ProyectoCs.domain.repository;

import com.example.ProyectoCs.domain.model.Alojamiento;
import com.example.ProyectoCs.domain.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByEstudianteEmail(String emailEstudiante);
    List<Reserva> findByAlojamiento(Alojamiento alojamiento);

}
