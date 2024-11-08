package com.example.ProyectoCs.application.service;

import com.example.ProyectoCs.application.dto.EstadoPropietarioDTO;
import com.example.ProyectoCs.application.usecase.SaveEstadoPropietarioUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EstadoPropietarioService {

    private final SaveEstadoPropietarioUseCase saveEstadoPropietarioUseCase;

    @Autowired
    public EstadoPropietarioService(SaveEstadoPropietarioUseCase saveEstadoPropietarioUseCase) {
        this.saveEstadoPropietarioUseCase = saveEstadoPropietarioUseCase;
    }

    public void saveEstadoPropietario(EstadoPropietarioDTO estadoPropietarioDTO) {
        saveEstadoPropietarioUseCase.ejecutar(estadoPropietarioDTO);
    }
}
