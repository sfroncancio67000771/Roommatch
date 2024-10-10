package com.example.ProyectoCs.application.dto;

import lombok.Data;

@Data
public class ComentarioDTO {
    private int idComentario;
    private int idAlojamiento;
    private int idEstudiante;
    private String comentario;
}
