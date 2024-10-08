package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.application.dto.ComentarioDTO;

public interface ComentarioGateway {
    void guardarComentario(ComentarioDTO comentarioDTO);
}
