package com.example.ProyectoCs.domain.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Foto")
public class Foto {

    @Id
    @Column(name = "id_foto")
    private int idFoto;

    @ManyToOne
    @JoinColumn(name = "id_alojamiento", nullable = false)
    private Alojamiento alojamiento;

    @Column(name = "url", length = 255)
    private String url;
}
