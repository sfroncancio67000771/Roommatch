package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.application.dto.EstadoReservaDTO;

public interface EstadoReservaGateway {
    void saveEstadoReserva(EstadoReservaDTO estadoReservaDTO);
}
