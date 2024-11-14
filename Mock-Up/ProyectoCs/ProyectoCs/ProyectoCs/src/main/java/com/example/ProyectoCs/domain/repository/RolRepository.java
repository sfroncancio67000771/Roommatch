package com.example.ProyectoCs.domain.repository;

import com.example.ProyectoCs.domain.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolRepository extends JpaRepository<Rol, Long> {
    // Cambia 'findByRol' por 'findByNombreRol' para que coincida con el nombre de la propiedad
    Rol findByNombre(String nombre);
}
