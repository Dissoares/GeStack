export class StatusEnum {
  public static readonly ATIVO = new StatusEnum(true, 'ATIVO');
  public static readonly INATIVO = new StatusEnum(false, 'INATIVO');

  private constructor(
    public readonly status: boolean,
    public readonly descricao: string
  ) {}

  public static getAll(): Array<StatusEnum> {
    return [this.ATIVO, this.INATIVO];
  }

  public static getById(status: boolean): StatusEnum | undefined {
    return this.getAll().find((n) => n.status === status);
  }
}
