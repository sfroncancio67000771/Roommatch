package com.example.ProyectoCs.application.usecase;

import com.example.ProyectoCs.application.dto.EstadoEstudianteDTO;
import com.example.ProyectoCs.infrastructure.gateway.EstadoEstudianteGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SaveEstadoEstudianteUseCase {

    private final EstadoEstudianteGateway estadoEstudianteGateway;

    @Autowired
    public SaveEstadoEstudianteUseCase(EstadoEstudianteGateway estadoEstudianteGateway) {
        this.estadoEstudianteGateway = estadoEstudianteGateway;
    }

    public void ejecutar(EstadoEstudianteDTO estadoEstudianteDTO) {
        estadoEstudianteGateway.saveEstadoEstudiante(estadoEstudianteDTO);
    }
}
