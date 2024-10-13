package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.application.dto.EstadoReservaDTO;
import com.example.ProyectoCs.domain.model.EstadoReserva;
import com.example.ProyectoCs.domain.repository.EstadoReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EstadoReservaGatewayImpl implements EstadoReservaGateway {

    private final EstadoReservaRepository estadoReservaRepository;

    @Autowired
    public EstadoReservaGatewayImpl(EstadoReservaRepository estadoReservaRepository) {
        this.estadoReservaRepository = estadoReservaRepository;
    }

    @Override
    public void saveEstadoReserva(EstadoReservaDTO estadoReservaDTO) {
        EstadoReserva estadoReserva = convertToEntity(estadoReservaDTO);
        estadoReservaRepository.save(estadoReserva);
    }

    private EstadoReserva convertToEntity(EstadoReservaDTO estadoReservaDTO) {
        EstadoReserva estadoReserva = new EstadoReserva();
        estadoReserva.setIdEstadoReserva(estadoReservaDTO.getIdEstadoReserva());
        estadoReserva.setEstadoReserva(estadoReservaDTO.getEstadoReserva());
        return estadoReserva;
    }
}
