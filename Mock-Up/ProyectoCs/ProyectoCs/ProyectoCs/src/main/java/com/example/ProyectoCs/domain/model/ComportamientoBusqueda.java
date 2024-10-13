package com.example.ProyectoCs.domain.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "Comportamiento_de_Busqueda")
public class ComportamientoBusqueda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Busqueda")
    private int idBusqueda;

    @ManyToOne
    @JoinColumn(name = "ID_Estudiante")
    private Estudiante estudiante;

    @Column(name = "Fecha_Hora", nullable = false)
    private LocalDateTime fechaHora;

    @Column(name = "Criterios_Busqueda", nullable = false, columnDefinition = "TEXT")
    private String criteriosBusqueda;

    @Column(name = "Resultados_Vistos", columnDefinition = "TEXT")
    private String resultadosVistos;

    @Column(name = "Favoritos", columnDefinition = "TEXT")
    private String favoritos;
}
