package br.com.gestack.common;

import br.com.gestack.core.interfaces.BaseEnum;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class GenericEnumConverter implements AttributeConverter<BaseEnum<?>, Object> {

    private final Class<? extends BaseEnum<?>> enumClass;

    public GenericEnumConverter(Class<? extends BaseEnum<?>> enumClass) {
        this.enumClass = enumClass;
    }

    @Override
    public Object convertToDatabaseColumn(BaseEnum<?> attribute) {
        return attribute == null ? null : attribute.getCodigo();
    }

    @Override
    public BaseEnum<?> convertToEntityAttribute(Object dbData) {
        if (dbData == null) {
            return null;
        }

        for (BaseEnum<?> enumConstant : enumClass.getEnumConstants()) {
            if (enumConstant.getCodigo().equals(dbData)) {
                return enumConstant;
            }
        }

        throw new IllegalArgumentException("Código inválido para enum " + enumClass.getSimpleName() + ": " + dbData);
    }
}
