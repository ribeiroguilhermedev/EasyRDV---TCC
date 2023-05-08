package br.com.app.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;

@Service
@Slf4j
public class EmailService {

    @Autowired
    private final JavaMailSender jms;

    public EmailService(final JavaMailSender javaMailSender) {
        this.jms = javaMailSender;
    }

    public void enviar(String para, String titulo, String conteudo) {
        log.info("Enviando email para confirmação de cadastro..");

        var mensagem = new SimpleMailMessage();

        mensagem.setTo(para);
        mensagem.setSubject(titulo);
        mensagem.setText(conteudo);
        jms.send(mensagem);
        log.info("Email enviado com sucesso!");
    }

    public void enviarEmailComAnexo(String para, String titulo, String conteudo, String arquivo)
            throws MessagingException {
        log.info("Enviando email com anexo.");
        var mensagem = jms. createMimeMessage ();

        var helper = new MimeMessageHelper(mensagem, true); //html definido

        helper.setTo(para);
        helper.setSubject(titulo);
        helper.setText(conteudo, true);
        helper.addAttachment("img.jpeg", new ClassPathResource(arquivo));

        jms.send(mensagem);
        log.info("Email com anexo enviado com sucesso.");
    }
}
