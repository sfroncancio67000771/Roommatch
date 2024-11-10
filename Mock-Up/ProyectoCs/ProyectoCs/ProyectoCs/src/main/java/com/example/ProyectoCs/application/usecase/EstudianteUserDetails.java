package com.example.ProyectoCs.application.usecase;

import com.example.ProyectoCs.domain.model.Estudiante;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;


public class EstudianteUserDetails implements UserDetails {

    private final Estudiante estudiante;

    public EstudianteUserDetails(Estudiante estudiante) {
        this.estudiante = estudiante;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Aquí asignas el rol al estudiante, se puede hacer más dinámico si es necesario.
        return Collections.singletonList(() -> "ROLE_ESTUDIANTE");
    }

    @Override
    public String getPassword() {
        return estudiante.getContraseña();
    }

    @Override
    public String getUsername() {
        return estudiante.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return estudiante.isActivo();
    }
}
