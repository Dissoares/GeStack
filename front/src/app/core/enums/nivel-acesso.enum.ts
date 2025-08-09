export class NivelAcessoEnum {
  public static readonly ADMIN = new NivelAcessoEnum(1, 'ADMINISTRADOR');
  public static readonly LIDER_DESENVOLVIMENTO = new NivelAcessoEnum(
    2,
    'LÍDER DE DESENVOLVIMENTO'
  );
  public static readonly LIDER_NEGOCIO = new NivelAcessoEnum(
    3,
    'LÍDER DE NEGÓCIO'
  );
  public static readonly DESENVOLVEDOR = new NivelAcessoEnum(
    4,
    'DESENVOLVEDOR'
  );
  public static readonly ANALISTA = new NivelAcessoEnum(5, 'ANALISTA');

  private constructor(
    public readonly id: number,
    public readonly nivel: string
  ) {}

  public static getAll(): Array<NivelAcessoEnum> {
    return [
      this.ADMIN,
      this.LIDER_DESENVOLVIMENTO,
      this.LIDER_NEGOCIO,
      this.DESENVOLVEDOR,
      this.ANALISTA,
    ];
  }

  public static getById(id: number): NivelAcessoEnum | undefined {
    return this.getAll().find((n) => n.id === id);
  }
}
