package br.com.gestack.core.enums;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;


@Getter
@JsonFormat(shape = JsonFormat.Shape.NUMBER_INT)
public enum PerfilEnum {

    ADMINISTRADOR(1, "ADMINISTRADOR"),
    LIDER_DESENVOLVIMENTO(2, "LÍDER DE DESENVOLVIMENTO"),
    LIDER_NEGOCIO(3, "LÍDER DE NEGÓCIO"),
    DESENVOLVEDOR(4, "DESENVOLVEDOR"),
    ANALISTA_NEGOCIO(5, "ANALISTA DE NEGÓCIO"),
    REPRESENTANTE_AREA(6, "REPRESENTANTE SETOR");

    private final Integer codigo;
    private final String descricao;

    PerfilEnum(int codigo, String descricao) {
        this.codigo = codigo;
        this.descricao = descricao;
    }

    @JsonCreator
    public static PerfilEnum fromCodigo(Integer codigo) {
        if (codigo == null) return null;
        for (PerfilEnum e : values()) {
            if (e.getCodigo().equals(codigo)) return e;
        }
        throw new IllegalArgumentException("Código inválido: " + codigo);
    }

    @Converter()
    public static class EnumConverter implements AttributeConverter<PerfilEnum, Integer> {
        @Override
        public Integer convertToDatabaseColumn(PerfilEnum attribute) {
            return attribute != null ? attribute.getCodigo() : null;
        }

        @Override
        public PerfilEnum convertToEntityAttribute(Integer dbData) {
            return fromCodigo(dbData);
        }
    }
}
