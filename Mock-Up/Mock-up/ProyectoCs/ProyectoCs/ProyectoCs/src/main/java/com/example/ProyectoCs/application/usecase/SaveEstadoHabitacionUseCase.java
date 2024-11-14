package com.example.ProyectoCs.application.usecase;

import com.example.ProyectoCs.application.dto.EstadoHabitacionDTO;
import com.example.ProyectoCs.infrastructure.gateway.EstadoHabitacionGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SaveEstadoHabitacionUseCase {

    private final EstadoHabitacionGateway estadoHabitacionGateway;

    @Autowired
    public SaveEstadoHabitacionUseCase(EstadoHabitacionGateway estadoHabitacionGateway) {
        this.estadoHabitacionGateway = estadoHabitacionGateway;
    }

    public void ejecutar(EstadoHabitacionDTO estadoHabitacionDTO) {
        estadoHabitacionGateway.saveEstadoHabitacion(estadoHabitacionDTO);
    }
}
