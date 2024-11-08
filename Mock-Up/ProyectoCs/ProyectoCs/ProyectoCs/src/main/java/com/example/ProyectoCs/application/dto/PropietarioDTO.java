package com.example.ProyectoCs.application.dto;

import lombok.Data;

@Data
public class PropietarioDTO {
    private Long idPropietario;
    private String nombre;
    private String email;
    private String contraseña;
    private String telefono;
    private int idEstadoPropietario;
}
