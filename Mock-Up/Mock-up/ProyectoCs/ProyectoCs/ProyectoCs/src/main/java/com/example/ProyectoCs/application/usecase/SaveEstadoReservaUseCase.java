package com.example.ProyectoCs.application.usecase;

import com.example.ProyectoCs.application.dto.EstadoReservaDTO;
import com.example.ProyectoCs.infrastructure.gateway.EstadoReservaGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SaveEstadoReservaUseCase {

    private final EstadoReservaGateway estadoReservaGateway;

    @Autowired
    public SaveEstadoReservaUseCase(EstadoReservaGateway estadoReservaGateway) {
        this.estadoReservaGateway = estadoReservaGateway;
    }

    public void ejecutar(EstadoReservaDTO estadoReservaDTO) {
        estadoReservaGateway.saveEstadoReserva(estadoReservaDTO);
    }
}
