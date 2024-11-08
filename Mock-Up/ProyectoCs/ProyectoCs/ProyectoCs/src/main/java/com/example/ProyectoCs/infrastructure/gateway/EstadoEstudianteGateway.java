package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.application.dto.EstadoEstudianteDTO;

public interface EstadoEstudianteGateway {
    void saveEstadoEstudiante(EstadoEstudianteDTO estadoEstudianteDTO);
}
