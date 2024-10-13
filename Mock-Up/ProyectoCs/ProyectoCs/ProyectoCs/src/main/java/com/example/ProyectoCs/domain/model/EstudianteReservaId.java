package com.example.ProyectoCs.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Data
@Embeddable
public class EstudianteReservaId implements Serializable {

    @Column(name = "id_estudiante")
    private int idEstudiante;

    @Column(name = "id_reserva")
    private int idReserva;
}
