package com.example.ProyectoCs.domain.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Alojamiento")
public class Alojamiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_alojamiento")
    private int idAlojamiento;

    @Column(name = "nombre_alojamiento")
    private String nombreAlojamiento;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "ciudad")
    private String ciudad;

    @Column(name = "precio")
    private double precio;

    @ManyToOne
    @JoinColumn(name = "id_propietario")
    private Propietario propietario;

    @ManyToOne
    @JoinColumn(name = "id_estado")
    private EstadoHabitacion estadoHabitacion;

    @ManyToOne
    @JoinColumn(name = "TipoAlojamientoID")
    private TipoAlojamiento tipoAlojamiento;

    @Column(name = "TieneLavanderia")
    private boolean tieneLavanderia;

    @Column(name = "TieneRoomie")
    private boolean tieneRoomie;

    @Column(name = "TieneParqueaderoBicicleta")
    private boolean tieneParqueaderoBicicleta;


    public void cambiarEstado() {
        // Lógica para cambiar el estado del alojamiento
        // Por ejemplo, si el estado actual es ocupado (id = 1), cambia a disponible (id = 2)
        if (this.estadoHabitacion.getIdEstadoHabitacion() == 1) {
            // Cambiar a estado disponible (id = 2)
            EstadoHabitacion nuevoEstado = new EstadoHabitacion();
            nuevoEstado.setIdEstadoHabitacion(2);
            this.estadoHabitacion = nuevoEstado;
        } else {
        }
    }
}
