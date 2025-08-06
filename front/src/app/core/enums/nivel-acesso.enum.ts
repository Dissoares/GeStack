export class NivelAcessoEnum {
  public static readonly ADMIN = new NivelAcessoEnum(
    1,
    'ADMINISTRADOR',
    'Acessa dados de todos os líderes, squads, desenvolvedores e analistas'
  );
  public static readonly LIDER_DESENVOLVIMENTO = new NivelAcessoEnum(
    2,
    'LÍDER DE DESENVOLVIMENTO',
    'Gerencia squads de desenvolvimento e seus desenvolvedores'
  );
  public static readonly LIDER_NEGOCIO = new NivelAcessoEnum(
    3,
    'LÍDER DE NEGÓCIO',
    'Gerencia squads de negócio e seus analistas'
  );
  public static readonly DESENVOLVEDOR = new NivelAcessoEnum(
    4,
    'DESENVOLVEDOR',
    'Consulta suas escalas de home office, férias, licenças e faltas'
  );
  public static readonly ANALISTA = new NivelAcessoEnum(
    5,
    'ANALISTA',
    'Consulta suas escalas de home office, férias, licenças e faltas'
  );
  private constructor(
    public readonly id: number,
    public readonly nivel: string,
    public readonly descricao: string
  ) {}

  public static getTodosNiveisAcesso(): Array<NivelAcessoEnum> {
    return [
      this.ADMIN,
      this.LIDER_DESENVOLVIMENTO,
      this.LIDER_NEGOCIO,
      this.DESENVOLVEDOR,
      this.ANALISTA,
    ];
  }

  public static getNivelAcessoPorId(id: number): NivelAcessoEnum | undefined {
    return NivelAcessoEnum.getTodosNiveisAcesso().find(
      (perm) => perm.id === id
    );
  }

  public static getNivelAcessoPorDescricao(
    descricao: string
  ): NivelAcessoEnum | undefined {
    return NivelAcessoEnum.getTodosNiveisAcesso().find(
      (perm) => perm.descricao.toLowerCase() === descricao.toLowerCase()
    );
  }
}
