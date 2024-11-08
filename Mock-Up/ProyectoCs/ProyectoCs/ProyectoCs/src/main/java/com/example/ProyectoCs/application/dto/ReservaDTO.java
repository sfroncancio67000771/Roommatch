package com.example.ProyectoCs.application.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ReservaDTO {
    private int idReserva;
    private String emailEstudiante;
    private int idAlojamiento;
    private Date fechaInicio;
    private Date fechaFin;
    private int idEstadoReserva;
}
