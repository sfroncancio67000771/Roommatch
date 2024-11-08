package com.example.ProyectoCs.application.usecase;

import com.example.ProyectoCs.application.dto.ComentarioDTO;
import com.example.ProyectoCs.infrastructure.gateway.ComentarioGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GuardarComentarioUseCase {

    private final ComentarioGateway comentarioGateway;

    @Autowired
    public GuardarComentarioUseCase(ComentarioGateway comentarioGateway) {
        this.comentarioGateway = comentarioGateway;
    }

    public void ejecutar(ComentarioDTO comentarioDTO) {
        comentarioGateway.guardarComentario(comentarioDTO);
    }
}
