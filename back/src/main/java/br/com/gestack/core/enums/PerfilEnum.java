package br.com.gestack.core.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum PerfilEnum {
    ADMINISTRADOR(1),
    LIDER_DE_DESENVOLVIMENTO(2),
    LIDER_DE_NEGOCIO(3),
    DESENVOLVEDOR(4),
    ANALISTA(5);

    private final int id;

    PerfilEnum(int id) {
        this.id = id;
    }

    @JsonValue
    public int getId() {
        return id;
    }

    @JsonCreator
    public static PerfilEnum fromId(int id) {
        for (PerfilEnum nivel : values()) {
            if (nivel.id == id) {
                return nivel;
            }
        }
        throw new IllegalArgumentException("ID inválido para NivelAcessoEnum: " + id);
    }
}
