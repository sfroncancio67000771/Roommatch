package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.application.dto.ReservaDTO;
import com.example.ProyectoCs.domain.model.Reserva;

import javax.mail.MessagingException;
import java.util.List;

public interface ReservaGateway {
    void saveReserva(ReservaDTO reservaDTO) throws MessagingException, jakarta.mail.MessagingException;
    String cancelarReserva(int idReserva);

    List<Reserva> obtenerTodasLasReservas();

    List<Reserva> obtenerReservasPorHabitacion(Long idHabitacion);
}
