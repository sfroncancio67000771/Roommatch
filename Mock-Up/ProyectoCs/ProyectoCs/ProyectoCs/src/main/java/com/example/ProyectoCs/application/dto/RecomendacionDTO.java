package com.example.ProyectoCs.application.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class RecomendacionDTO {
    private int idRecomendacion;
    private int idEstudiante;
    private LocalDate fecha;
    private String alojamientosRecomendados;
    private String razon;
    private boolean visto;
}
