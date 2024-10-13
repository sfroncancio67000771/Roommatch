package com.example.ProyectoCs.application.service;

import com.example.ProyectoCs.application.dto.EstudianteDTO;
import com.example.ProyectoCs.application.dto.PropietarioDTO;
import com.example.ProyectoCs.application.dto.ReservaDTO;
import com.example.ProyectoCs.domain.model.Alojamiento;
import com.example.ProyectoCs.domain.model.Estudiante;
import com.example.ProyectoCs.domain.repository.AlojamientoRepository;
import com.example.ProyectoCs.domain.repository.EstudianteRepository;
import com.example.ProyectoCs.infrastructure.gateway.EmailSenderGateway;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.Optional;

@Service
public class NotificationService {

    private final EmailSenderGateway emailSenderGateway;

    @Autowired
    public NotificationService(EmailSenderGateway emailSenderGateway) {
        this.emailSenderGateway = emailSenderGateway;
    }

    public void sendWelcomeNotification(EstudianteDTO estudianteDTO) throws MessagingException, jakarta.mail.MessagingException {
        String subject = "Bienvenido a la plataforma";

        String htmlText = "<html>" +
                "<head>" +
                "<meta charset='UTF-8'>" +  // Define la codificación UTF-8
                "</head>" +
                "<body>" +
                "<p>Hola " + estudianteDTO.getNombre() + " 👋,</p>" +
                "<p>Estamos muy emocionados de darte la bienvenida a Roomatch, la plataforma creada especialmente para estudiantes de la Universidad Católica de Colombia. 🎓</p>" +
                "<p><strong>¿Qué puedes hacer en Roomatch?</strong></p>" +
                "<ul>" +
                "<li>Explora habitaciones disponibles cerca de la universidad. 🏠</li>" +
                "<li>Conecta con otros estudiantes de manera segura y confiable. 🤝</li>" +
                "<li>Encuentra el espacio que mejor se adapte a tus necesidades y estilo de vida. 🛏️</li>" +
                "</ul>" +
                "<p>Sabemos lo importante que es tener un lugar cómodo y adecuado para concentrarte en tus estudios, y Roomatch está aquí para hacer que encontrar tu hogar sea fácil y rápido.</p>" +
                "<p><strong>¿Listo para empezar?</strong></p>" +
                "<p>Inicia sesión en tu cuenta y descubre las mejores opciones de habitaciones disponibles. 💻</p>" +
                "<p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos. Estamos aquí para asistirte en todo momento. 💬</p>" +
                "<p>¡Bienvenido a la comunidad Roommatch! 🎉</p>" +
                "<p>Tu próximo hogar te espera.</p>" +
                "<p>Saludos,<br>El equipo de Roommatch</p>" +
                "</body>" +
                "</html>";
        emailSenderGateway.sendEmail(estudianteDTO.getEmail(), subject, htmlText);
    }

    public void sendFarewellNotification(EstudianteDTO estudianteDTO) throws MessagingException, jakarta.mail.MessagingException {
        String subject = "Despedida de la plataforma";
        String text = "Hola, " + estudianteDTO.getNombre() + ",\n\nAgradecemos por confiar en nosotros, lamentablemente hasta aquí hemos llegado tu usuario ha sido revocado.\n Gracias por compartir este tiempo con nosotros" +
                "\n\nSaludos,\nEquipo 3 Construcción de Software , \n\n Allison, Felipe, Sergio";
        emailSenderGateway.sendEmail(estudianteDTO.getEmail(), subject, text);
    }

    public void sendWelcomeNotification(PropietarioDTO propietarioDTO) throws MessagingException, jakarta.mail.MessagingException {
        String subject = "¡Bienvenido a nuestra plataforma!";
        String htmlText = "<html>" +
                "<head>" +
                "<meta charset='UTF-8'>" +  // Define la codificación UTF-8
                "</head>" +
                "<body>" +
                "<p>Hola " + propietarioDTO.getNombre() + ",</p>" +
                "<p>¡Nos alegra mucho darte la bienvenida a nuestra comunidad de Roommatch! 🎉</p>" +
                "<p>Para completar tu inscripción y asegurarnos de que todo esté en orden, necesitamos que nos envíes algunos documentos adicionales. Por favor, adjunta los siguientes documentos en tu próxima respuesta:</p>" +
                "<ul>" +
                "<li>Cédula de identificación 🆔</li>" +
                "<li>Carta de propiedad 🏠</li>" +
                "<li>Certificado de vivienda 📝</li>" +
                "</ul>" +
                "<p>Si tienes alguna pregunta o necesitas ayuda con el proceso, no dudes en contactarnos. Estamos aquí para ayudarte en cada paso del camino.</p>" +
                "<p>¡Gracias por unirte a nosotros y bienvenido a bordo!</p>" +
                "<p>Saludos cordiales,<br>El equipo de Roommatch</p>" +
                "</body>" +
                "</html>";
        emailSenderGateway.sendEmail(propietarioDTO.getEmail(), subject, htmlText);
    }

