package com.example.ProyectoCs.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "Estudiante")
public class Estudiante implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "BINARY(16)")
    private UUID idEstudiante;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "edad")
    private int edad;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "contraseña")
    private String contraseña;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "codigo")
    private String Codigo;

    @ManyToOne
    @JoinColumn(name = "id_universidad")
    private Universidad universidad;

    @ManyToOne
    @JoinColumn(name = "id_estado")
    private EstadoEstudiante estadoEstudiante;

    private boolean activo;

    @Column(name = "role")
    private String role = "ROLE_ESTUDIANTE";

    // Métodos de UserDetails

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Proporciona el rol de estudiante como autoridad
        return List.of(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getPassword() {
        return contraseña;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return activo;
    }

    @Override
    public boolean isAccountNonLocked() {
        return activo;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return activo;
    }

    @Override
    public boolean isEnabled() {
        return activo;
    }
}
