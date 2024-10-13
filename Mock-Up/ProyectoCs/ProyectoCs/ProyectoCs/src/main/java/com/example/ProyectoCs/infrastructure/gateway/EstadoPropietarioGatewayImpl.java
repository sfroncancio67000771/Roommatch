package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.application.dto.EstadoPropietarioDTO;
import com.example.ProyectoCs.domain.model.EstadoPropietario;
import com.example.ProyectoCs.domain.repository.EstadoPropietarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EstadoPropietarioGatewayImpl implements EstadoPropietarioGateway {

    private final EstadoPropietarioRepository estadoPropietarioRepository;

    @Autowired
    public EstadoPropietarioGatewayImpl(EstadoPropietarioRepository estadoPropietarioRepository) {
        this.estadoPropietarioRepository = estadoPropietarioRepository;
    }

    @Override
    public void saveEstadoPropietario(EstadoPropietarioDTO estadoPropietarioDTO) {
        EstadoPropietario estadoPropietario = convertToEntity(estadoPropietarioDTO);
        estadoPropietarioRepository.save(estadoPropietario);
    }

    private EstadoPropietario convertToEntity(EstadoPropietarioDTO estadoPropietarioDTO) {
        EstadoPropietario estadoPropietario = new EstadoPropietario();
        estadoPropietario.setIdEstadoPropietario(estadoPropietarioDTO.getIdEstadoPropietario());
        estadoPropietario.setEstadoPropietario(estadoPropietarioDTO.getEstadoPropietario());
        return estadoPropietario;
    }
}
