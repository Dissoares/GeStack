export class TipoEscalaEnum {
  public static readonly HOME_OFFICE = new TipoEscalaEnum(1, 'Home Office');
  public static readonly FERIAS = new TipoEscalaEnum(2, 'Férias');
  public static readonly ATESTADO = new TipoEscalaEnum(3, 'Atestado');
  public static readonly FALTA = new TipoEscalaEnum(4, 'Falta');
  public static readonly ANIVERSARIO = new TipoEscalaEnum(5, 'Aniversário');
  public static readonly LICENCA = new TipoEscalaEnum(6, 'Licença');
  public static readonly DESATIVADO = new TipoEscalaEnum(7, 'Desativado');

  private constructor(
    public readonly id: number,
    public readonly descricao: string
  ) {}

  public static getAll(): Array<TipoEscalaEnum> {
    return [
      this.HOME_OFFICE,
      this.FERIAS,
      this.ATESTADO,
      this.FALTA,
      this.ANIVERSARIO,
      this.LICENCA,
      this.DESATIVADO,
    ];
  }

  public static getById(id: number): TipoEscalaEnum | undefined {
    return this.getAll().find((escala) => escala.id === id);
  }
}
