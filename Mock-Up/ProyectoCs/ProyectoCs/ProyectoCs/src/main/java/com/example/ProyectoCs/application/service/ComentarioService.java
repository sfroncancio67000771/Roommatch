package com.example.ProyectoCs.application.service;

import com.example.ProyectoCs.application.dto.ComentarioDTO;
import com.example.ProyectoCs.application.usecase.GuardarComentarioUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComentarioService {

    private final GuardarComentarioUseCase guardarComentarioUseCase;

    @Autowired
    public ComentarioService(GuardarComentarioUseCase guardarComentarioUseCase) {
        this.guardarComentarioUseCase = guardarComentarioUseCase;
    }

    public void guardarComentario(ComentarioDTO comentarioDTO) {
        guardarComentarioUseCase.ejecutar(comentarioDTO);
    }
}
