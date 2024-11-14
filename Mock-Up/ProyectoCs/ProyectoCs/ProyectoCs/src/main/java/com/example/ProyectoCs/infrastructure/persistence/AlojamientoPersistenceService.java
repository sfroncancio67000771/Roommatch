package com.example.ProyectoCs.infrastructure.persistence;

import com.example.ProyectoCs.domain.model.Alojamiento;
import com.example.ProyectoCs.domain.repository.AlojamientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlojamientoPersistenceService {

    private final AlojamientoRepository alojamientoRepository;

    @Autowired
    public AlojamientoPersistenceService(AlojamientoRepository alojamientoRepository) {
        this.alojamientoRepository = alojamientoRepository;
    }

    public Alojamiento findAlojamientoById(Long idAlojamiento) {
        return alojamientoRepository.findById(Math.toIntExact(idAlojamiento))
                .orElseThrow(() -> new IllegalArgumentException("Alojamiento no encontrado con ID: " + idAlojamiento));
    }
}
