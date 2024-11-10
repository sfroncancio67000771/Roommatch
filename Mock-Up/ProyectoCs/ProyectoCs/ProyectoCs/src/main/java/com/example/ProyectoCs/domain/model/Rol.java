package com.example.ProyectoCs.domain.model;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Rol {
    @Id
    private long id;
    private String nombre;
}

