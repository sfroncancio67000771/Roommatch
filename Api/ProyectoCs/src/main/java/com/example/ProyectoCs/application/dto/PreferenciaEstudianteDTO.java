package com.example.ProyectoCs.application.dto;

import lombok.Data;

@Data
public class PreferenciaEstudianteDTO {
    private int idPreferencia;
    private int idEstudiante;
    private double presupuestoMaximo;
    private boolean deseaLavanderia;
    private boolean deseaRoomie;
    private boolean necesitaParqueaderoBicicleta;
}
