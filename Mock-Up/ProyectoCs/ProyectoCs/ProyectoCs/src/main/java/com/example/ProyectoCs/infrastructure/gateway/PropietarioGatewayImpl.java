package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.domain.model.EstadoPropietario;
import com.example.ProyectoCs.domain.model.Propietario;
import com.example.ProyectoCs.domain.model.Rol;
import com.example.ProyectoCs.domain.repository.EstadoPropietarioRepository;
import com.example.ProyectoCs.domain.repository.PropietarioRepository;
import com.example.ProyectoCs.domain.repository.RolRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class PropietarioGatewayImpl implements PropietarioGateway {

    private final PropietarioRepository propietarioRepository;
    private final EstadoPropietarioRepository estadoPropietarioRepository;
    private final RolRepository rolRepository;

    @Autowired
    public PropietarioGatewayImpl(PropietarioRepository propietarioRepository, EstadoPropietarioRepository estadoPropietarioRepository, RolRepository rolRepository) {
        this.propietarioRepository = propietarioRepository;
        this.estadoPropietarioRepository = estadoPropietarioRepository;
        this.rolRepository = rolRepository;
    }

    @Override
    public Optional<Propietario> findByEmail(String email) {
        return propietarioRepository.findByEmail(email);
    }

    @Override
    public EstadoPropietario findEstadoPropietarioById(Long id) {
        return estadoPropietarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Estado de propietario no encontrado " + id));
    }

    @Override
    public String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    @Override
    public void savePropietario(Propietario propietario) {
        if (propietario.getIdPropietario() == null) {
            throw new IllegalArgumentException("El ID del propietario no puede ser nulo.");
        }
        if (propietarioRepository.existsById(propietario.getIdPropietario())) {
            throw new IllegalArgumentException("Ya existe un propietario con este ID.");
        }

        Rol rolPropietario = rolRepository.findByNombre("Propietario");
        if(rolPropietario == null) {
            throw new IllegalArgumentException("Rol 'Propietario' no encontrado en la base de datos.");
        }
        propietarioRepository.save(propietario);
    }


}