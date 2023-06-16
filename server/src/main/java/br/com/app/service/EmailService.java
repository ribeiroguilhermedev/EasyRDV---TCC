package br.com.app.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.concurrent.Future;

@Service
@Slf4j
public class EmailService {

    @Autowired
    private final JavaMailSender jms;

    public EmailService(final JavaMailSender javaMailSender) {
        this.jms = javaMailSender;
    }

    @Async
    public Future<Boolean> sendAsync(String para, String titulo, String conteudo) {
        MimeMessage mail = jms.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mail, true);
            helper.setTo(para);
            helper.setSubject(titulo);
            helper.setText(conteudo, true);
            jms.send(mail);
            return new AsyncResult<>(true);
        }catch (Exception e){
            return new AsyncResult<>(false  );
        }
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
