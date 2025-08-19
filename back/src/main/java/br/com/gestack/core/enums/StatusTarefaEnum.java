package br.com.gestack.core.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum StatusTarefaEnum {
    A_FAZER(1),
    EM_ANALISE(2),
    EM_ANDAMENTO(3),
    EM_IMPEDIMENTO(4),
    MERGE_HML(5),
    MERGE_HOTFIX(6),
    TESTE_HML(7),
    TESTE_HOTFIX(8),
    AGUARDANDO_TESTE_QUALIDADE(9),
    TESTE_QUALIDADE_INICIADO(10),
    TESTE_QUALIDADE_APROVADO(11),
    TESTE_QUALIDADE_REPROVADO(12),
    AGUARDANDO_VALIDACAO_AREA(13),
    VALIDADO_AREA(14),
    APROVADO_PARA_PRODUCAO(15),
    EM_PRODUCAO(16),
    CONCLUIDA(17),
    CANCELADA(18),
    PAUSADA(19);

    private final int id;

    StatusTarefaEnum(int id) {
        this.id = id;
    }

    @JsonValue
    public int getId() {
        return id;
    }

    @JsonCreator
    public static StatusTarefaEnum fromId(int id) {
        for (StatusTarefaEnum status : values()) {
            if (status.id == id) {
                return status;
            }
        }
        throw new IllegalArgumentException("ID inválido para StatusTarefaEnum: " + id);
    }
}
