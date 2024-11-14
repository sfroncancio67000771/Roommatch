package com.example.ProyectoCs.domain.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Foto")
public class Foto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Generar automáticamente el ID de foto
    @Column(name = "id_foto")
    private int idFoto;

    @ManyToOne
    @JoinColumn(name = "id_alojamiento", nullable = false)
    private Alojamiento alojamiento;

    @Column(name = "url", length = 255)
    private String url;
}
