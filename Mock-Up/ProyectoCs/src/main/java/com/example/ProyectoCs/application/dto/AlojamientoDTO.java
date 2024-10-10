package com.example.ProyectoCs.application.dto;

import lombok.Data;

import java.util.List;

@Data
public class AlojamientoDTO {
    private String nombreAlojamiento;
    private String descripcion;
    private String direccion;
    private String ciudad;
    private double precio;
    private long idPropietario;
    private int tipoAlojamientoId;
    private boolean tieneLavanderia;
    private boolean tieneRoomie;
    private boolean tieneParqueaderoBicicleta;

    // Constructor con todos los parámetros
    public AlojamientoDTO(String nombreAlojamiento, String descripcion, String direccion, String ciudad, double precio, long idPropietario, int tipoAlojamientoId, boolean tieneLavanderia, boolean tieneRoomie, boolean tieneParqueaderoBicicleta) {
        this.nombreAlojamiento = nombreAlojamiento;
        this.descripcion = descripcion;
        this.direccion = direccion;
        this.ciudad = ciudad;
        this.precio = precio;
        this.idPropietario = idPropietario;

        this.tipoAlojamientoId = tipoAlojamientoId;
        this.tieneLavanderia = tieneLavanderia;
        this.tieneRoomie = tieneRoomie;
        this.tieneParqueaderoBicicleta = tieneParqueaderoBicicleta;
    }
}
