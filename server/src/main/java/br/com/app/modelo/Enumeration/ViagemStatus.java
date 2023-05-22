package br.com.app.modelo.Enumeration;

public enum ViagemStatus {
    AGUARDANDO_INICIO(1), EM_ANDAMENTO(2),   AGUARDANDO_APROVACAO(3), FINALIZADA(4);
    private int id;

    ViagemStatus(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
}