package com.example.ProyectoCs.domain.model;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "Historial_Recomendaciones")
public class HistorialRecomendacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Historial_Recomendacion")
    private int idHistorialRecomendacion;

    @ManyToOne
    @JoinColumn(name = "ID_Recomendacion")
    private Recomendacion recomendacion;

    @ManyToOne
    @JoinColumn(name = "ID_Estudiante")
    private Estudiante estudiante;

    @Column(name = "Fecha_Recomendacion", nullable = false)
    private LocalDate fechaRecomendacion;

    @Column(name = "Alojamientos_Recomendados", nullable = false, columnDefinition = "TEXT")
    private String alojamientosRecomendados;
}
