package com.example.ProyectoCs.application.service;

import com.example.ProyectoCs.application.dto.EstadoHabitacionDTO;
import com.example.ProyectoCs.application.usecase.SaveEstadoHabitacionUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EstadoHabitacionService {

    private final SaveEstadoHabitacionUseCase saveEstadoHabitacionUseCase;

    @Autowired
    public EstadoHabitacionService(SaveEstadoHabitacionUseCase saveEstadoHabitacionUseCase) {
        this.saveEstadoHabitacionUseCase = saveEstadoHabitacionUseCase;
    }

    public void saveEstadoHabitacion(EstadoHabitacionDTO estadoHabitacionDTO) {
        saveEstadoHabitacionUseCase.ejecutar(estadoHabitacionDTO);
    }
}
