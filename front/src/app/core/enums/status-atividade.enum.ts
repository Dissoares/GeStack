import { PerfilEnum } from './perfil.enum';

export class StatusDemandaEnum {
  public static readonly A_FAZER = new StatusDemandaEnum(1, 'A FAZER');
  public static readonly EM_ANALISE = new StatusDemandaEnum(2, 'EM ANÁLISE');
  public static readonly EM_ANDAMENTO = new StatusDemandaEnum(
    3,
    'EM ANDAMENTO'
  );
  public static readonly EM_IMPEDIMENTO = new StatusDemandaEnum(
    4,
    'IMPEDIMENTO'
  );
  public static readonly MERGE_HML = new StatusDemandaEnum(5, 'MERGE HML');
  public static readonly MERGE_HOTFIX = new StatusDemandaEnum(
    6,
    'MERGE HOTFIX'
  );
  public static readonly TESTE_HML = new StatusDemandaEnum(7, 'TESTE HML');
  public static readonly TESTE_HOTFIX = new StatusDemandaEnum(
    8,
    'TESTE HOTFIX'
  );
  public static readonly AGUARDANDO_QA = new StatusDemandaEnum(
    9,
    'AGUARDANDO TESTE DE QUALIDADE'
  );
  public static readonly QA_EM_ANDAMENTO = new StatusDemandaEnum(
    10,
    'TESTE DE QUALIDADE EM ANDAMENTO'
  );
  public static readonly QA_APROVADO = new StatusDemandaEnum(
    11,
    'TESTE DE QUALIDADE APROVADO'
  );
  public static readonly QA_REPROVADO = new StatusDemandaEnum(
    12,
    'TESTE DE QUALIDADE REPROVADO'
  );
  public static readonly AGUARDANDO_VALIDACAO_AREA = new StatusDemandaEnum(
    13,
    'AGUARDANDO VALIDAÇÃO ÁREA'
  );
  public static readonly VALIDADO_AREA = new StatusDemandaEnum(
    14,
    'VALIDADO PELA ÁREA'
  );
  public static readonly APROVADO_PARA_PRODUCAO = new StatusDemandaEnum(
    15,
    'APROVADO PARA DEPLOY'
  );
  public static readonly EM_PRODUCAO = new StatusDemandaEnum(16, 'EM PRODUÇÃO');
  public static readonly CONCLUIDA = new StatusDemandaEnum(17, 'CONCLUÍDA');
  public static readonly CANCELADA = new StatusDemandaEnum(18, 'CANCELADA');
  public static readonly PAUSADA = new StatusDemandaEnum(19, 'PAUSADA');
  public static readonly ARQUIVADA = new StatusDemandaEnum(20, 'ARQUIVADA');

  private constructor(
    public readonly id: number,
    public readonly descricao: string
  ) {}

  public static getAll(): Array<StatusDemandaEnum> {
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

  public static getById(id: number): StatusDemandaEnum | undefined {
    return this.getAll().find((n) => n.id === id);
  }

  public static getPermitidosPorPerfil(idPerfil: number): StatusDemandaEnum[] {
    switch (idPerfil) {
      case PerfilEnum.DESENVOLVEDOR.id:
        return [
          this.EM_ANDAMENTO,
          this.EM_IMPEDIMENTO,
          this.QA_EM_ANDAMENTO,
          this.PAUSADA,
          this.CONCLUIDA,
        ];
      case PerfilEnum.ANALISTA_NEGOCIO.id:
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
      case PerfilEnum.LIDER_DESENVOLVIMENTO.id || PerfilEnum.LIDER_NEGOCIO.id:
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
      case PerfilEnum.ADMINISTRADOR.id:
        return this.getAll();
      case PerfilEnum.REPRESENTANTE_AREA.id:
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
    status: StatusDemandaEnum
  ): boolean {
    return this.getPermitidosPorPerfil(idPerfil).some(
      (s) => s.id === status.id
    );
  }
}
