package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.application.dto.FotoDTO;
import com.example.ProyectoCs.domain.model.Alojamiento;
import com.example.ProyectoCs.domain.model.Foto;
import com.example.ProyectoCs.domain.repository.AlojamientoRepository;
import com.example.ProyectoCs.domain.repository.FotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class FotoGatewayImpl implements FotoGateway {

    private final String directorioFotos = "C:/Users/ronca/Downloads/RoomMatch/Fotos_Habitaciones/";
    private final AlojamientoRepository alojamientoRepository;
    private final FotoRepository fotoRepository;

    @Autowired
    public FotoGatewayImpl(AlojamientoRepository alojamientoRepository, FotoRepository fotoRepository) {
        this.alojamientoRepository = alojamientoRepository;
        this.fotoRepository = fotoRepository;
    }

    @Override
    public String uploadFoto(FotoDTO fotoDTO) {
        MultipartFile archivo = fotoDTO.getArchivo();
        if (archivo != null && !archivo.isEmpty()) {
            try {
                String nombreArchivo = archivo.getOriginalFilename();
                Path rutaArchivo = Paths.get(directorioFotos + nombreArchivo);

                // Crear la carpeta si no existe
                Files.createDirectories(rutaArchivo.getParent());

                // Guardar el archivo en la ruta
                archivo.transferTo(rutaArchivo.toFile());

                Alojamiento alojamiento = alojamientoRepository.findById(fotoDTO.getIdAlojamiento())
                        .orElseThrow(() -> new IllegalArgumentException("El alojamiento no existe"));

                Foto foto = new Foto();
                foto.setAlojamiento(alojamiento);
                foto.setUrl("/" + nombreArchivo); // Guardar solo el nombre del archivo como URL

                fotoRepository.save(foto);
                return "Foto subida exitosamente a: " + foto.getUrl();
            } catch (IOException e) {
                throw new RuntimeException("Error al guardar la foto: " + e.getMessage());
            }
        } else {
            throw new IllegalArgumentException("El archivo está vacío o no es válido.");
        }
    }

    @Override
    public void saveFotoUrl(int idAlojamiento, String url) {
        // Obtener el alojamiento y asignarlo a la nueva foto
        Alojamiento alojamiento = alojamientoRepository.findById(idAlojamiento)
                .orElseThrow(() -> new IllegalArgumentException("El alojamiento no existe"));

        Foto foto = new Foto();
        foto.setAlojamiento(alojamiento);
        foto.setUrl(url);

        fotoRepository.save(foto); // Guardar en la base de datos
    }

    @Override
    public List<FotoDTO> obtenerFotosPorAlojamiento(int idAlojamiento) {
        // Consultar todas las fotos asociadas al idAlojamiento en la base de datos
        Alojamiento alojamiento = alojamientoRepository.findById(idAlojamiento)
                .orElseThrow(() -> new IllegalArgumentException("El alojamiento no existe"));

        List<Foto> fotos = fotoRepository.findByAlojamiento(alojamiento);

        // Convertir las entidades Foto a DTOs
        return fotos.stream()
                .map(foto -> {
                    FotoDTO fotoDTO = new FotoDTO();
                    fotoDTO.setIdFoto(foto.getIdFoto());
                    fotoDTO.setIdAlojamiento(idAlojamiento);
                    fotoDTO.setUrl(foto.getUrl());
                    return fotoDTO;
                })
                .collect(Collectors.toList());
    }

    @CrossOrigin(origins = "http://127.0.0.1:5501")
    @Override
    public List<FotoDTO> obtenerTodasLasFotos() {
        List<Foto> fotos = fotoRepository.findAll();
        return fotos.stream()
                .map(foto -> {
                    FotoDTO fotoDTO = new FotoDTO();
                    fotoDTO.setIdFoto(foto.getIdFoto());
                    fotoDTO.setIdAlojamiento(foto.getAlojamiento().getIdAlojamiento());
                    fotoDTO.setUrl(foto.getUrl());
                    return fotoDTO;
                })
                .collect(Collectors.toList());
    }

    @Override
    public String obtenerNombreFotoPorAlojamiento(int idAlojamiento) {
        // Obtener la primera foto asociada al alojamiento por idAlojamiento
        Foto foto = fotoRepository.findFirstByAlojamientoIdAlojamiento(idAlojamiento);

        // Verifica que la foto existe y retorna el nombre o ruta de la foto
        if (foto != null) {
            return foto.getUrl(); // Devuelve el nombre del archivo o la URL
        } else {
            return null; // No hay foto asociada
        }
    }
}
