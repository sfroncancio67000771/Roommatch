package com.example.ProyectoCs.application.usecase;

import com.example.ProyectoCs.application.dto.PreferenciaEstudianteDTO;
import com.example.ProyectoCs.application.service.PreferenciaEstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SavePreferenciaEstudianteUseCase {

    private final PreferenciaEstudianteService preferenciaEstudianteService;

    @Autowired
    public SavePreferenciaEstudianteUseCase(PreferenciaEstudianteService preferenciaEstudianteService) {
        this.preferenciaEstudianteService = preferenciaEstudianteService;
    }

    public void execute(PreferenciaEstudianteDTO preferenciaEstudianteDTO) {
        preferenciaEstudianteService.savePreferenciaEstudiante(preferenciaEstudianteDTO);
    }
}
