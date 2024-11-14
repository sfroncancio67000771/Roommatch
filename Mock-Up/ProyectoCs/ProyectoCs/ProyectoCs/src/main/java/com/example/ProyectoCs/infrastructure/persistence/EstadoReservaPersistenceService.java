package com.example.ProyectoCs.infrastructure.persistence;

import com.example.ProyectoCs.domain.model.EstadoReserva;
import com.example.ProyectoCs.domain.repository.EstadoReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EstadoReservaPersistenceService {

    private final EstadoReservaRepository estadoReservaRepository;

    @Autowired
    public EstadoReservaPersistenceService(EstadoReservaRepository estadoReservaRepository) {
        this.estadoReservaRepository = estadoReservaRepository;
    }

    public EstadoReserva findEstadoReservaById(Long idEstadoReserva) {
        return estadoReservaRepository.findById(idEstadoReserva)
                .orElseThrow(() -> new IllegalArgumentException("Estado de reserva no encontrado con ID: " + idEstadoReserva));
    }
}
