package com.example.ProyectoCs.domain.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Estudiante_Reserva")
public class EstudianteReserva {

    @EmbeddedId
    private EstudianteReservaId id;

    @ManyToOne
    @JoinColumn(name = "id_estudiante", insertable = false, updatable = false)
    private Estudiante estudiante;

    @ManyToOne
    @JoinColumn(name = "id_reserva", insertable = false, updatable = false)
    private Reserva reserva;
}
