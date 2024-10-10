package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.application.dto.FotoDTO;

import java.io.IOException;

public interface FotoGateway {
    String uploadFoto(FotoDTO fotoDTO) throws IOException;
}
