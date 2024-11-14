package com.example.ProyectoCs.domain.repository;

import com.example.ProyectoCs.domain.model.Alojamiento;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AlojamientoRepository extends JpaRepository<Alojamiento, Integer> {
    @Modifying
    @Transactional
    @Query(value = "ALTER TABLE alojamiento DROP FOREIGN KEY FKcmv5pg5sr9sdyjpsxch9lv0vd", nativeQuery = true)
    void dropForeignKey();
    List<Alojamiento> findAll(); // Este método ya está disponible por herencia
    Optional<Alojamiento> findByIdAlojamiento(int idAlojamiento);
    @Query("SELECT COUNT(a) FROM Alojamiento a WHERE a.propietario.idPropietario = :idPropietario")
    int contarHabitacionesPorPropietario(@Param("idPropietario") long idPropietario);

    @Query("SELECT COUNT(a) FROM Alojamiento a WHERE a.propietario.idPropietario = :idPropietario AND a.estadoHabitacion.idEstadoHabitacion = :reservadoId")
    int contarHabitacionesReservadas(@Param("idPropietario") long idPropietario, @Param("reservadoId") int reservadoId);

    @Query("SELECT a.nombreAlojamiento, a.precio FROM Alojamiento a WHERE a.propietario.idPropietario = :idPropietario")
    List<Object[]> obtenerNombresYPreciosHabitaciones(@Param("idPropietario") long idPropietario);

}
