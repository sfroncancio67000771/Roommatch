package com.example.ProyectoCs.application.service;

import com.example.ProyectoCs.application.dto.EstadoReservaDTO;
import com.example.ProyectoCs.application.usecase.SaveEstadoReservaUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EstadoReservaService {

    private final SaveEstadoReservaUseCase saveEstadoReservaUseCase;

    @Autowired
    public EstadoReservaService(SaveEstadoReservaUseCase saveEstadoReservaUseCase) {
        this.saveEstadoReservaUseCase = saveEstadoReservaUseCase;
    }

    public void saveEstadoReserva(EstadoReservaDTO estadoReservaDTO) {
        saveEstadoReservaUseCase.ejecutar(estadoReservaDTO);
    }
}
