package com.example.ProyectoCs.application.usecase;

import com.example.ProyectoCs.application.dto.FotoDTO;
import com.example.ProyectoCs.infrastructure.gateway.FotoGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class UploadFotoUseCase {

    private final FotoGateway fotoGateway;

    @Autowired
    public UploadFotoUseCase(FotoGateway fotoGateway) {
        this.fotoGateway = fotoGateway;
    }

    public String execute(FotoDTO fotoDTO) throws IOException {
        return fotoGateway.uploadFoto(fotoDTO);
    }
}
