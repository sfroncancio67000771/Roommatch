package com.example.ProyectoCs.infrastructure.persistence;

import com.example.ProyectoCs.application.dto.TipoAlojamientoDTO;
import com.example.ProyectoCs.domain.model.TipoAlojamiento;
import org.springframework.stereotype.Service;

@Service
public class TipoAlojamientoPersistenceService {

    public TipoAlojamiento convertToEntity(TipoAlojamientoDTO tipoAlojamientoDTO) {
        TipoAlojamiento tipoAlojamiento = new TipoAlojamiento();
        tipoAlojamiento.setTipoAlojamientoID(tipoAlojamientoDTO.getTipoAlojamientoID());
        tipoAlojamiento.setNombreTipoAlojamiento(tipoAlojamientoDTO.getNombreTipoAlojamiento());
        return tipoAlojamiento;
    }
}
