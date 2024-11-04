package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.application.dto.FotoDTO;

import java.util.List;

public interface FotoGateway {
    String uploadFoto(FotoDTO fotoDTO);
    void saveFotoUrl(int idAlojamiento, String url);
    List<FotoDTO> obtenerFotosPorAlojamiento(int idAlojamiento);
    List<FotoDTO> obtenerTodasLasFotos();
        String obtenerNombreFotoPorAlojamiento(int idAlojamiento);
    }


