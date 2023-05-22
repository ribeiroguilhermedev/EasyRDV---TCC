package br.com.app.messages;

import br.com.app.modelo.Enumeration.Constantes;
import br.com.app.modelo.Usuario;

public class EmailMessage {

    public static String createTitle(Usuario usuario) {
        return usuario.getNome() + ",recebemos seu cadastro!";
    }

    public static String messageToNewUser(Usuario usuario, String password) {
        return "Olá " + usuario.getNome()
                + "! Seja muito bem-vindo (a) em nosso site \n \n"
                + "Os seus dados e sua senha de acesso estão logo abaixo.\n\n"
                + "Usuário: " + usuario.getEmail () + "\n"
                + "Senha: " + usuario.getSenha() + "\n \n"
                + "É importante acessar sua conta e trocar sua senha";
    }

    public static String messageToForgotPassword(Usuario usuario, String password, String guid) {
        return "Olá " + usuario.getNome()
                + "! Para recuperar sua senha, acesse esse link" + Constantes.URL_ESQUECI_SENHA +"?guid=" + guid + "\n \n"
                + "Atenciosamente, equipe do EasyRDV";
    }

    public static String messageToNewUserImg(Usuario user, String password) {
        return "‹div›olá " + user.getNome() + "| Seja muito bem-vindo(a) em nosso site."
                        + " Os seus dados e sua senha de acesso estão logo abaixo.‹/div>"
                        + "‹br>"
                        + "‹div›====================================‹/div›"
                        + "‹div›‹strong›Nome: ‹/strong›" + user.getNome() + "</div›"
                        + "‹div›‹strong›Apelido: </strong›" + user.getSobrenome() + "‹/div›"
                        + "‹div›‹strong›E-mail: ‹/strong›" + user.getEmail() + "‹/div›"
                        + "‹div›‹strong>Password: ‹/strong›" + password + "‹/div›"
                        + "‹div›</div>"
                        + "‹br›"
                        + "‹div>Recomendamos acessar sua conta e trocar a senha.‹/div›";
    }
}
