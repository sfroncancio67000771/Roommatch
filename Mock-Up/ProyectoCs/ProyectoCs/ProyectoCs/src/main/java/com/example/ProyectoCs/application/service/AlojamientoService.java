package com.example.ProyectoCs.application.service;

import com.example.ProyectoCs.application.dto.AlojamientoDTO;
import com.example.ProyectoCs.application.dto.PreferenciaEstudianteDTO;
import com.example.ProyectoCs.domain.model.Alojamiento;
import com.example.ProyectoCs.infrastructure.gateway.AlojamientoGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AlojamientoService {

    private final AlojamientoGateway alojamientoGateway;

    @Autowired
    public AlojamientoService(AlojamientoGateway alojamientoGateway) {
        this.alojamientoGateway = alojamientoGateway;
    }

    public List<AlojamientoDTO> filtrarAlojamientos(double precioMin, double precioMax, String ciudad, boolean tieneLavanderia, boolean tieneRoomie, boolean tieneParqueaderoBicicleta) {
        return alojamientoGateway.filtrarAlojamientos(precioMin, precioMax, ciudad, tieneLavanderia, tieneRoomie, tieneParqueaderoBicicleta);
    }

    public void crearNuevaHabitacion(AlojamientoDTO alojamientoDTO) throws MessagingException, jakarta.mail.MessagingException {
        alojamientoGateway.crearNuevaHabitacion(alojamientoDTO);
    }

    public Map<String, Object> compararAlojamientos(int idAlojamiento1, int idAlojamiento2) {
        return alojamientoGateway.compararAlojamientos(idAlojamiento1, idAlojamiento2);
    }

    public List<AlojamientoDTO> buscarAlojamientos(PreferenciaEstudianteDTO preferencias) {
        return alojamientoGateway.buscarAlojamientos(preferencias);
    }

    public Integer obtenerUltimoId() {
        return alojamientoGateway.obtenerUltimoAlojamiento()
                .map(Alojamiento::getIdAlojamiento)
                .orElse(null); // Maneja el caso de no encontrar registros
    }

    public List<Alojamiento> obtenerTodosLosAlojamientos() {
        return alojamientoGateway.obtenerTodosLosAlojamientos();
    }

    public Optional<Alojamiento> obtenerAlojamientoPorId(Long id) {
        return alojamientoGateway.obtenerAlojamientoPorId(Math.toIntExact(id));
    }

    public void guardarImagen(int idAlojamiento, MultipartFile imagen) throws IOException {
        // Verificar que el alojamiento existe
        Optional<Alojamiento> alojamientoOptional = alojamientoGateway.obtenerAlojamientoPorId(idAlojamiento);
        if (!alojamientoOptional.isPresent()) {
            throw new IllegalArgumentException("El alojamiento con ID " + idAlojamiento + " no existe.");
        }

        // Validar que el archivo sea una imagen
        String contentType = imagen.getContentType();
        if (!isImageFormat(contentType)) {
            throw new IllegalArgumentException("El archivo no es un formato de imagen válido.");
        }

        // Guardar la imagen en el sistema de archivos
        String directorioDestino = "C:\\Users\\ronca\\Downloads\\RoomMatch\\Fotos_Habitaciones"; // Ruta actualizada
        File directorio = new File(directorioDestino);
        if (!directorio.exists()) {
            boolean created = directorio.mkdirs(); // Crea el directorio si no existe
            if (!created) {
                throw new IOException("No se pudo crear el directorio para guardar las imágenes.");
            }
        }

        String nombreArchivo = System.currentTimeMillis() + "_" + imagen.getOriginalFilename(); // Renombrar archivo
        File destinoArchivo = new File(directorio, nombreArchivo);

        // Guardar la imagen en el sistema de archivos
        imagen.transferTo(destinoArchivo);

        // Opcional: Actualizar la entidad Alojamiento para almacenar la ruta de la imagen en la base de datos
        Alojamiento alojamiento = alojamientoOptional.get();
        alojamiento.setImagenUrl(destinoArchivo.getPath()); // Asegúrate de tener un campo para la URL de la imagen
        alojamientoGateway.actualizarAlojamiento(alojamiento); // Asegúrate de que exista este método en tu gateway
    }

    private boolean isImageFormat(String contentType) {
        return contentType != null && (contentType.startsWith("image/"));
    }
}
