package br.com.gestack.utils;

import br.com.gestack.core.enums.NivelAcessoEnum;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class NivelAcessoConverter implements AttributeConverter<NivelAcessoEnum, Integer> {

    @Override
    public Integer convertToDatabaseColumn(NivelAcessoEnum attribute) {
        return attribute != null ? attribute.getId() : null;
    }

    @Override
    public NivelAcessoEnum convertToEntityAttribute(Integer dbData) {
        return dbData != null ? NivelAcessoEnum.fromId(dbData) : null;
    }
}
