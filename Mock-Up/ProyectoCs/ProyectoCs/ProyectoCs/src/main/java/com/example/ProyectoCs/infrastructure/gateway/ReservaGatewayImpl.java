package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.application.dto.ReservaDTO;
import com.example.ProyectoCs.application.service.NotificationService;
import com.example.ProyectoCs.domain.model.Alojamiento;
import com.example.ProyectoCs.domain.model.EstadoReserva;
import com.example.ProyectoCs.domain.model.Estudiante;
import com.example.ProyectoCs.domain.model.Reserva;
import com.example.ProyectoCs.domain.repository.AlojamientoRepository;
import com.example.ProyectoCs.domain.repository.EstadoReservaRepository;
import com.example.ProyectoCs.domain.repository.EstudianteRepository;
import com.example.ProyectoCs.domain.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Component
public class ReservaGatewayImpl implements ReservaGateway {

    private final ReservaRepository reservaRepository;
    private final AlojamientoRepository alojamientoRepository;
    private final EstadoReservaRepository estadoReservaRepository;
    private final NotificationService notificationService;
    private final EstudianteRepository estudianteRepository;

    @Autowired
    public ReservaGatewayImpl(ReservaRepository reservaRepository,
                              AlojamientoRepository alojamientoRepository,
                              EstadoReservaRepository estadoReservaRepository,
                              NotificationService notificationService,
                              EstudianteRepository estudianteRepository) {
        this.reservaRepository = reservaRepository;
        this.alojamientoRepository = alojamientoRepository;
        this.estadoReservaRepository = estadoReservaRepository;
        this.notificationService = notificationService;
        this.estudianteRepository = estudianteRepository;
    }

    @Override
    @Transactional
    public void saveReserva(ReservaDTO reservaDTO) throws MessagingException, jakarta.mail.MessagingException {
        // Verificar si el estudiante está activo
        if (!estudianteActivo(reservaDTO.getEmailEstudiante())) {
            throw new IllegalStateException("El estudiante no está activo. No se puede realizar la reserva.");
        }

        // Obtener el alojamiento
        Alojamiento alojamiento = alojamientoRepository.findById(reservaDTO.getIdAlojamiento())
                .orElseThrow(() -> new IllegalArgumentException("Alojamiento no encontrado"));

        // Validar que la fecha de inicio no sea en el pasado
        if (reservaDTO.getFechaInicio().before(new Date())) {
            throw new IllegalStateException("No se pueden realizar reservas en el pasado.");
        }

        // Verificar si el alojamiento está disponible en el rango de fechas
        if (tieneConflictosDeReserva(reservaDTO)) {
            throw new IllegalStateException("El alojamiento no está disponible en las fechas seleccionadas.");
        }

        // Verificar si el estudiante ya tiene una reserva activa en las mismas fechas
        if (tieneReservaActiva(reservaDTO.getEmailEstudiante(), reservaDTO.getFechaInicio(), reservaDTO.getFechaFin())) {
            throw new IllegalStateException("El estudiante ya tiene una reserva activa en las mismas fechas.");
        }

        // Validar la duración de la reserva
        long diffInMillies = Math.abs(reservaDTO.getFechaFin().getTime() - reservaDTO.getFechaInicio().getTime());
        long diffInDays = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
        if (diffInDays < 15 || diffInDays > 7 * 30) { // Aproximadamente 7 meses
            throw new IllegalStateException("La reserva debe ser mínima de 15 días y máxima de 7 meses.");
        }

        // Crear la reserva y asignar estado
        Reserva reserva = convertToEntity(reservaDTO);
        EstadoReserva estadoReserva = estadoReservaRepository.findById(1L)
                .orElseThrow(() -> new IllegalArgumentException("Estado de reserva no encontrado"));
        reserva.setEstadoReserva(estadoReserva);
        reservaRepository.save(reserva);

        // Actualizar el estado del alojamiento a ocupado para las fechas de la reserva
        alojamiento.cambiarEstado(reservaDTO.getFechaInicio(), reservaDTO.getFechaFin());
        alojamientoRepository.save(alojamiento);

        // Enviar notificación
        notificationService.sendNewReserve(reservaDTO);
    }

