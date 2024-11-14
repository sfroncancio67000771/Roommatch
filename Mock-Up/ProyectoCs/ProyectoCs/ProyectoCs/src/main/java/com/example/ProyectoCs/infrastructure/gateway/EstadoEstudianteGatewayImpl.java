package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.application.dto.EstadoEstudianteDTO;
import com.example.ProyectoCs.domain.model.EstadoEstudiante;
import com.example.ProyectoCs.domain.repository.EstadoEstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EstadoEstudianteGatewayImpl implements EstadoEstudianteGateway {

    private final EstadoEstudianteRepository estadoEstudianteRepository;

    @Autowired
    public EstadoEstudianteGatewayImpl(EstadoEstudianteRepository estadoEstudianteRepository) {
        this.estadoEstudianteRepository = estadoEstudianteRepository;
    }

    @Override
    public void saveEstadoEstudiante(EstadoEstudianteDTO estadoEstudianteDTO) {
        EstadoEstudiante estadoEstudiante = convertToEntity(estadoEstudianteDTO);
        estadoEstudianteRepository.save(estadoEstudiante);
    }

    private EstadoEstudiante convertToEntity(EstadoEstudianteDTO estadoEstudianteDTO) {
        EstadoEstudiante estadoEstudiante = new EstadoEstudiante();
        estadoEstudiante.setIdEstadoEstudiante(estadoEstudianteDTO.getIdEstadoEstudiante());
        estadoEstudiante.setEstadoEstudiante(estadoEstudianteDTO.getEstadoEstudiante());
        return estadoEstudiante;
    }
}
