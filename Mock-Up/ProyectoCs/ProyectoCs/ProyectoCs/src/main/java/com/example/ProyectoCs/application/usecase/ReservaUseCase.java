package com.example.ProyectoCs.application.usecase;

import com.example.ProyectoCs.application.dto.ReservaDTO;
import com.example.ProyectoCs.infrastructure.gateway.ReservaGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import javax.mail.MessagingException;


@Component
public class ReservaUseCase {

    private final ReservaGateway reservaGateway;

    @Autowired
    public ReservaUseCase(ReservaGateway reservaGateway) {
        this.reservaGateway = reservaGateway;
    }

    public void saveReserva(ReservaDTO reservaDTO) throws MessagingException, jakarta.mail.MessagingException {
        reservaGateway.saveReserva(reservaDTO);
    }

    public String cancelarReserva(int idReserva) {
        return reservaGateway.cancelarReserva(idReserva);
    }
}
