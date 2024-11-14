package com.example.ProyectoCs.presentation;

import com.example.ProyectoCs.application.dto.AlojamientoDTO;
import com.example.ProyectoCs.application.service.AlojamientoService;
import com.example.ProyectoCs.domain.model.Alojamiento;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/alojamiento")
public class AlojamientoController {

    private final AlojamientoService alojamientoService;

    public AlojamientoController(AlojamientoService alojamientoService) {
        this.alojamientoService = alojamientoService;
    }

    @GetMapping("/filtrar")
    public ResponseEntity<List<Alojamiento>> obtenerAlojamientos() {
        List<Alojamiento> alojamientos = alojamientoService.obtenerTodosLosAlojamientos();
        if (alojamientos.isEmpty()) {
            return ResponseEntity.noContent().build(); // Opción alternativa: retorna 404
        }
        return ResponseEntity.ok(alojamientos);
    }



    @PostMapping("/{id}/subirImagen")
    public ResponseEntity<String> subirImagen(@PathVariable int id, @RequestParam("imagen") MultipartFile imagen) {
        if (imagen.isEmpty()) {
            return ResponseEntity.badRequest().body("No se ha proporcionado ninguna imagen.");
        }

        try {
            // Llama al servicio para guardar la imagen
            alojamientoService.guardarImagen(id, imagen);
            return ResponseEntity.ok("Imagen subida con éxito.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Error al subir la imagen: " + e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error de entrada/salida: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inesperado al subir la imagen: " + e.getMessage());
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Alojamiento> obtenerAlojamientoPorId(@PathVariable Long id) {
        Optional<Alojamiento> alojamiento = alojamientoService.obtenerAlojamientoPorId(id);

        if (alojamiento.isPresent()) {
            return ResponseEntity.ok(alojamiento.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Devuelve un 404 si no se encuentra el alojamiento
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarAlojamiento(@PathVariable Long id) {
        boolean eliminado = alojamientoService.eliminarAlojamiento(id);

        if (eliminado) {
            return ResponseEntity.ok("Alojamiento eliminado con éxito.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Alojamiento no encontrado.");
        }
    }

}
