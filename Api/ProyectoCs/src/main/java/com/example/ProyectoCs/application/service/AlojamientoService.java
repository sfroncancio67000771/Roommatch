package com.example.ProyectoCs.application.service;

import com.example.ProyectoCs.application.dto.AlojamientoDTO;
import com.example.ProyectoCs.application.dto.PreferenciaEstudianteDTO;
import com.example.ProyectoCs.infrastructure.gateway.AlojamientoGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.List;
import java.util.Map;

@Service
public class AlojamientoService {

    private final AlojamientoGateway alojamientoGateway;

    @Autowired
    public AlojamientoService(AlojamientoGateway alojamientoGateway) {
        this.alojamientoGateway = alojamientoGateway;
    }

    public List<AlojamientoDTO> filtrarAlojamientos(double precioMin, double precioMax, String ciudad, boolean tieneLavanderia, boolean tieneRoomie, boolean tieneParqueaderoBicicleta) {
        return alojamientoGateway.filtrarAlojamientos(precioMin, precioMax, ciudad, tieneLavanderia, tieneRoomie, tieneParqueaderoBicicleta);
    }

    public void crearNuevaHabitacion(AlojamientoDTO alojamientoDTO) throws MessagingException, jakarta.mail.MessagingException {
        alojamientoGateway.crearNuevaHabitacion(alojamientoDTO);
    }

    public Map<String, Object> compararAlojamientos(int idAlojamiento1, int idAlojamiento2) {
        return alojamientoGateway.compararAlojamientos(idAlojamiento1, idAlojamiento2);
    }

    public List<AlojamientoDTO> buscarAlojamientos(PreferenciaEstudianteDTO preferencias) {
        return alojamientoGateway.buscarAlojamientos(preferencias);
    }
}
