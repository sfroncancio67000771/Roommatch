package com.example.ProyectoCs.application.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ComportamientoBusquedaDTO {
    private int idBusqueda;
    private int idEstudiante;
    private LocalDateTime fechaHora;
    private String criteriosBusqueda;
    private String resultadosVistos;
    private String favoritos;
}
