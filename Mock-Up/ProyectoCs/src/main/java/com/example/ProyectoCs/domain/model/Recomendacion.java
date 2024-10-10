package com.example.ProyectoCs.domain.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "Recomendaciones")
public class Recomendacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Recomendacion")
    private int idRecomendacion;

    @ManyToOne
    @JoinColumn(name = "ID_Estudiante")
    private Estudiante estudiante;

    @Column(name = "Fecha", nullable = false)
    private LocalDate fecha;

    @Column(name = "Alojamientos_Recomendados", nullable = false, columnDefinition = "TEXT")
    private String alojamientosRecomendados;

    @Column(name = "Razon", length = 255)
    private String razon;

    @Column(name = "Visto", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean visto;
}
