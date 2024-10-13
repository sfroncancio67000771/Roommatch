package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.application.dto.AlojamientoDTO;
import com.example.ProyectoCs.application.dto.PreferenciaEstudianteDTO;
import com.example.ProyectoCs.domain.model.Alojamiento;

import javax.mail.MessagingException;
import java.util.List;
import java.util.Map;

public interface AlojamientoGateway {
    List<AlojamientoDTO> filtrarAlojamientos(double precioMin, double precioMax, String ciudad, boolean tieneLavanderia, boolean tieneRoomie, boolean tieneParqueaderoBicicleta);

    void crearNuevaHabitacion(AlojamientoDTO alojamientoDTO) throws MessagingException, jakarta.mail.MessagingException;

    Map<String, Object> compararAlojamientos(int idAlojamiento1, int idAlojamiento2);

    List<AlojamientoDTO> buscarAlojamientos(PreferenciaEstudianteDTO preferencias);

    List<AlojamientoDTO> obtenerTodasLasHabitaciones();

    Alojamiento obtenerHabitacionPorTipo(int tipoAlojamientoId);
}
