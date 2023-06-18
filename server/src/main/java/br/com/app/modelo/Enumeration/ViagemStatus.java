package br.com.app.modelo.Enumeration;

public enum ViagemStatus {
    EM_ANDAMENTO(0),
    AGUARDANDO_APROVACAO(1),
    AGUARDANDO_INICIO(2),
    APROVADA(3),
    APROVADA_PARCIAL(4),
    REPROVADA(5),
    FINALIZADA(6);
    private int id;

    ViagemStatus(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
}