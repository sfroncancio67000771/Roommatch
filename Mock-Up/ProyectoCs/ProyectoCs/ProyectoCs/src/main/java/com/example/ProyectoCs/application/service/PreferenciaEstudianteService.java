package com.example.ProyectoCs.application.service;

import com.example.ProyectoCs.application.dto.PreferenciaEstudianteDTO;
import com.example.ProyectoCs.domain.model.Estudiante;
import com.example.ProyectoCs.domain.model.PreferenciaEstudiante;
import com.example.ProyectoCs.domain.repository.EstudianteRepository;
import com.example.ProyectoCs.domain.repository.PreferenciaEstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PreferenciaEstudianteService {

    private final PreferenciaEstudianteRepository preferenciaEstudianteRepository;
    private final EstudianteRepository estudianteRepository;

    @Autowired
    public PreferenciaEstudianteService(PreferenciaEstudianteRepository preferenciaEstudianteRepository, EstudianteRepository estudianteRepository) {
        this.preferenciaEstudianteRepository = preferenciaEstudianteRepository;
        this.estudianteRepository = estudianteRepository;
    }

    public void savePreferenciaEstudiante(PreferenciaEstudianteDTO preferenciaEstudianteDTO) {
        PreferenciaEstudiante preferenciaEstudiante = convertToEntity(preferenciaEstudianteDTO);
        preferenciaEstudianteRepository.save(preferenciaEstudiante);
    }

    private PreferenciaEstudiante convertToEntity(PreferenciaEstudianteDTO preferenciaEstudianteDTO) {
        PreferenciaEstudiante preferenciaEstudiante = new PreferenciaEstudiante();
        preferenciaEstudiante.setIdPreferencia(preferenciaEstudianteDTO.getIdPreferencia());
        preferenciaEstudiante.setPresupuestoMaximo(preferenciaEstudianteDTO.getPresupuestoMaximo());
        preferenciaEstudiante.setDeseaLavanderia(preferenciaEstudianteDTO.isDeseaLavanderia());
        preferenciaEstudiante.setDeseaRoomie(preferenciaEstudianteDTO.isDeseaRoomie());
        preferenciaEstudiante.setNecesitaParqueaderoBicicleta(preferenciaEstudianteDTO.isNecesitaParqueaderoBicicleta());

        // Convertir el String a UUID
        UUID estudianteId = UUID.fromString(String.valueOf(preferenciaEstudianteDTO.getIdEstudiante()));

        // Buscar el estudiante en el repositorio usando el UUID
        Estudiante estudiante = estudianteRepository.findById(estudianteId)
                .orElseThrow(() -> new IllegalArgumentException("Estudiante no encontrado"));

        // Establecer el estudiante en la preferenciaEstudiante
        preferenciaEstudiante.setEstudiante(estudiante);

        return preferenciaEstudiante;
    }
}
