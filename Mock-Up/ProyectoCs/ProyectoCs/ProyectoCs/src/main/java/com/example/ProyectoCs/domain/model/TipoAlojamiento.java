package com.example.ProyectoCs.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "TipoAlojamiento")
public class TipoAlojamiento {

    @Id
    @Column(name = "TipoAlojamientoID")
    private int tipoAlojamientoID;

    @Column(name = "NombreTipoAlojamiento", nullable = false, length = 50)
    private String nombreTipoAlojamiento;

}
