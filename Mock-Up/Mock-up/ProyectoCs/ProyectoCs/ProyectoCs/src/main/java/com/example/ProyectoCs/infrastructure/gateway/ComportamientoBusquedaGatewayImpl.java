package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.application.dto.ComportamientoBusquedaDTO;
import com.example.ProyectoCs.domain.model.ComportamientoBusqueda;
import com.example.ProyectoCs.domain.model.Estudiante;
import com.example.ProyectoCs.domain.repository.ComportamientoBusquedaRepository;
import com.example.ProyectoCs.domain.repository.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class ComportamientoBusquedaGatewayImpl implements ComportamientoBusquedaGateway {

    private final ComportamientoBusquedaRepository comportamientoBusquedaRepository;
    private final EstudianteRepository estudianteRepository;

    @Autowired
    public ComportamientoBusquedaGatewayImpl(ComportamientoBusquedaRepository comportamientoBusquedaRepository,
                                             EstudianteRepository estudianteRepository) {
        this.comportamientoBusquedaRepository = comportamientoBusquedaRepository;
        this.estudianteRepository = estudianteRepository;
    }

    @Override
    public void saveComportamientoBusqueda(ComportamientoBusquedaDTO comportamientoBusquedaDTO) {
        ComportamientoBusqueda comportamientoBusqueda = convertToEntity(comportamientoBusquedaDTO);
        comportamientoBusquedaRepository.save(comportamientoBusqueda);
    }

    private ComportamientoBusqueda convertToEntity(ComportamientoBusquedaDTO comportamientoBusquedaDTO) {
        ComportamientoBusqueda comportamientoBusqueda = new ComportamientoBusqueda();
        comportamientoBusqueda.setIdBusqueda(comportamientoBusquedaDTO.getIdBusqueda());
        comportamientoBusqueda.setFechaHora(comportamientoBusquedaDTO.getFechaHora());
        comportamientoBusqueda.setCriteriosBusqueda(comportamientoBusquedaDTO.getCriteriosBusqueda());
        comportamientoBusqueda.setResultadosVistos(comportamientoBusquedaDTO.getResultadosVistos());
        comportamientoBusqueda.setFavoritos(comportamientoBusquedaDTO.getFavoritos());

        Estudiante estudiante = estudianteRepository.findById(UUID.fromString(String.valueOf(comportamientoBusquedaDTO.getIdEstudiante())))
                .orElseThrow(() -> new IllegalArgumentException("Estudiante no encontrado"));
        comportamientoBusqueda.setEstudiante(estudiante);

        return comportamientoBusqueda;
    }
}
