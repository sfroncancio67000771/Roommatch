package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.application.dto.AlojamientoDTO;
import com.example.ProyectoCs.application.dto.EstudianteDTO;
import com.example.ProyectoCs.application.dto.PreferenciaEstudianteDTO;
import com.example.ProyectoCs.application.service.NotificationService;
import com.example.ProyectoCs.domain.model.*;
import com.example.ProyectoCs.domain.repository.AlojamientoRepository;
import com.example.ProyectoCs.domain.repository.EstudianteRepository;
import com.example.ProyectoCs.domain.repository.PropietarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import javax.mail.MessagingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class AlojamientoGatewayImpl implements AlojamientoGateway {

    private final AlojamientoRepository alojamientoRepository;
    private final EstudianteRepository estudianteRepository;
    private final NotificationService notificationService;
    private final PropietarioRepository propietarioRepository;

    @Autowired
    public AlojamientoGatewayImpl(AlojamientoRepository alojamientoRepository,
                                  EstudianteRepository estudianteRepository,
                                  NotificationService notificationService,
                                  PropietarioRepository propietarioRepository) {
        this.alojamientoRepository = alojamientoRepository;
        this.estudianteRepository = estudianteRepository;
        this.notificationService = notificationService;
        this.propietarioRepository = propietarioRepository;

    }


    @Override
    public List<AlojamientoDTO> filtrarAlojamientos(double precioMin, double precioMax, String ciudad,
                                                    boolean tieneLavanderia, boolean tieneRoomie,
                                                    boolean tieneParqueaderoBicicleta) {
        List<Alojamiento> alojamientos = alojamientoRepository.findAll();
        return alojamientos.stream()
                .filter(a -> a.getPrecio() >= precioMin && a.getPrecio() <= precioMax)
                .filter(a -> a.getCiudad().equalsIgnoreCase(ciudad))
                .filter(a -> a.isTieneLavanderia() == tieneLavanderia)
                .filter(a -> a.isTieneRoomie() == tieneRoomie)
                .filter(a -> a.isTieneParqueaderoBicicleta() == tieneParqueaderoBicicleta)
                .map(this::convertirEntidadADTO)
                .collect(Collectors.toList());
    }


    @Override
    public void crearNuevaHabitacion(AlojamientoDTO alojamientoDTO) throws MessagingException, jakarta.mail.MessagingException {
        if (!propietarioExiste(alojamientoDTO.getIdPropietario())) {
            throw new IllegalArgumentException("El propietario con ID " + alojamientoDTO.getIdPropietario() + " no existe.");
        }
        Propietario propietario = propietarioRepository.findById(alojamientoDTO.getIdPropietario())
                .orElseThrow(() -> new IllegalArgumentException("El propietario con ID " + alojamientoDTO.getIdPropietario() + " no existe."));

        if (propietario.getEstadoPropietario().getIdEstadoPropietario() != 1) {
            throw new IllegalArgumentException("El propietario"+propietario+ "No existe" );
        }

        Alojamiento alojamiento = convertirDTOaEntidad(alojamientoDTO);
        EstadoHabitacion estadoHabitacion = new EstadoHabitacion();
        estadoHabitacion.setIdEstadoHabitacion(1);
        alojamiento.setEstadoHabitacion(estadoHabitacion);

        // Guardar nueva habitación
        Alojamiento nuevaHabitacion = alojamientoRepository.save(alojamiento);
        // Notificar a todos los estudiantes

        List<Estudiante> estudiantes = estudianteRepository.findAll();
        for (Estudiante estudiante : estudiantes) {
            EstudianteDTO estudianteDTO = convertirEstudianteAEstudianteDTO(estudiante);
            notificationService.sendNewRoomNotification(estudianteDTO);
        }
    }

    private boolean propietarioExiste(long idPropietario) {
        return propietarioRepository.findById(idPropietario).isPresent();
    }

    @Override
    public Map<String, Object> compararAlojamientos(int idAlojamiento1, int idAlojamiento2) {
        Alojamiento alojamiento1 = alojamientoRepository.findById(idAlojamiento1)
                .orElseThrow(() -> new IllegalArgumentException("Alojamiento 1 no encontrado"));
        Alojamiento alojamiento2 = alojamientoRepository.findById(idAlojamiento2)
                .orElseThrow(() -> new IllegalArgumentException("Alojamiento 2 no encontrado"));

        Map<String, Object> comparacion = new HashMap<>();
        comparacion.put("Alojamiento 1", convertirEntidadADTO(alojamiento1));
        comparacion.put("Alojamiento 2", convertirEntidadADTO(alojamiento2));

        return comparacion;
    }

    @Override
    public List<AlojamientoDTO> buscarAlojamientos(PreferenciaEstudianteDTO preferencias) {
        List<Alojamiento> alojamientos = alojamientoRepository.findAll();
        return alojamientos.stream()
                .filter(a -> a.getPrecio() <= preferencias.getPresupuestoMaximo())
                .filter(a -> a.isTieneLavanderia() == preferencias.isDeseaLavanderia())
                .filter(a -> a.isTieneRoomie() == preferencias.isDeseaRoomie())
                .filter(a -> a.isTieneParqueaderoBicicleta() == preferencias.isNecesitaParqueaderoBicicleta())
                .map(this::convertirEntidadADTO)
                .collect(Collectors.toList());
    }

    private AlojamientoDTO convertirEntidadADTO(Alojamiento alojamiento) {
        return new AlojamientoDTO(
                alojamiento.getNombreAlojamiento(),
                alojamiento.getDescripcion(),
                alojamiento.getDireccion(),
                alojamiento.getCiudad(),
                alojamiento.getPrecio(),
                alojamiento.getPropietario().getIdPropietario(),
                alojamiento.getTipoAlojamiento().getTipoAlojamientoID(),
                alojamiento.isTieneLavanderia(),
                alojamiento.isTieneRoomie(),
                alojamiento.isTieneParqueaderoBicicleta()
        );
    }

    private Alojamiento convertirDTOaEntidad(AlojamientoDTO alojamientoDTO) {
        Alojamiento alojamiento = new Alojamiento();
        alojamiento.setNombreAlojamiento(alojamientoDTO.getNombreAlojamiento());
        alojamiento.setDescripcion(alojamientoDTO.getDescripcion());
        alojamiento.setDireccion(alojamientoDTO.getDireccion());
        alojamiento.setCiudad(alojamientoDTO.getCiudad());
        alojamiento.setPrecio(alojamientoDTO.getPrecio());

        // Establecer propietario
        Optional<Propietario> propietario = propietarioRepository.findById(alojamientoDTO.getIdPropietario());
        propietario.ifPresent(alojamiento::setPropietario);

        // Establecer tipo de alojamiento
        TipoAlojamiento tipoAlojamiento = new TipoAlojamiento();
        tipoAlojamiento.setTipoAlojamientoID(alojamientoDTO.getTipoAlojamientoId());
        alojamiento.setTipoAlojamiento(tipoAlojamiento);

        // Otros campos
        alojamiento.setTieneLavanderia(alojamientoDTO.isTieneLavanderia());
        alojamiento.setTieneRoomie(alojamientoDTO.isTieneRoomie());
        alojamiento.setTieneParqueaderoBicicleta(alojamientoDTO.isTieneParqueaderoBicicleta());

        return alojamiento;
    }

    private EstudianteDTO convertirEstudianteAEstudianteDTO(Estudiante estudiante) {
        EstudianteDTO estudianteDTO = new EstudianteDTO();
        estudianteDTO.setNombre(estudiante.getNombre());
        estudianteDTO.setEmail(estudiante.getEmail());
        // Asigna otros campos según lo que contenga tu entidad Estudiante y EstudianteDTO
        return estudianteDTO;
    }

    @Override
    public List<AlojamientoDTO> obtenerTodasLasHabitaciones() {
        List<Alojamiento> alojamientos = alojamientoRepository.findAll();
        return alojamientos.stream()
                .map(this::convertirEntidadADTO)
                .collect(Collectors.toList());
    }

    @Override
    public Alojamiento obtenerHabitacionPorTipo(int tipoAlojamientoId) {
        return null;
    }

    @Override
    public boolean existeAlojamiento(int idAlojamiento) {
        return alojamientoRepository.existsById(idAlojamiento); // Asumiendo que usas un repositorio JPA
    }

    @Override
    public Optional<Alojamiento> obtenerUltimoAlojamiento() {
        return Optional.empty();
    }

    @Override
    public List<Alojamiento> obtenerTodosLosAlojamientos() {
        return alojamientoRepository.findAll(); // Asegúrate de que esta línea funcione correctamente
    }

    @Override
    public Optional<Alojamiento> obtenerAlojamientoPorId(int idAlojamiento) {
        return alojamientoRepository.findByIdAlojamiento(idAlojamiento); // Usa el método correcto
    }

    @Override
    public Optional<Alojamiento> obtenerAlojamientoPorId(Long id) {
        return Optional.empty();
    }

    @Override
    public void actualizarAlojamiento(Alojamiento alojamiento) {

    }

}
