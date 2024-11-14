package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.application.dto.EstudianteDTO;
import com.example.ProyectoCs.application.service.NotificationService;
import com.example.ProyectoCs.domain.model.EstadoEstudiante;
import com.example.ProyectoCs.domain.model.Estudiante;
import com.example.ProyectoCs.domain.model.Rol;
import com.example.ProyectoCs.domain.model.Universidad;
import com.example.ProyectoCs.domain.repository.EstadoEstudianteRepository;
import com.example.ProyectoCs.domain.repository.EstudianteRepository;
import com.example.ProyectoCs.domain.repository.RolRepository;
import com.example.ProyectoCs.domain.repository.UniversidadRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import java.util.Optional;

@Component
public class EstudianteGatewayImpl implements EstudianteGateway {

    private final EstudianteRepository estudianteRepository;
    private final NotificationService notificationService;
    private final EstadoEstudianteRepository estadoEstudianteRepository;
    private final UniversidadRepository universidadRepository;
    private final RolRepository rolRepository;

    @Autowired
    public EstudianteGatewayImpl(EstudianteRepository estudianteRepository, NotificationService notificationService, UniversidadRepository universidadRepository, EstadoEstudianteRepository estadoEstudianteRepository, RolRepository rolRepository) {
        this.estudianteRepository = estudianteRepository;
        this.notificationService = notificationService;
        this.universidadRepository = universidadRepository;
        this.estadoEstudianteRepository = estadoEstudianteRepository;
        this.rolRepository = rolRepository;
    }

    @Override
    public void registrarEstudiante(EstudianteDTO estudianteDTO) throws MessagingException, jakarta.mail.MessagingException {
        Optional<Estudiante> estudianteExistente = Optional.ofNullable(estudianteRepository.findByEmail(estudianteDTO.getEmail()));
        if (estudianteExistente.isPresent()) {
            throw new IllegalStateException("El estudiante ya está registrado");
        }
        if (!esContrasenaValida(estudianteDTO.getContraseña())) {
            throw new IllegalArgumentException("La contraseña no cumple con los requisitos de seguridad");
        }

        EstadoEstudiante estadoEstudiante = estadoEstudianteRepository.findById(1L)
                .orElseThrow(() -> new IllegalStateException("Estado de estudiante no encontrado"));

        Universidad universidad = universidadRepository.findById(1L)
                .orElseThrow(() -> new IllegalStateException("Universidad no encontrada"));

        Rol rolEstudiante = rolRepository.findByNombre("ESTUDIANTE");
        if (rolEstudiante == null) {
            throw new IllegalStateException("Rol de estudiante no encontrado");
        }

        String contraseñaCifrada = BCrypt.hashpw(estudianteDTO.getContraseña(), BCrypt.gensalt());

        Estudiante estudiante = convertirDTOaEntidad(estudianteDTO);
        estudiante.setContraseña(contraseñaCifrada);
        estudiante.setEstadoEstudiante(estadoEstudiante);
        estudiante.setUniversidad(universidad);
        estudiante.setActivo(true);
        estudiante.setRole(String.valueOf(rolEstudiante));
        estudianteRepository.save(estudiante);
        notificationService.sendWelcomeNotification(estudianteDTO);
    }

    @Override
    public void eliminarEstudiante(String email) throws MessagingException, jakarta.mail.MessagingException {
        Estudiante estudiante = estudianteRepository.findByEmail(email);
        if (estudiante == null) {
            throw new IllegalStateException("El estudiante no está registrado");
        }
        EstadoEstudiante estadoInactivo = estadoEstudianteRepository.findById(2L)
                .orElseThrow(() -> new IllegalStateException("Estado de estudiante no encontrado"));
        estudiante.setEstadoEstudiante(estadoInactivo);
        estudiante.setActivo(false);
        estudianteRepository.save(estudiante);
        EstudianteDTO estudianteDTO = convertirEntidadADTO(estudiante);
        notificationService.sendFarewellNotification(estudianteDTO);
    }

    @Override
    public boolean estudianteExistente(String emailEstudiante) {
        Estudiante estudiante = estudianteRepository.findByEmail(emailEstudiante);
        return estudiante != null;
    }

    private boolean esContrasenaValida(String contraseña) {
        if (contraseña == null) {
            return false;
        }
        if (contraseña.length() < 8) {
            return false;
        }
        if (!contraseña.matches(".*\\d.*")) {
            return false;
        }
        if (!contraseña.matches(".*[a-z].*")) {
            return false;
        }
        if (!contraseña.matches(".*[A-Z].*")) {
            return false;
        }
        if (!contraseña.matches(".*[!@#$%^&*()].*")) {
            return false;
        }
        return true;
    }

    private Estudiante convertirDTOaEntidad(EstudianteDTO estudianteDTO) {
        Estudiante estudiante = new Estudiante();
        estudiante.setNombre(estudianteDTO.getNombre());
        estudiante.setEdad(estudianteDTO.getEdad());
        estudiante.setEmail(estudianteDTO.getEmail());
        estudiante.setTelefono(estudianteDTO.getTelefono());
        estudiante.setCodigo(estudianteDTO.getCodigo());
        return estudiante;
    }

    private EstudianteDTO convertirEntidadADTO(Estudiante estudiante) {
        return new EstudianteDTO(
                estudiante.getCodigo(),
                estudiante.getNombre(),
                estudiante.getEdad(),
                estudiante.getEmail(),
                estudiante.getTelefono()
        );
    }
}
