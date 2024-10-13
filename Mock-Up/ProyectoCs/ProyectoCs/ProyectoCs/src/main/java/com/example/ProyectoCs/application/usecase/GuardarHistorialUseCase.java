package com.example.ProyectoCs.application.usecase;

import com.example.ProyectoCs.application.dto.HistorialDTO;
import com.example.ProyectoCs.infrastructure.gateway.HistorialGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GuardarHistorialUseCase {

    private final HistorialGateway historialGateway;

    @Autowired
    public GuardarHistorialUseCase(HistorialGateway historialGateway) {
        this.historialGateway = historialGateway;
    }

    public void execute(HistorialDTO historialDTO) {
        historialGateway.guardarHistorial(historialDTO);
    }
}
