package com.example.ProyectoCs.application.usecase;

import com.example.ProyectoCs.application.dto.UniversidadDTO;
import com.example.ProyectoCs.domain.model.Universidad;
import com.example.ProyectoCs.domain.repository.UniversidadRepository;
import com.example.ProyectoCs.infrastructure.persistence.UniversidadPersistenceService;
import com.example.ProyectoCs.application.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UniversidadUseCase {

    private final UniversidadRepository universidadRepository;
    private final UniversidadPersistenceService universidadPersistenceService;
    private final NotificationService notificationService;

    @Autowired
    public UniversidadUseCase(UniversidadRepository universidadRepository,
                              UniversidadPersistenceService universidadPersistenceService,
                              NotificationService notificationService) {
        this.universidadRepository = universidadRepository;
        this.universidadPersistenceService = universidadPersistenceService;
        this.notificationService = notificationService;
    }

    public void saveUniversidad(UniversidadDTO universidadDTO) {
        Universidad universidad = universidadPersistenceService.convertToEntity(universidadDTO);
        universidadRepository.save(universidad);
    }
}
