package com.example.ProyectoCs.application.usecase;

import com.example.ProyectoCs.application.dto.HistorialRecomendacionDTO;
import com.example.ProyectoCs.infrastructure.gateway.HistorialRecomendacionGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GuardarHistorialRecomendacionUseCase {

    private final HistorialRecomendacionGateway historialRecomendacionGateway;

    @Autowired
    public GuardarHistorialRecomendacionUseCase(HistorialRecomendacionGateway historialRecomendacionGateway) {
        this.historialRecomendacionGateway = historialRecomendacionGateway;
    }

    public void execute(HistorialRecomendacionDTO historialRecomendacionDTO) {
        historialRecomendacionGateway.guardarHistorialRecomendacion(historialRecomendacionDTO);
    }
}
