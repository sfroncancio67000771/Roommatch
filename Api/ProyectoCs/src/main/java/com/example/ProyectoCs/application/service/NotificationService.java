package com.example.ProyectoCs.application.service;

import com.example.ProyectoCs.application.dto.EstudianteDTO;
import com.example.ProyectoCs.application.dto.PropietarioDTO;
import com.example.ProyectoCs.application.dto.ReservaDTO;
import com.example.ProyectoCs.infrastructure.gateway.EmailSenderGateway;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;

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
                "<body>" +
                "<h2>Hola " + estudianteDTO.getNombre() + ",</h2>" +
                "<p>Te queremos informar que una nueva habitación ha sido agregada a nuestra plataforma Roomatch.</p>" +
                "<p>Por favor, visita nuestra aplicación para ver los detalles de la habitación y verificar si cumple con tus intereses.</p>" +
                "<br>" +
                "<p>Atentamente,</p>" +
                "<p><strong>El equipo de Roomatch</strong></p>" +
                "</body>" +
                "</html>";
        emailSenderGateway.sendEmail(estudianteDTO.getEmail(), subject, htmlText);
    }


    public void sendNewReserve(ReservaDTO reservaDTO) throws MessagingException, jakarta.mail.MessagingException {
        String subject = "Agendamiento de reserva ";
        String text = "Hola " + reservaDTO.getEmailEstudiante() + ",\n\nTe queremos informar sobre la reserva que acabas de realizar  .\n\nAtentamente\nGrupo 3 Construcción de software";
        emailSenderGateway.sendEmail(reservaDTO.getEmailEstudiante(), subject, text);
    }
}
