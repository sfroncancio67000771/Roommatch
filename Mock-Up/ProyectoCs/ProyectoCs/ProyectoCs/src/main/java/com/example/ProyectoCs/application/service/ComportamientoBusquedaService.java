package com.example.ProyectoCs.application.service;

import com.example.ProyectoCs.application.dto.ComportamientoBusquedaDTO;
import com.example.ProyectoCs.application.usecase.SaveComportamientoBusquedaUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComportamientoBusquedaService {

    private final SaveComportamientoBusquedaUseCase saveComportamientoBusquedaUseCase;

    @Autowired
    public ComportamientoBusquedaService(SaveComportamientoBusquedaUseCase saveComportamientoBusquedaUseCase) {
        this.saveComportamientoBusquedaUseCase = saveComportamientoBusquedaUseCase;
    }

    public void saveComportamientoBusqueda(ComportamientoBusquedaDTO comportamientoBusquedaDTO) {
        saveComportamientoBusquedaUseCase.ejecutar(comportamientoBusquedaDTO);
    }
}
