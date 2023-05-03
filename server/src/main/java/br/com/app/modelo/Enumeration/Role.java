package br.com.app.modelo.Enumeration;

public enum Role {
    ROLE_ADMIN_SIST(2),    ROLE_FUNC(3),    ROLE_ADMIN_EMP(4);
    private int id;

    Role(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
}