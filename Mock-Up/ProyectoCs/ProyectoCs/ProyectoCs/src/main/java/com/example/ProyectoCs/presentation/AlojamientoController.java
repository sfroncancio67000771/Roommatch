package com.example.ProyectoCs.presentation;

import com.example.ProyectoCs.domain.model.Alojamiento;
import com.example.ProyectoCs.domain.repository.AlojamientoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/alojamiento")
public class AlojamientoController {

    private final AlojamientoRepository alojamientoRepository;

    public AlojamientoController(AlojamientoRepository alojamientoRepository) {
        this.alojamientoRepository = alojamientoRepository;
    }

    @GetMapping("/filtrar")
    public ResponseEntity<List<Alojamiento>> obtenerAlojamientos() {
        List<Alojamiento> alojamientos = alojamientoRepository.findAll();
        return ResponseEntity.ok(alojamientos);
    }
}
