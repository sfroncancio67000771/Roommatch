package com.example.ProyectoCs.infrastructure.gateway;

import javax.mail.MessagingException;

public interface EmailSenderGateway {
    void sendEmail(String to, String subject, String text) throws MessagingException, jakarta.mail.MessagingException;
}
