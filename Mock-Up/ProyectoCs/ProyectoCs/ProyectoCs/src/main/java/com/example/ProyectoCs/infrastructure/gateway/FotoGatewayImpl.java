package com.example.ProyectoCs.infrastructure.gateway;

import com.example.ProyectoCs.application.dto.FotoDTO;
import com.example.ProyectoCs.domain.model.Alojamiento;
import com.example.ProyectoCs.domain.model.Foto;
import com.example.ProyectoCs.domain.repository.AlojamientoRepository;
import com.example.ProyectoCs.domain.repository.FotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Component
public class FotoGatewayImpl implements FotoGateway {

    private final FotoRepository fotoRepository;
    private final AlojamientoRepository alojamientoRepository;

    @Autowired
    public FotoGatewayImpl(FotoRepository fotoRepository, AlojamientoRepository alojamientoRepository) {
        this.fotoRepository = fotoRepository;
        this.alojamientoRepository = alojamientoRepository;
    }

    @Override
    public String uploadFoto(FotoDTO fotoDTO) throws IOException {
        MultipartFile archivo = fotoDTO.getArchivo();
        Integer idAlojamiento = fotoDTO.getIdAlojamiento();

        // Verificar si la habitación existe
        Alojamiento alojamiento = alojamientoRepository.findById(idAlojamiento)
                .orElseThrow(() -> new IllegalArgumentException("Habitación no encontrada con ID: " + idAlojamiento));

        // Guardar la información de la foto en la tabla Foto
        Foto foto = new Foto();
        foto.setUrl(archivo.getOriginalFilename());
        foto.setAlojamiento(alojamiento);

        fotoRepository.save(foto);

        // Guardar el archivo en una carpeta local
        String rutaCarpeta = "C:\\Users\\ronca\\Downloads\\Descargas\\ProyectoCs\\Fotos";
        Path rutaCompleta = Paths.get(rutaCarpeta + foto.getAlojamiento() + "_" + foto.getUrl());
        Files.write(rutaCompleta, archivo.getBytes());

        // Devolver la URL de la foto
        return rutaCarpeta + foto.getAlojamiento() + "_" + foto.getUrl();
    }
}
