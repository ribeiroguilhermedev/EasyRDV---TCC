package br.com.app.modelo.Enumeration;

public enum Role {
    ROLE_ADMIN_SIST(1),    ROLE_FUNC(2),    ROLE_ADMIN_EMP(3);
    private final int id;

    Role(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
}