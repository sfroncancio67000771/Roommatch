package com.example.ProyectoCs.domain.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

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


    public void cambiarEstado(Date fechaInicio, Date fechaFin) {
        Date hoy = new Date();

        // Establecer el estado por defecto (desocupado) si no cumple ninguna condición
        EstadoHabitacion nuevoEstado = new EstadoHabitacion();

        // Si la fecha de inicio es hoy o en el futuro, el estado debe ser "ocupado"
        if (fechaInicio.before(hoy) || esMismoDia(fechaInicio, hoy)) {
            nuevoEstado.setIdEstadoHabitacion(2); // Estado "ocupado"
        }
        // Si la fecha de fin ya ha pasado, el estado debe ser "desocupado"
        else if (fechaFin.before(hoy) || esMismoDia(fechaFin, hoy)) {
            nuevoEstado.setIdEstadoHabitacion(1); // Estado "desocupado"
        } else {
            // Si la fecha de inicio está en el futuro y no ha llegado, no cambia el estado
            return; // Puedes devolver aquí si no es necesario modificar el estado
        }

        // Si el estado de la habitación cambió, lo actualizas
        if (!nuevoEstado.getIdEstadoHabitacion().equals(this.estadoHabitacion.getIdEstadoHabitacion())) {
            this.estadoHabitacion = nuevoEstado;
        }

    }




    private boolean esMismoDia(Date fecha1, Date fecha2) {
        // Compara solo el día, mes y año (sin tener en cuenta la hora)
        return fecha1.getYear() == fecha2.getYear() && fecha1.getMonth() == fecha2.getMonth() && fecha1.getDate() == fecha2.getDate();
    }

    public void setImagenUrl(String path) {
    }
}
