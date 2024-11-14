package com.example.ProyectoCs.application.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class HistorialDTO {
    private int idHistorial;
    private int idEntidadAfectada;
    private String tipoEntidad;
    private int idEstadoAnterior;
    private int idEstadoNuevo;
    private LocalDateTime fechaHoraCambio;
}