    private boolean estudianteActivo(String emailEstudiante) {
        Estudiante estudiante = estudianteRepository.findByEmail(emailEstudiante);
        return estudiante != null && estudiante.isActivo();
    }

    private boolean tieneConflictosDeReserva(ReservaDTO nuevaReserva) {
        // Obtener todas las reservas existentes para el alojamiento en el rango de fechas solicitado
        List<Reserva> reservasExistentes = reservaRepository.findAll();
        Date nuevaInicio = nuevaReserva.getFechaInicio();
        Date nuevaFin = nuevaReserva.getFechaFin();

        // Verificar si hay conflictos de fecha con otras reservas para el mismo alojamiento
        return reservasExistentes.stream()
                .anyMatch(reservaExistente ->
                        reservaExistente.getAlojamiento().getIdAlojamiento() == nuevaReserva.getIdAlojamiento() &&
                                !(reservaExistente.getFechaFin().before(nuevaInicio) || reservaExistente.getFechaInicio().after(nuevaFin)));
    }

    private boolean tieneReservaActiva(String emailEstudiante, Date fechaInicio, Date fechaFin) {
        // Obtener todas las reservas activas del estudiante
        List<Reserva> reservasExistentes = reservaRepository.findByEstudianteEmail(emailEstudiante);

        // Verificar si alguna reserva existente se solapa con las fechas de la nueva reserva
        for (Reserva reservaExistente : reservasExistentes) {
            Date fechaInicioExistente = reservaExistente.getFechaInicio();
            Date fechaFinExistente = reservaExistente.getFechaFin();

            // Verificar si las fechas se solapan
            if ((fechaInicio.before(fechaFinExistente) && fechaFin.after(fechaInicioExistente))) {
                return true; // Si hay solapamiento, el estudiante ya tiene una reserva activa
            }
        }

        return false; // No hay reservas que se solapen
    }



    private Reserva convertToEntity(ReservaDTO reservaDTO) {
        Reserva reserva = new Reserva();
        reserva.setFechaInicio(reservaDTO.getFechaInicio());
        reserva.setFechaFin(reservaDTO.getFechaFin());
        Alojamiento alojamiento = alojamientoRepository.findById(reservaDTO.getIdAlojamiento())
                .orElseThrow(() -> new IllegalArgumentException("Alojamiento no encontrado"));
        reserva.setAlojamiento(alojamiento);
        reserva.setCorreoEstudiante(reservaDTO.getEmailEstudiante());
        return reserva;
    }

    @Override
    public String cancelarReserva(int idReserva) {
        Optional<Reserva> reservaOptional = reservaRepository.findById((long) idReserva);
        if (reservaOptional.isPresent()) {
            Reserva reserva = reservaOptional.get();
            // Verificar que la reserva está activa y que faltan 24 horas o más para la reserva
            if (reserva.getEstadoReserva().getIdEstadoReserva() == 1 &&
                    new Date().getTime() <= reserva.getFechaInicio().getTime() - 24 * 60 * 60 * 1000) {
                // Cambiar el estado de la reserva a cancelado (2)
                reserva.getEstadoReserva().setIdEstadoReserva(2);
                reservaRepository.save(reserva);
                return "La reserva ha sido cancelada exitosamente.";
            } else {
                return "No se puede cancelar la reserva. La reserva ya está en curso o el tiempo mínimo para cancelar ha pasado.";
            }
        }
        return "Reserva no encontrada.";
    }

    @Override
    public List<Reserva> obtenerTodasLasReservas() {
        return reservaRepository.findAll();
    }

    @Override
    public List<Reserva> obtenerReservasPorHabitacion(Long idAlojamiento) {
        Alojamiento alojamiento = alojamientoRepository.findById(Math.toIntExact(idAlojamiento))
                .orElseThrow(() -> new RuntimeException("Habitación no encontrada"));
        return reservaRepository.findByAlojamiento(alojamiento);
    }

}
