package com.example.ProyectoCs.presentation;

import com.example.ProyectoCs.application.usecase.PropietarioUseCase;
import com.example.ProyectoCs.infrastructure.gateway.EstudianteGatewayImpl;
import org.springframework.beans.factory.annotation.Autowired;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/system")
public class UserSystemController {

    private final EstudianteGatewayImpl estudianteGateway;
    private final PropietarioUseCase propietarioUseCase;

    @Autowired
    public UserSystemController(EstudianteGatewayImpl estudianteGateway, PropietarioUseCase propietarioUseCase) {
        this.estudianteGateway = estudianteGateway;
        this.propietarioUseCase = propietarioUseCase;
    }


    @ApiOperation("Eliminar estudiante por su correo")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Estudiante eliminado exitosamente"),
            @ApiResponse(code = 400, message = "Solicitud incorrecta"),
            @ApiResponse(code = 500, message = "Error interno del servidor")
    })
    @DeleteMapping("/eliminar/{email}")
    public ResponseEntity<String> eliminarEstudiante(@PathVariable String email) {
        try {
            estudianteGateway.eliminarEstudiante(email);
            return new ResponseEntity<>("Estudiante eliminado exitosamente", HttpStatus.OK);
        } catch (MessagingException | jakarta.mail.MessagingException e) {
            return new ResponseEntity<>("Error al enviar la notificación", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation("Eliminar propietario por ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Propietario eliminado exitosamente"),
            @ApiResponse(code = 200, message = "Error en la solicitud debido a datos inválidos o faltantes"),
            @ApiResponse(code = 500, message = "Error interno del servidor")
    }) 
    @DeleteMapping("/eliminarpro/{id}")
    public ResponseEntity<String> eliminarPropietario(@PathVariable Long id) {
        try {
            propietarioUseCase.eliminarPropietario(id);
            return ResponseEntity.ok("Propietario eliminado exitosamente.");
        } catch (IllegalStateException | MessagingException | jakarta.mail.MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
