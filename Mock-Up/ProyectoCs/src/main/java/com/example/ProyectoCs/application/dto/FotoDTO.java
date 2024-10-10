package com.example.ProyectoCs.application.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class FotoDTO {
    private int idFoto;
    private int idAlojamiento;
    private String url;
    private MultipartFile archivo;
    }

