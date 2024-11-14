package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.application.dto.HistorialRecomendacionDTO;

public interface HistorialRecomendacionGateway {
    void guardarHistorialRecomendacion(HistorialRecomendacionDTO historialRecomendacionDTO);
}
