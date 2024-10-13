package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.application.dto.EstudianteDTO;
import com.example.ProyectoCs.domain.model.Estudiante;

import javax.mail.MessagingException;

public interface EstudianteGateway {
    void registrarEstudiante(EstudianteDTO estudianteDTO) throws MessagingException, jakarta.mail.MessagingException;
    void eliminarEstudiante(String email) throws MessagingException, jakarta.mail.MessagingException;
    boolean estudianteExistente(String emailEstudiante);

}
