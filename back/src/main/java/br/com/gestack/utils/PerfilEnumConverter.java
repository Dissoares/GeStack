package br.com.gestack.utils;

import br.com.gestack.core.enums.PerfilEnum;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class PerfilEnumConverter implements AttributeConverter<PerfilEnum, Integer> {

    @Override
    public Integer convertToDatabaseColumn(PerfilEnum attribute) {
        return attribute != null ? attribute.getId() : null;
    }

    @Override
    public PerfilEnum convertToEntityAttribute(Integer dbData) {
        return dbData != null ? PerfilEnum.fromId(dbData) : null;
    }
}
