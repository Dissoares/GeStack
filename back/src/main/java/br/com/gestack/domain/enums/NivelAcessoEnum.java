package br.com.gestack.domain.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum NivelAcessoEnum {
    ADMINISTRADOR(1),
    LIDER_DE_DESENVOLVIMENTO(2),
    LIDER_DE_NEGOCIO(3),
    DESENVOLVEDOR(4),
    ANALISTA(5);

    private final int id;

    NivelAcessoEnum(int id) {
        this.id = id;
    }

    @JsonValue
    public int getId() {
        return id;
    }

    @JsonCreator
    public static NivelAcessoEnum fromId(int id) {
        for (NivelAcessoEnum nivel : values()) {
            if (nivel.id == id) {
                return nivel;
            }
        }
        throw new IllegalArgumentException("ID inválido para NivelAcessoEnum: " + id);
    }
}
