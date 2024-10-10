package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.application.dto.HistorialDTO;
import com.example.ProyectoCs.application.usecase.GuardarHistorialUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component
public class HistorialGatewayImpl implements HistorialGateway {

    private GuardarHistorialUseCase guardarHistorialUseCase;

    @Autowired
    public void setGuardarHistorialUseCase(@Lazy GuardarHistorialUseCase guardarHistorialUseCase) {
        this.guardarHistorialUseCase = guardarHistorialUseCase;
    }

    @Override
    public void saveHistorial(HistorialDTO historialDTO) {

    }

    @Override
    public void guardarHistorial(HistorialDTO historialDTO) {

    }
}
