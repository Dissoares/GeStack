export class PermissaoAcessoEnum {
  public static readonly ADMIN = new PermissaoAcessoEnum(1, 'ADMINISTRADOR');
  public static readonly LIDER_DESENVOLVIMENTO = new PermissaoAcessoEnum(
    2,
    'LÍDER DE DESENVOLVIMENTO'
  );
  public static readonly LIDER_NEGOCIO = new PermissaoAcessoEnum(
    3,
    'LÍDER DE NEGÓCIO'
  );
  public static readonly DESENVOLVEDOR = new PermissaoAcessoEnum(
    4,
    'DESENVOLVEDOR'
  );
  public static readonly ANALISTA = new PermissaoAcessoEnum(5, 'ANALISTA');

  private static readonly LISTA_PERMISSAO: Array<PermissaoAcessoEnum> = [
    PermissaoAcessoEnum.ADMIN,
    PermissaoAcessoEnum.LIDER_DESENVOLVIMENTO,
    PermissaoAcessoEnum.LIDER_NEGOCIO,
    PermissaoAcessoEnum.DESENVOLVEDOR,
    PermissaoAcessoEnum.ANALISTA,
  ];

  private constructor(
    public readonly id: number,
    public readonly descricao: string
  ) {}

  public static getTodosNiveisPermissao(): Array<PermissaoAcessoEnum> {
    return [...PermissaoAcessoEnum.LISTA_PERMISSAO];
  }

  public static getNivelPermissaoPorId(
    id: number
  ): PermissaoAcessoEnum | undefined {
    return PermissaoAcessoEnum.LISTA_PERMISSAO.find((perm) => perm.id === id);
  }

  public static getPermissaoPorDescricao(
    descricao: string
  ): PermissaoAcessoEnum | undefined {
    return PermissaoAcessoEnum.LISTA_PERMISSAO.find(
      (perm) => perm.descricao.toLowerCase() === descricao.toLowerCase()
    );
  }
}
