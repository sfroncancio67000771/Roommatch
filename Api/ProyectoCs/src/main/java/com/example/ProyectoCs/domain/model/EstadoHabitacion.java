package com.example.ProyectoCs.domain.model;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Estado_Habitacion")
public class EstadoHabitacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_estado_habitacion")
    private int idEstadoHabitacion;

    @Column(name = "estado_habitacion")
    private String estadoHabitacion;

}