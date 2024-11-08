package com.example.ProyectoCs.application.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class HistorialRecomendacionDTO {
    private int idHistorialRecomendacion;
    private int idRecomendacion;
    private int idEstudiante;
    private LocalDate fechaRecomendacion;
    private String alojamientosRecomendados;
}
