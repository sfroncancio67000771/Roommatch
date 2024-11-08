package com.example.ProyectoCs.presentation;

import com.example.ProyectoCs.application.dto.EstudianteDTO;
import com.example.ProyectoCs.application.dto.ReservaDTO;
import com.example.ProyectoCs.infrastructure.gateway.EstudianteGateway;
import com.example.ProyectoCs.infrastructure.gateway.ReservaGateway;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.mail.MessagingException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/v1/estudiantes")
@Api(tags = "Estudiantes", description = "Operaciones relacionadas con Estudiantes")
public class EstudianteController {

    private final EstudianteGateway estudianteGateway;
    private final ReservaGateway reservaGateway;

    @Autowired
    public EstudianteController(EstudianteGateway estudianteGateway, ReservaGateway reservaGateway) {
        this.estudianteGateway = estudianteGateway;
        this.reservaGateway = reservaGateway;
    }

    @ApiOperation(value = "Registrar un estudiante")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Estudiante registrado exitosamente"),
            @ApiResponse(code = 400, message = "Error al registrar el estudiante"),
            @ApiResponse(code = 500, message = "Error interno del servidor")
    })
    @CrossOrigin(origins = "http://127.0.0.1:5501") // Asegúrate de que la URL de origen sea la correcta
    @PostMapping("/registrar")
    public ResponseEntity<Map<String, String>> registrarEstudiante(@RequestBody EstudianteDTO estudianteDTO) {
        Map<String, String> response = new HashMap<>();
        try {
            estudianteGateway.registrarEstudiante(estudianteDTO);
            response.put("mensaje", "Estudiante registrado exitosamente");
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (IllegalStateException | IllegalArgumentException e) {
            response.put("error", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        } catch (MessagingException | jakarta.mail.MessagingException e) {
            response.put("error", "Error al enviar la notificación");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "Eliminar un estudiante por correo electrónico")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Estudiante eliminado exitosamente"),
            @ApiResponse(code = 400, message = "Error al eliminar el estudiante"),
            @ApiResponse(code = 404, message = "El estudiante no fue encontrado")
    })
    @DeleteMapping("/eliminar/{email}")
    public ResponseEntity<Map<String, String>> eliminarEstudiante(@PathVariable String email) {
        Map<String, String> response = new HashMap<>();
        try {
            estudianteGateway.eliminarEstudiante(email);
            response.put("mensaje", "Estudiante eliminado exitosamente");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalStateException e) {
            response.put("error", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        } catch (MessagingException | jakarta.mail.MessagingException e) {
            response.put("error", "Error al enviar la notificación");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @ApiOperation(value = "Crear una reserva")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Reserva creada correctamente"),
            @ApiResponse(code = 400, message = "No se pudo crear la reserva"),
            @ApiResponse(code = 500, message = "Error interno del servidor")
    })
    @CrossOrigin(origins = "http://127.0.0.1:5501") // Asegúrate de que la URL de origen sea la correcta
    @PostMapping("/crear")
    public ResponseEntity<Map<String, String>> crearReserva(@RequestBody ReservaDTO reservaDTO) {
        Map<String, String> response = new HashMap<>();
        try {
            // Validar si el correo electrónico del estudiante existe en la base de datos antes de crear la reserva
            if (!estudianteGateway.estudianteExistente(reservaDTO.getEmailEstudiante())) {
                response.put("error", "El estudiante no está registrado");
                return ResponseEntity.badRequest().body(response);
            }
            reservaGateway.saveReserva(reservaDTO);
            response.put("mensaje", "La reserva se ha creado correctamente.");
            return ResponseEntity.ok(response);
        } catch (MessagingException | jakarta.mail.MessagingException e) {
            response.put("error", "Error al crear la reserva: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        } catch (IllegalStateException e) {
            response.put("error", "No se pudo crear la reserva: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}

/*
    @ApiOperation(value = "Cancelar una reserva por ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Reserva cancelada correctamente"),
            @ApiResponse(code = 400, message = "No se pudo cancelar la reserva")
    })
    @PostMapping("/cancelar/{idReserva}")
    public ResponseEntity<Map<String, String>> cancelarReserva(@PathVariable int idReserva) {
        Map<String, String> response = new HashMap<>();
        try {
            String mensaje = reservaGateway.cancelarReserva(idReserva);
            response.put("mensaje", mensaje);
            return ResponseEntity.ok(response);
        } catch (IllegalStateException e) {
            response.put("error", "No se pudo cancelar la reserva: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
*/
