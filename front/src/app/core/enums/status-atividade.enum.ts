import { NivelAcessoEnum } from './nivel-acesso.enum';

export class StatusAtividadeEnum {
  public static readonly A_FAZER = new StatusAtividadeEnum(1, 'A FAZER');
  public static readonly EM_ANALISE = new StatusAtividadeEnum(2, 'EM ANÁLISE');
  public static readonly EM_ANDAMENTO = new StatusAtividadeEnum(
    3,
    'EM ANDAMENTO'
  );
  public static readonly EM_IMPEDIMENTO = new StatusAtividadeEnum(
    4,
    'IMPEDIMENTO'
  );
  public static readonly MERGE_HML = new StatusAtividadeEnum(5, 'MERGE HML');
  public static readonly MERGE_HOTFIX = new StatusAtividadeEnum(
    6,
    'MERGE HOTFIX'
  );
  public static readonly TESTE_HML = new StatusAtividadeEnum(7, 'TESTE HML');
  public static readonly TESTE_HOTFIX = new StatusAtividadeEnum(
    8,
    'TESTE HOTFIX'
  );
  public static readonly AGUARDANDO_QA = new StatusAtividadeEnum(
    9,
    'AGUARDANDO TESTE DE QUALIDADE'
  );
  public static readonly QA_EM_ANDAMENTO = new StatusAtividadeEnum(
    10,
    'TESTE DE QUALIDADE EM ANDAMENTO'
  );
  public static readonly QA_APROVADO = new StatusAtividadeEnum(
    11,
    'TESTE DE QUALIDADE APROVADO'
  );
  public static readonly QA_REPROVADO = new StatusAtividadeEnum(
    12,
    'TESTE DE QUALIDADE REPROVADO'
  );
  public static readonly AGUARDANDO_VALIDACAO_AREA = new StatusAtividadeEnum(
    13,
    'AGUARDANDO VALIDAÇÃO ÁREA'
  );
  public static readonly VALIDADO_AREA = new StatusAtividadeEnum(
    14,
    'VALIDADO PELA ÁREA'
  );
  public static readonly APROVADO_PARA_PRODUCAO = new StatusAtividadeEnum(
    15,
    'APROVADO PARA DEPLOY'
  );
  public static readonly EM_PRODUCAO = new StatusAtividadeEnum(
    16,
    'EM PRODUÇÃO'
  );
  public static readonly CONCLUIDA = new StatusAtividadeEnum(17, 'CONCLUÍDA');
  public static readonly CANCELADA = new StatusAtividadeEnum(18, 'CANCELADA');
  public static readonly PAUSADA = new StatusAtividadeEnum(19, 'PAUSADA');
  public static readonly ARQUIVADA = new StatusAtividadeEnum(20, 'ARQUIVADA');

  private constructor(
    public readonly id: number,
    public readonly descricao: string
  ) {}

  public static getAll(): Array<StatusAtividadeEnum> {
    return [
      this.A_FAZER,
      this.EM_ANALISE,
      this.EM_ANDAMENTO,
      this.EM_IMPEDIMENTO,
      this.MERGE_HML,
      this.MERGE_HOTFIX,
      this.TESTE_HML,
      this.TESTE_HOTFIX,
      this.AGUARDANDO_QA,
      this.QA_EM_ANDAMENTO,
      this.QA_APROVADO,
      this.QA_REPROVADO,
      this.AGUARDANDO_VALIDACAO_AREA,
      this.VALIDADO_AREA,
      this.APROVADO_PARA_PRODUCAO,
      this.EM_PRODUCAO,
      this.CONCLUIDA,
      this.CANCELADA,
      this.PAUSADA,
      this.ARQUIVADA,
    ];
  }

  public static getById(id: number): StatusAtividadeEnum | undefined {
    return this.getAll().find((n) => n.id === id);
  }

  public static getPermitidosPorPerfil(
    idPerfil: number
  ): StatusAtividadeEnum[] {
    switch (idPerfil) {
      case NivelAcessoEnum.DESENVOLVEDOR.id:
        return [
          this.EM_ANDAMENTO,
          this.EM_IMPEDIMENTO,
          this.QA_EM_ANDAMENTO,
          this.PAUSADA,
          this.CONCLUIDA,
        ];
      case NivelAcessoEnum.ANALISTA.id:
        return [
          this.EM_ANALISE,
          this.EM_ANDAMENTO,
          this.EM_IMPEDIMENTO,
          this.AGUARDANDO_QA,
          this.QA_EM_ANDAMENTO,
          this.QA_APROVADO,
          this.QA_REPROVADO,
          this.AGUARDANDO_VALIDACAO_AREA,
          this.VALIDADO_AREA,
        ];
      case NivelAcessoEnum.LIDER_DESENVOLVIMENTO.id ||
        NivelAcessoEnum.LIDER_NEGOCIO.id:
        return [
          this.A_FAZER,
          this.EM_ANALISE,
          this.EM_ANDAMENTO,
          this.EM_IMPEDIMENTO,
          this.MERGE_HML,
          this.MERGE_HOTFIX,
          this.TESTE_HML,
          this.TESTE_HOTFIX,
          this.AGUARDANDO_QA,
          this.QA_EM_ANDAMENTO,
          this.QA_APROVADO,
          this.QA_REPROVADO,
          this.AGUARDANDO_VALIDACAO_AREA,
          this.VALIDADO_AREA,
          this.APROVADO_PARA_PRODUCAO,
          this.EM_PRODUCAO,
          this.PAUSADA,
          this.CANCELADA,
        ];
      case NivelAcessoEnum.ADMIN.id:
        return this.getAll();
      case NivelAcessoEnum.AREA.id:
        return [
          this.AGUARDANDO_VALIDACAO_AREA,
          this.VALIDADO_AREA,
          this.APROVADO_PARA_PRODUCAO,
        ];
      default:
        return [];
    }
  }

  public static podeAlterar(
    idPerfil: number,
    status: StatusAtividadeEnum
  ): boolean {
    return this.getPermitidosPorPerfil(idPerfil).some(
      (s) => s.id === status.id
    );
  }
}
