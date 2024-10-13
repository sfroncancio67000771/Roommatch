package com.example.ProyectoCs.application.service;

import com.example.ProyectoCs.application.dto.EstudianteDTO;
import com.example.ProyectoCs.domain.model.EstadoEstudiante;
import com.example.ProyectoCs.domain.model.Estudiante;
import com.example.ProyectoCs.domain.model.Universidad;
import com.example.ProyectoCs.domain.repository.EstadoEstudianteRepository;
import com.example.ProyectoCs.domain.repository.EstudianteRepository;
import com.example.ProyectoCs.domain.repository.UniversidadRepository;
import com.example.ProyectoCs.infrastructure.gateway.EstudianteGateway;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.Optional;
import java.util.UUID;

@Service
public class EstudianteService {

    private final EstudianteGateway estudianteGateway;

    @Autowired
    public EstudianteService(EstudianteGateway estudianteGateway) {
        this.estudianteGateway = estudianteGateway;
    }

    public void registrarEstudiante(EstudianteDTO estudianteDTO) throws MessagingException, jakarta.mail.MessagingException {
        estudianteGateway.registrarEstudiante(estudianteDTO);
    }

    public void eliminarEstudiante(String email) throws MessagingException, jakarta.mail.MessagingException {
        estudianteGateway.eliminarEstudiante(email);
    }
}
