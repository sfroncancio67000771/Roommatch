package com.example.ProyectoCs.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "Universidad")
public class Universidad {

    @Id
    @Column(name = "id_universidad")
    private int idUniversidad;

    @Column(name = "nombre_universidad")
    private String nombreUniversidad;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "ciudad")
    private String ciudad;

}
