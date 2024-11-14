package com.example.ProyectoCs.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "Estado_Propietario")
public class EstadoPropietario {

    @Id
    @Column(name = "id_estado_propietario")
    private int idEstadoPropietario;

    @Column(name = "estado_propietario")
    private String estadoPropietario;

    public int intValue() {
        return 0;
    }
}
