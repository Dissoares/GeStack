package br.com.gestack.core.enums;

import br.com.gestack.core.interfaces.BaseEnum;

public enum PerfilEnum implements BaseEnum<Integer> {
    ADMINISTRADOR(1, "Administrador"),
    LIDER_DE_DESENVOLVIMENTO(2, "Líder de Desenvolvimento"),
    LIDER_DE_NEGOCIO(3, "Líder de Negócio"),
    DESENVOLVEDOR(4, "Desenvolvedor"),
    ANALISTA(5, "Analista");

    private final Integer codigo;
    private final String descricao;

    PerfilEnum(Integer codigo, String descricao) {
        this.codigo = codigo;
        this.descricao = descricao;
    }

    @Override
    public Integer getCodigo() {
        return codigo;
    }

    public String getDescricao() {
        return descricao;
    }
}
