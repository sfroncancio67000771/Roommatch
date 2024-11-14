package com.example.ProyectoCs.application.usecase;

import com.example.ProyectoCs.application.dto.AlojamientoDTO;
import com.example.ProyectoCs.application.dto.PreferenciaEstudianteDTO;
import com.example.ProyectoCs.application.service.AlojamientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import java.util.List;
import java.util.Map;

@Component
public class AlojamientoUseCase {

    private final AlojamientoService alojamientoService;

    @Autowired
    public AlojamientoUseCase(AlojamientoService alojamientoService) {
        this.alojamientoService = alojamientoService;
    }

    public List<AlojamientoDTO> filtrarAlojamientos(double precioMin, double precioMax, String ciudad, boolean tieneLavanderia, boolean tieneRoomie, boolean tieneParqueaderoBicicleta) {
        return alojamientoService.filtrarAlojamientos(precioMin, precioMax, ciudad, tieneLavanderia, tieneRoomie, tieneParqueaderoBicicleta);
    }

    public void crearNuevaHabitacion(AlojamientoDTO alojamientoDTO) throws MessagingException, jakarta.mail.MessagingException {
        alojamientoService.crearNuevaHabitacion(alojamientoDTO);
    }

    public Map<String, Object> compararAlojamientos(int idAlojamiento1, int idAlojamiento2) {
        return alojamientoService.compararAlojamientos(idAlojamiento1, idAlojamiento2);
    }

    public List<AlojamientoDTO> buscarAlojamientos(PreferenciaEstudianteDTO preferencias) {
        return alojamientoService.buscarAlojamientos(preferencias);
    }
}
