export class PerfilEnum {
  public static ADMINISTRADOR = new PerfilEnum(1, 'Administrador');
  public static LIDER_DESENVOLVIMENTO = new PerfilEnum(2,'Líder de desenvolvimento');
  public static LIDER_NEGOCIO = new PerfilEnum(3, 'Líder de negócio');
  public static DESENVOLVEDOR = new PerfilEnum(4, 'Desenvolvedor');
  public static ANALISTA_NEGOCIO = new PerfilEnum(5, 'Analista de negócio');
  public static REPRESENTANTE_AREA = new PerfilEnum(6,'Representante de setor');

  private constructor(
    public readonly id: number,
    public readonly descricao: string
  ) {}

  public static getAll(): Array<PerfilEnum> {
    return [
      this.ADMINISTRADOR,
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
