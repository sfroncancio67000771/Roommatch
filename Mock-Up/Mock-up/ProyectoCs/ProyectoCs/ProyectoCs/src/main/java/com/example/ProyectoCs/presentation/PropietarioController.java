package com.example.ProyectoCs.presentation;

import com.example.ProyectoCs.application.dto.AlojamientoDTO;
import com.example.ProyectoCs.application.dto.FotoDTO;
import com.example.ProyectoCs.application.dto.PropietarioDTO;
import com.example.ProyectoCs.application.service.AlojamientoService;
import com.example.ProyectoCs.domain.model.Alojamiento;
import com.example.ProyectoCs.domain.model.EstadoPropietario;
import com.example.ProyectoCs.domain.model.Propietario;
import com.example.ProyectoCs.domain.repository.PropietarioRepository;
import com.example.ProyectoCs.infrastructure.gateway.AlojamientoGateway;
import com.example.ProyectoCs.infrastructure.gateway.FotoGateway;
import com.example.ProyectoCs.application.usecase.PropietarioUseCase;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("api/v1/propietarios")
@Api(tags = "Propietarios", description = "Operaciones relacionadas con propietarios")
public class PropietarioController {

    private final PropietarioUseCase propietarioUseCase;
    private final FotoGateway fotoGateway;
    private final AlojamientoGateway alojamientoGateway;
    private final PropietarioRepository propietarioRepository;

    @Autowired
    public PropietarioController(PropietarioUseCase propietarioUseCase , FotoGateway fotoGateway , AlojamientoGateway alojamientoGateway, PropietarioRepository propietarioRepository) {
        this.propietarioUseCase = propietarioUseCase;
        this.fotoGateway = fotoGateway;
        this.alojamientoGateway = alojamientoGateway;
        this.propietarioRepository = propietarioRepository;
    }


    @CrossOrigin(origins = "http://127.0.0.1:5501")
    @PostMapping("/registrar")
    @ApiOperation("Registra un nuevo propietario")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Propietario registrado exitosamente"),
            @ApiResponse(code = 400, message = "Error en la solicitud debido a datos inválidos o faltantes"),
            @ApiResponse(code = 500, message = "Error interno del servidor")
    })
    public ResponseEntity<String> registrarPropietario(@RequestBody PropietarioDTO propietarioDTO) {
        System.out.println("ID del propietario recibido en el controlador: " + propietarioDTO.getIdPropietario());
        try {
            propietarioUseCase.registrarPropietario(propietarioDTO);

            // Crear un objeto JSON como respuesta
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonResponse = objectMapper.writeValueAsString(Collections.singletonMap("message", "Propietario registrado exitosamente."));

            return ResponseEntity.ok(jsonResponse);
        } catch (IllegalStateException | IllegalArgumentException | MessagingException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (jakarta.mail.MessagingException e) {
            throw new RuntimeException(e);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }



    @CrossOrigin(origins = "http://127.0.0.1:5501")
    @PostMapping("/crearhab")
    @ApiOperation("Crea una nueva habitación en un alojamiento existente")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Habitación creada exitosamente"),
            @ApiResponse(code = 400, message = "Solicitud inválida"),
            @ApiResponse(code = 404, message = "Propietario no encontrado"),
            @ApiResponse(code = 500, message = "Error interno del servidor")
    })
    public ResponseEntity<Map<String, String>> crearNuevaHabitacion(@RequestBody AlojamientoDTO alojamientoDTO) {
        // Verifica el valor de tipoAlojamientoId
        System.out.println("Tipo de Alojamiento recibido: " + alojamientoDTO.getTipoAlojamientoId());

        if (alojamientoDTO.getTipoAlojamientoId() <= 0) {
            return ResponseEntity.badRequest().body(Map.of("error", "El tipo de alojamiento es inválido"));
        }

        // Procesar la creación de la habitación
        try {
            // Verificar si el propietario existe
            Optional<Propietario> propietarioOpt = propietarioRepository.findById(alojamientoDTO.getIdPropietario());

            if (propietarioOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "El propietario con ID " + alojamientoDTO.getIdPropietario() + " no existe."));
            }

            // Verificar si el propietario está activo
            Propietario propietario = propietarioOpt.get();

            // Asegurarse de que el estado del propietario no sea nulo antes de la comparación
            EstadoPropietario estadoPropietario = propietario.getEstadoPropietario(); // Cambia esto si el tipo es diferente

            if (estadoPropietario == null || estadoPropietario.getEstadoPropietario() == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "El estado del propietario con ID " + alojamientoDTO.getIdPropietario() + " es inválido."));
            }

            // Verificar que el propietario esté activo
            if (estadoPropietario.getIdEstadoPropietario() != 1) { // Asumiendo que 1 representa estado activo
                return ResponseEntity.badRequest().body(Map.of("error", "El propietario con ID " + alojamientoDTO.getIdPropietario() + " no está activo."));
            }

            // Si el propietario existe y está activo, crear la nueva habitación
            alojamientoGateway.crearNuevaHabitacion(alojamientoDTO);
            return ResponseEntity.ok(Map.of("message", "Habitación creada exitosamente"));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Error al crear la habitación"));
        }
    }





}
