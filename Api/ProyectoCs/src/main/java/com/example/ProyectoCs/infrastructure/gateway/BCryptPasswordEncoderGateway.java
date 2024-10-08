package com.example.ProyectoCs.infrastructure.gateway;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Component;

@Component
public class BCryptPasswordEncoderGateway {

    public String encode(String plainPassword) {
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt());
    }

    public boolean isValid(String plainPassword) {
        return plainPassword != null &&
                plainPassword.length() >= 8 &&
                plainPassword.matches(".*\\d.*") &&
                plainPassword.matches(".*[a-z].*") &&
                plainPassword.matches(".*[A-Z].*") &&
                plainPassword.matches(".*[!@#$%^&*()].*");
    }
}
