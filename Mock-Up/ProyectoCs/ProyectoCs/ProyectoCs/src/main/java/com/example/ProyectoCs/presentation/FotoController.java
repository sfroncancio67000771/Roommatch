package com.example.ProyectoCs.presentation;

import com.example.ProyectoCs.application.dto.FotoDTO;
import com.example.ProyectoCs.infrastructure.gateway.FotoGateway;
import com.example.ProyectoCs.infrastructure.gateway.AlojamientoGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/v1/fotos")
public class FotoController {

    private final FotoGateway fotoGateway;
    private final AlojamientoGateway alojamientoGateway;

    private static final String FOTO_DIRECTORY = "C:/Users/ronca/Downloads/RoomMatch/Fotos_Habitaciones/";

    @Autowired
    public FotoController(FotoGateway fotoGateway, AlojamientoGateway alojamientoGateway) {
        this.fotoGateway = fotoGateway;
        this.alojamientoGateway = alojamientoGateway;
    }

    // Método para subir una foto
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFoto(@RequestParam("archivo") MultipartFile archivo,
                                             @RequestParam("idAlojamiento") int idAlojamiento) {
        if (!alojamientoGateway.existeAlojamiento(idAlojamiento)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El alojamiento no existe.");
        }

        if (!isImage(archivo.getContentType())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El archivo debe ser una imagen.");
        }

        try {
            FotoDTO fotoDTO = new FotoDTO();
            fotoDTO.setArchivo(archivo);
            fotoDTO.setIdAlojamiento(idAlojamiento);

            String mensaje = fotoGateway.uploadFoto(fotoDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(mensaje);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor");
        }
    }

    // Guardar una URL de foto
    @PostMapping("/{idAlojamiento}/url")
    public ResponseEntity<String> saveFotoUrl(@PathVariable int idAlojamiento, @RequestParam String url) {
        if (!alojamientoGateway.existeAlojamiento(idAlojamiento)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El alojamiento no existe.");
        }

        try {
            fotoGateway.saveFotoUrl(idAlojamiento, url);
            return ResponseEntity.status(HttpStatus.CREATED).body("URL de foto guardada correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al guardar la URL de la foto.");
        }
    }

    // Obtener todas las fotos de un alojamiento específico
    @GetMapping("/{idAlojamiento}")
    public ResponseEntity<List<FotoDTO>> obtenerFotosPorAlojamiento(@PathVariable int idAlojamiento) {
        if (!alojamientoGateway.existeAlojamiento(idAlojamiento)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        List<FotoDTO> fotos = fotoGateway.obtenerFotosPorAlojamiento(idAlojamiento);
        if (fotos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(fotos);
    }

    // Obtener todas las fotos
    @GetMapping("/all")
    public ResponseEntity<List<FotoDTO>> obtenerTodasLasFotos() {
        List<FotoDTO> fotos = fotoGateway.obtenerTodasLasFotos();
        if (fotos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(fotos);
    }

    // Método auxiliar para validar que el archivo sea una imagen
    private boolean isImage(String contentType) {
        return contentType != null && contentType.startsWith("image/");
    }

    // Obtener una foto específica por idAlojamiento
    @GetMapping("/imagen/{idAlojamiento}")
    public ResponseEntity<Resource> obtenerFotoPorAlojamiento(@PathVariable int idAlojamiento) {
        try {
            String nombreFoto = fotoGateway.obtenerNombreFotoPorAlojamiento(idAlojamiento);

            if (nombreFoto == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            Path path = Paths.get(FOTO_DIRECTORY + nombreFoto);
            Resource resource = new UrlResource(path.toUri());

            if (resource.exists() && resource.isReadable()) {
                String contentType = Files.probeContentType(path);
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType != null ? contentType : "application/octet-stream"))
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
