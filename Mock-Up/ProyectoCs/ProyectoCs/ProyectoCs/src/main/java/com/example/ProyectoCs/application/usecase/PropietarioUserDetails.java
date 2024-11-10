package com.example.ProyectoCs.application.usecase;

import com.example.ProyectoCs.domain.model.Propietario;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

public class PropietarioUserDetails implements UserDetails {

    private final Optional<Propietario> propietario;

    public PropietarioUserDetails(Optional<Propietario> propietario) {
        this.propietario = propietario;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(() -> "ROLE_PROPIETARIO");
    }

    @Override
    public String getPassword() {
        return propietario.get().getContraseña();
    }

    @Override
    public String getUsername() {
        return propietario.get().getEmail();
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
        return propietario.get().isActivo();
    }
}
