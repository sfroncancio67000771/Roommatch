package com.example.ProyectoCs.infrastructure.persistence;

import com.example.ProyectoCs.application.dto.UniversidadDTO;
import com.example.ProyectoCs.domain.model.Universidad;
import org.springframework.stereotype.Service;

@Service
public class UniversidadPersistenceService {

    public Universidad convertToEntity(UniversidadDTO universidadDTO) {
        Universidad universidad = new Universidad();
        universidad.setIdUniversidad(universidadDTO.getIdUniversidad());
        universidad.setNombreUniversidad(universidadDTO.getNombreUniversidad());
        universidad.setDireccion(universidadDTO.getDireccion());
        universidad.setCiudad(universidadDTO.getCiudad());
        return universidad;
    }
}
