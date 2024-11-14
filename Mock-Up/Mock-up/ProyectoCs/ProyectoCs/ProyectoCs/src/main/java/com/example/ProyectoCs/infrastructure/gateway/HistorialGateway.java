package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.application.dto.HistorialDTO;

public interface HistorialGateway {
    void saveHistorial(HistorialDTO historialDTO);

    void guardarHistorial(HistorialDTO historialDTO);
}
