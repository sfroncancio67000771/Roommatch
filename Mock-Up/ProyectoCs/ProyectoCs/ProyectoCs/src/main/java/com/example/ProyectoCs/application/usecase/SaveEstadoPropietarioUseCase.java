package com.example.ProyectoCs.application.usecase;

import com.example.ProyectoCs.application.dto.EstadoPropietarioDTO;
import com.example.ProyectoCs.infrastructure.gateway.EstadoPropietarioGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SaveEstadoPropietarioUseCase {

    private final EstadoPropietarioGateway estadoPropietarioGateway;

    @Autowired
    public SaveEstadoPropietarioUseCase(EstadoPropietarioGateway estadoPropietarioGateway) {
        this.estadoPropietarioGateway = estadoPropietarioGateway;
    }

    public void ejecutar(EstadoPropietarioDTO estadoPropietarioDTO) {
        estadoPropietarioGateway.saveEstadoPropietario(estadoPropietarioDTO);
    }
}
