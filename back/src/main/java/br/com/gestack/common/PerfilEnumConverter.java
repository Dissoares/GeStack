package br.com.gestack.common;


import br.com.gestack.core.enums.PerfilEnum;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class PerfilEnumConverter extends GenericEnumConverter {
    public PerfilEnumConverter() {
        super(PerfilEnum.class);
    }
}