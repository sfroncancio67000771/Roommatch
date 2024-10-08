package com.example.ProyectoCs.application.service;

import com.example.ProyectoCs.application.dto.EstadoEstudianteDTO;
import com.example.ProyectoCs.application.usecase.SaveEstadoEstudianteUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EstadoEstudianteService {

    private final SaveEstadoEstudianteUseCase saveEstadoEstudianteUseCase;

    @Autowired
    public EstadoEstudianteService(SaveEstadoEstudianteUseCase saveEstadoEstudianteUseCase) {
        this.saveEstadoEstudianteUseCase = saveEstadoEstudianteUseCase;
    }

    public void saveEstadoEstudiante(EstadoEstudianteDTO estadoEstudianteDTO) {
        saveEstadoEstudianteUseCase.ejecutar(estadoEstudianteDTO);
    }
}
