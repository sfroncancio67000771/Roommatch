package com.example.ProyectoCs.application.usecase;

import com.example.ProyectoCs.application.dto.EstudianteDTO;
import com.example.ProyectoCs.application.service.EstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;

@Component
public class EstudianteUseCase {

    private final EstudianteService estudianteService;

    @Autowired
    public EstudianteUseCase(EstudianteService estudianteService) {
        this.estudianteService = estudianteService;
    }

    public void registrarEstudiante(EstudianteDTO estudianteDTO) throws MessagingException, jakarta.mail.MessagingException {
        estudianteService.registrarEstudiante(estudianteDTO);
    }

    public void eliminarEstudiante(String email) throws MessagingException, jakarta.mail.MessagingException {
        estudianteService.eliminarEstudiante(email);
    }
}
