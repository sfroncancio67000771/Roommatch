package com.example.ProyectoCs.domain.model;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Estado_Estudiante")

public class EstadoEstudiante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_estado_estudiante")
    private int idEstadoEstudiante;

    @Column(name = "estado_estudiante")
    private String estadoEstudiante;
}