    public void sendFarewellNotification(PropietarioDTO propietarioDTO) throws MessagingException, jakarta.mail.MessagingException {
        String subject = "Despedida de la plataforma";
        String text = "Hola " + propietarioDTO.getNombre() + ",\n\nAgradecemos por confiar en nosotros, lamentablemente hasta aquí hemos llegado tu usuario ha sido revocado.\n Gracias por compartir este tiempo con nosotros" +
                "\n\nSaludos,\nEquipo 3 Construcción de Software , \n\n Allison, Felipe, Sergio";
        emailSenderGateway.sendEmail(propietarioDTO.getEmail(), subject, text);
    }

    public void sendNewRoomNotification(EstudianteDTO estudianteDTO) throws MessagingException, jakarta.mail.MessagingException {
        String subject = "Nueva Habitación Disponible en Roomatch";

        // Crear el cuerpo del correo en formato HTML
        String htmlText = "<html>" +
                "<body style='font-family: Arial, sans-serif; color: #333;'>" +
                "<h2 style='color: #4CAF50;'>🌟 Hola " + estudianteDTO.getNombre() + ",</h2>" +
                "<p>🎉 Nos complace informarte que se ha agregado una nueva habitación a nuestra plataforma <strong>Roomatch</strong>!</p>" +
                "<p>🏠 Te invitamos a visitar nuestra aplicación para descubrir los detalles de la habitación y verificar si se ajusta a tus intereses.</p>" +
                "<br>" +
                "<p>💼 Atentamente,</p>" +
                "<p><strong>El equipo de Roomatch</strong> 😊</p>" +
                "</body>" +
                "</html>";

        emailSenderGateway.sendEmail(estudianteDTO.getEmail(), subject, htmlText);
    }


    @Autowired
    private EstudianteRepository estudianteRepository; // Repositorio de Estudiantes

    @Autowired
    private AlojamientoRepository alojamientoRepository; // Repositorio de Alojamientos

    public void sendNewReserve(ReservaDTO reservaDTO) throws MessagingException, jakarta.mail.MessagingException {
        String subject = "Confirmación de Reserva en Roomatch";

        // Obtener información de la reserva
        String fechaInicio = String.valueOf(reservaDTO.getFechaInicio());
        String fechaFin = String.valueOf(reservaDTO.getFechaFin());

        // Obtener el nombre del estudiante
        Estudiante estudiante = estudianteRepository.findByEmail(reservaDTO.getEmailEstudiante());
        String nombreEstudiante = (estudiante != null) ? estudiante.getNombre() : "Estudiante"; // Manejo de posibles nulos

        // Obtener el alojamiento por ID
        Optional<Alojamiento> alojamiento = alojamientoRepository.findById(reservaDTO.getIdAlojamiento()); // Suponiendo que tienes un campo alojamientoId en ReservaDTO
        String nombreAlojamiento = (alojamiento != null) ? alojamiento.get().getNombreAlojamiento() : "Alojamiento Desconocido";
        String descripcionAlojamiento = (alojamiento != null) ? alojamiento.get().getDescripcion() : "Descripción no disponible.";

        String htmlText = "<html>" +
                "<body style='font-family: Arial, sans-serif; color: #333;'>" +
                "<h2 style='color: #4CAF50;'>🌟 Hola " + nombreEstudiante + ",</h2>" +
                "<p>🎉 ¡Tu reserva ha sido confirmada exitosamente en Roomatch!</p>" +
                "<p>🏠 Aquí están los detalles de tu reserva:</p>" +
                "<ul>" +
                "<li><strong>Nombre del Alojamiento:</strong> " + nombreAlojamiento + "</li>" +
                "<li><strong>Descripción:</strong> " + descripcionAlojamiento + "</li>" +
                "<li><strong>Fecha de inicio Reserva:</strong> " + fechaInicio + "</li>" +
                "<li><strong>Fecha Fin Reserva:</strong> " + fechaFin + "</li>" +
                "</ul>" +
                "<p>👀 Te invitamos a visitar nuestra aplicación para explorar más sobre la habitación y asegurarte de que cumpla con tus expectativas.</p>" +
                "<br>" +
                "<p>💼 Atentamente,</p>" +
                "<p><strong>El equipo de Roomatch</strong> 😊</p>" +
                "</body>" +
                "</html>";

        emailSenderGateway.sendEmail(reservaDTO.getEmailEstudiante(), subject, htmlText);
    }
}


