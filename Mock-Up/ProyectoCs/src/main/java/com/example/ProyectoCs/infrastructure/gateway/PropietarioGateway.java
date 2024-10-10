package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.domain.model.EstadoPropietario;
import com.example.ProyectoCs.domain.model.Propietario;

import java.util.Optional;

public interface PropietarioGateway {

    Optional<Propietario> findByEmail(String email);

    EstadoPropietario findEstadoPropietarioById(Long id);

    String hashPassword(String password);

    void savePropietario(Propietario propietario);
}
