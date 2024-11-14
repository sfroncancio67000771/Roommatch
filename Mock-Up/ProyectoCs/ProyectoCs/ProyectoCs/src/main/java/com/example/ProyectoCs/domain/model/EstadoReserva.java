package com.example.ProyectoCs.domain.model;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Estado_Reserva")

public class EstadoReserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_estado_reserva")
    private int idEstadoReserva;

    @Column(name = "estado_reserva")
    private String estadoReserva;
}