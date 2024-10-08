package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.application.dto.ComentarioDTO;
import com.example.ProyectoCs.domain.model.Comentario;
import com.example.ProyectoCs.domain.model.Estudiante;
import com.example.ProyectoCs.domain.repository.ComentarioRepository;
import com.example.ProyectoCs.domain.repository.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class ComentarioGatewayImpl implements ComentarioGateway {

    private final EstudianteRepository estudianteRepository;
    private final ComentarioRepository comentarioRepository;

    @Autowired
    public ComentarioGatewayImpl(EstudianteRepository estudianteRepository, ComentarioRepository comentarioRepository) {
        this.estudianteRepository = estudianteRepository;
        this.comentarioRepository = comentarioRepository;
    }

    @Override
    public void guardarComentario(ComentarioDTO comentarioDTO) {
        Estudiante estudiante = estudianteRepository.findById(UUID.fromString(String.valueOf(comentarioDTO.getIdEstudiante())))
                .orElseThrow(() -> new IllegalArgumentException("Estudiante no encontrado"));

        Comentario comentario = new Comentario();
        comentario.setEstudiante(estudiante);
        comentario.setComentario(comentarioDTO.getComentario());

        comentarioRepository.save(comentario);
    }
}
