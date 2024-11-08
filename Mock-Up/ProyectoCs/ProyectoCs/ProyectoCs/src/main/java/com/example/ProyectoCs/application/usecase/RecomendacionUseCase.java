package com.example.ProyectoCs.application.usecase;

import com.example.ProyectoCs.application.dto.RecomendacionDTO;
import com.example.ProyectoCs.application.service.NotificationService;
import com.example.ProyectoCs.domain.model.Estudiante;
import com.example.ProyectoCs.domain.model.Recomendacion;
import com.example.ProyectoCs.domain.repository.RecomendacionRepository;
import com.example.ProyectoCs.infrastructure.persistence.EstudiantePersistenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;

@Component
public class RecomendacionUseCase {

    private final RecomendacionRepository recomendacionRepository;
    private final EstudiantePersistenceService estudiantePersistenceService;
    private final NotificationService notificationService;

    @Autowired
    public RecomendacionUseCase(RecomendacionRepository recomendacionRepository,
                                EstudiantePersistenceService estudiantePersistenceService,
                                NotificationService notificationService) {
        this.recomendacionRepository = recomendacionRepository;
        this.estudiantePersistenceService = estudiantePersistenceService;
        this.notificationService = notificationService;
    }

    @Transactional
    public void saveRecomendacion(RecomendacionDTO recomendacionDTO) {
        validateRecomendacionDTO(recomendacionDTO);

        Estudiante estudiante = estudiantePersistenceService.findEstudianteById(UUID.fromString(String.valueOf(recomendacionDTO.getIdEstudiante()))); // Convertir el String a UUID

        Recomendacion recomendacion = convertDTOToEntity(recomendacionDTO, estudiante);
        recomendacionRepository.save(recomendacion);

        //notificationService.sendRecomendacionNotification(recomendacionDTO);
    }

    private void validateRecomendacionDTO(RecomendacionDTO recomendacionDTO) {
        if (recomendacionDTO == null) {
            throw new IllegalArgumentException("El DTO de recomendación es nulo");
        }
    }

    private Recomendacion convertDTOToEntity(RecomendacionDTO recomendacionDTO, Estudiante estudiante) {
        Recomendacion recomendacion = new Recomendacion();
        recomendacion.setFecha(recomendacionDTO.getFecha());
        recomendacion.setAlojamientosRecomendados(recomendacionDTO.getAlojamientosRecomendados());
        recomendacion.setRazon(recomendacionDTO.getRazon());
        recomendacion.setVisto(recomendacionDTO.isVisto());
        recomendacion.setEstudiante(estudiante);
        return recomendacion;
    }
}
