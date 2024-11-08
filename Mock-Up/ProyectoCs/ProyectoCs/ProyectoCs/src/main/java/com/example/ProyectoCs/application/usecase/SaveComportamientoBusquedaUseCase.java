package com.example.ProyectoCs.application.usecase;

import com.example.ProyectoCs.application.dto.ComportamientoBusquedaDTO;
import com.example.ProyectoCs.infrastructure.gateway.ComportamientoBusquedaGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SaveComportamientoBusquedaUseCase {

    private final ComportamientoBusquedaGateway comportamientoBusquedaGateway;

    @Autowired
    public SaveComportamientoBusquedaUseCase(ComportamientoBusquedaGateway comportamientoBusquedaGateway) {
        this.comportamientoBusquedaGateway = comportamientoBusquedaGateway;
    }

    public void ejecutar(ComportamientoBusquedaDTO comportamientoBusquedaDTO) {
        comportamientoBusquedaGateway.saveComportamientoBusqueda(comportamientoBusquedaDTO);
    }
}
