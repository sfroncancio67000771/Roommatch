package com.example.ProyectoCs.domain.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "Historial")
public class Historial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_historial")
    private int idHistorial;

    @Column(name = "id_entidad_afectada")
    private int idEntidadAfectada;

    @Column(name = "tipo_entidad")
    private String tipoEntidad;

    @Column(name = "id_estado_anterior")
    private int idEstadoAnterior;

    @Column(name = "id_estado_nuevo")
    private int idEstadoNuevo;

    @Column(name = "fecha_hora_cambio")
    private LocalDateTime fechaHoraCambio;

    @ManyToOne
    @JoinColumn(name = "id_estado_anterior", referencedColumnName = "id_estado_habitacion", insertable = false, updatable = false)
    private EstadoHabitacion estadoAnteriorHabitacion;

    @ManyToOne
    @JoinColumn(name = "id_estado_nuevo", referencedColumnName = "id_estado_habitacion", insertable = false, updatable = false)
    private EstadoHabitacion estadoNuevoHabitacion;

    @ManyToOne
    @JoinColumn(name = "id_estado_anterior", referencedColumnName = "id_estado_reserva", insertable = false, updatable = false)
    private EstadoReserva estadoAnteriorReserva;

    @ManyToOne
    @JoinColumn(name = "id_estado_nuevo", referencedColumnName = "id_estado_reserva", insertable = false, updatable = false)
    private EstadoReserva estadoNuevoReserva;

    @ManyToOne
    @JoinColumn(name = "id_estado_anterior", referencedColumnName = "id_estado_estudiante", insertable = false, updatable = false)
    private EstadoEstudiante estadoAnteriorEstudiante;

    @ManyToOne
    @JoinColumn(name = "id_estado_nuevo", referencedColumnName = "id_estado_estudiante", insertable = false, updatable = false)
    private EstadoEstudiante estadoNuevoEstudiante;

    @ManyToOne
    @JoinColumn(name = "id_estado_anterior", referencedColumnName = "id_estado_propietario", insertable = false, updatable = false)
    private EstadoPropietario estadoAnteriorPropietario;

    @ManyToOne
    @JoinColumn(name = "id_estado_nuevo", referencedColumnName = "id_estado_propietario", insertable = false, updatable = false)
    private EstadoPropietario estadoNuevoPropietario;
}
