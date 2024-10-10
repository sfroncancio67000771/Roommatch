package com.example.ProyectoCs.application.usecase;

import com.example.ProyectoCs.application.dto.EstudianteDTO;
import com.example.ProyectoCs.application.dto.PropietarioDTO;
import com.example.ProyectoCs.application.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;

@Component
public class SendNotificationUseCase {

    private final NotificationService notificationService;

    @Autowired
    public SendNotificationUseCase(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    public void sendWelcomeNotification(EstudianteDTO estudianteDTO) throws MessagingException {
       // notificationService.sendWelcomeNotification(estudianteDTO);
    }

    public void sendFarewellNotification(EstudianteDTO estudianteDTO) throws MessagingException {
//notificationService.sendFarewellNotification(estudianteDTO);
    }

    public void sendWelcomeNotification(PropietarioDTO propietarioDTO) throws MessagingException {
     //   notificationService.sendWelcomeNotification(propietarioDTO);
    }

    public void sendFarewellNotification(PropietarioDTO propietarioDTO) throws MessagingException {
     //   notificationService.sendFarewellNotification(propietarioDTO);
    }

    public void sendNewRoomNotification(EstudianteDTO estudianteDTO) throws MessagingException {
      //  notificationService.sendNewRoomNotification(estudianteDTO);
    }
}
