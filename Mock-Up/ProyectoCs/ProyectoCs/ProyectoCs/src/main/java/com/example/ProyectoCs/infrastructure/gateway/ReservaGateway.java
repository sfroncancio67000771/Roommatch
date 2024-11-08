package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.application.dto.ReservaDTO;
import javax.mail.MessagingException;

public interface ReservaGateway {
    void saveReserva(ReservaDTO reservaDTO) throws MessagingException, jakarta.mail.MessagingException;
    String cancelarReserva(int idReserva);
}
