package com.example.ProyectoCs.application.service;

import com.example.ProyectoCs.infrastructure.gateway.HistorialGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
public class HistorialService {

    private final HistorialGateway historialGateway;

    @Autowired
    public HistorialService(@Lazy HistorialGateway historialGateway) {
        this.historialGateway = historialGateway;
    }

    // Otros métodos del servicio
}
