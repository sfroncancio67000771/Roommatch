package com.example.ProyectoCs.application.service;

import com.example.ProyectoCs.infrastructure.gateway.HistorialRecomendacionGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
public class HistorialRecomendacionService {

    private final HistorialRecomendacionGateway historialRecomendacionGateway;

    @Autowired
    public HistorialRecomendacionService(@Lazy HistorialRecomendacionGateway historialRecomendacionGateway) {
        this.historialRecomendacionGateway = historialRecomendacionGateway;
    }
}
