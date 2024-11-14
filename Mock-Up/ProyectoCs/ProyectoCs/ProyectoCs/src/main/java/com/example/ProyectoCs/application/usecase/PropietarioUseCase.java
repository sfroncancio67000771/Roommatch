package com.example.ProyectoCs.application.usecase;

import com.example.ProyectoCs.application.dto.EstudianteDTO;
import com.example.ProyectoCs.application.dto.PropietarioDTO;
import com.example.ProyectoCs.application.service.NotificationService;
import com.example.ProyectoCs.domain.model.EstadoEstudiante;
import com.example.ProyectoCs.domain.model.EstadoPropietario;
import com.example.ProyectoCs.domain.model.Estudiante;
import com.example.ProyectoCs.domain.repository.EstadoPropietarioRepository;
import com.example.ProyectoCs.domain.repository.PropietarioRepository;
import com.example.ProyectoCs.infrastructure.gateway.PropietarioGateway;
import com.example.ProyectoCs.domain.model.Propietario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import java.util.Optional;

@Component
public class PropietarioUseCase {

    private final PropietarioGateway propietarioGateway;
    private final NotificationService notificationService;
    private final PropietarioRepository propietarioRepository;
    private final EstadoPropietarioRepository estadoPropietarioRepository;

    @Autowired
    public PropietarioUseCase(PropietarioGateway propietarioGateway, NotificationService notificationService, PropietarioRepository propietarioRepository, EstadoPropietarioRepository estadoPropietarioRepository) {
        this.propietarioGateway = propietarioGateway;
        this.notificationService = notificationService;
        this.propietarioRepository = propietarioRepository;
        this.estadoPropietarioRepository = estadoPropietarioRepository;
    }

    public void registrarPropietario(PropietarioDTO propietarioDTO) throws MessagingException, jakarta.mail.MessagingException {
        Optional<Propietario> propietarioExistente = propietarioGateway.findByEmail(propietarioDTO.getEmail());
        if (propietarioExistente.isPresent()) {
            throw new IllegalStateException("El propietario ya está registrado");
        }
        if (!esContrasenaValida(propietarioDTO.getContraseña())) {
            throw new IllegalArgumentException("La contraseña no cumple con los requisitos de seguridad");
        }

        Propietario propietario = convertirDTOaEntidad(propietarioDTO);
        propietario.setEstadoPropietario(propietarioGateway.findEstadoPropietarioById(3L));

        if (propietarioDTO.getIdPropietario() != null) {
            propietario.setIdPropietario(propietarioDTO.getIdPropietario());
        }

        String contraseñaCifrada = propietarioGateway.hashPassword(propietarioDTO.getContraseña());
        propietario.setContraseña(contraseñaCifrada);

        propietarioGateway.savePropietario(propietario);
        notificationService.sendWelcomeNotification(propietarioDTO);
    }

    public void eliminarPropietario(Long Id) throws MessagingException, jakarta.mail.MessagingException {
        Propietario propietario = propietarioRepository.findById(Id).get();
        if (propietario == null) {
            throw new IllegalStateException("El Propietario no está registrado");
        }
        EstadoPropietario estadoInactivo = estadoPropietarioRepository.findById(2L)
                .orElseThrow(() -> new IllegalStateException("Estado de Propietario no encontrado"));
        propietario.setEstadoPropietario(estadoInactivo);
        propietarioRepository.save(propietario);
        PropietarioDTO propietarioDTO = convertirEntidadADTO(propietario);
        notificationService.sendFarewellNotification(propietarioDTO);
    }

    private boolean esContrasenaValida(String contraseña) {

        return true;
    }

    private Propietario convertirDTOaEntidad(PropietarioDTO propietarioDTO) {
        Propietario propietario = new Propietario();
        propietario.setIdPropietario(propietarioDTO.getIdPropietario());
        propietario.setNombre(propietarioDTO.getNombre());
        propietario.setEmail(propietarioDTO.getEmail());
        propietario.setContraseña(propietarioDTO.getContraseña());
        propietario.setTelefono(propietarioDTO.getTelefono());
        return propietario;

    }

    private PropietarioDTO convertirEntidadADTO(Propietario propietario) {
        PropietarioDTO propietarioDTO = new PropietarioDTO();
        propietarioDTO.setIdPropietario(propietario.getIdPropietario());
        propietarioDTO.setEmail(propietario.getEmail());
        propietarioDTO.setContraseña(propietario.getContraseña());
        return propietarioDTO;
    }
}

