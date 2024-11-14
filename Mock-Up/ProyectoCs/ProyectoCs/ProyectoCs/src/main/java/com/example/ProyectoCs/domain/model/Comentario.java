package com.example.ProyectoCs.domain.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Comentario")
public class Comentario {

    @Id
    @Column(name = "id_comentario")
    private int idComentario;

    @ManyToOne
    @JoinColumn(name = "id_alojamiento")
    private Alojamiento alojamiento;

    @ManyToOne
    @JoinColumn(name = "id_estudiante")
    private Estudiante estudiante;

    @Column(name = "comentario", columnDefinition = "TEXT")
    private String comentario;

}
