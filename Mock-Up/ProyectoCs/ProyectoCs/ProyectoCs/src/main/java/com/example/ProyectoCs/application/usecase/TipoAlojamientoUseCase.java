package com.example.ProyectoCs.application.usecase;

import com.example.ProyectoCs.application.dto.TipoAlojamientoDTO;
import com.example.ProyectoCs.application.service.NotificationService;
import com.example.ProyectoCs.domain.model.TipoAlojamiento;
import com.example.ProyectoCs.domain.repository.TipoAlojamientoRepository;
import com.example.ProyectoCs.infrastructure.persistence.TipoAlojamientoPersistenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TipoAlojamientoUseCase {

    private final TipoAlojamientoRepository tipoAlojamientoRepository;
    private final TipoAlojamientoPersistenceService tipoAlojamientoPersistenceService;
    private final NotificationService notificationService;

    @Autowired
    public TipoAlojamientoUseCase(TipoAlojamientoRepository tipoAlojamientoRepository,
                                  TipoAlojamientoPersistenceService tipoAlojamientoPersistenceService,
                                  NotificationService notificationService) {
        this.tipoAlojamientoRepository = tipoAlojamientoRepository;
        this.tipoAlojamientoPersistenceService = tipoAlojamientoPersistenceService;
        this.notificationService = notificationService;
    }

    public void saveTipoAlojamiento(TipoAlojamientoDTO tipoAlojamientoDTO) {
        TipoAlojamiento tipoAlojamiento = convertDTOToEntity(tipoAlojamientoDTO);
        tipoAlojamientoRepository.save(tipoAlojamiento);
    }

    private TipoAlojamiento convertDTOToEntity(TipoAlojamientoDTO tipoAlojamientoDTO) {
        return tipoAlojamientoPersistenceService.convertToEntity(tipoAlojamientoDTO);
    }
}
