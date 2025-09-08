export class PerfilEnum {
  public static ADMIN = new PerfilEnum(1, 'ADMINISTRADOR');
  public static LIDER_DESENVOLVIMENTO = new PerfilEnum(2, 'LÍDER DE DESENVOLVIMENTO');
  public static LIDER_NEGOCIO = new PerfilEnum(3, 'LÍDER DE NEGÓCIO');
  public static DESENVOLVEDOR = new PerfilEnum(4, 'DESENVOLVEDOR');
  public static ANALISTA_NEGOCIO = new PerfilEnum(5, 'ANALISTA DE NEGÓCIO');
  public static REPRESENTANTE_AREA = new PerfilEnum(6, 'REPRESENTANTE SETOR');

  private constructor(
    public readonly id: number,
    public readonly descricao: string
  ) {}

  public static getAll(): Array<PerfilEnum> {
    return [
      this.ADMIN,
      this.LIDER_NEGOCIO,
      this.LIDER_DESENVOLVIMENTO,
      this.ANALISTA_NEGOCIO,
      this.DESENVOLVEDOR,
      this.REPRESENTANTE_AREA,
    ];
  }

  public static getById(id: number): PerfilEnum | undefined {
    return this.getAll().find((perfil) => perfil.id === id);
  }
}
