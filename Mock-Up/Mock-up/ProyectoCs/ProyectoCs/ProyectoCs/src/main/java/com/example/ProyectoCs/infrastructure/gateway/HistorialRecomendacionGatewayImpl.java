package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.application.dto.HistorialRecomendacionDTO;
import com.example.ProyectoCs.application.usecase.GuardarHistorialRecomendacionUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component
public class HistorialRecomendacionGatewayImpl implements HistorialRecomendacionGateway {

    private GuardarHistorialRecomendacionUseCase guardarHistorialRecomendacionUseCase;

    @Autowired
    public void setGuardarHistorialRecomendacionUseCase(@Lazy GuardarHistorialRecomendacionUseCase guardarHistorialRecomendacionUseCase) {
        this.guardarHistorialRecomendacionUseCase = guardarHistorialRecomendacionUseCase;
    }

    @Override
    public void guardarHistorialRecomendacion(HistorialRecomendacionDTO historialRecomendacionDTO) {
        // Implementación del método
    }
}
