export class PrioridadeEnum {
  public static readonly ALTA = new PrioridadeEnum(1, 'ALTA');
  public static readonly NORMAL = new PrioridadeEnum(2, 'NORMAL');
  public static readonly URGENTE = new PrioridadeEnum(2, 'URGENTE');

  private constructor(
    public readonly id: number,
    public readonly descricao: string
  ) {}

  public static getAll(): Array<PrioridadeEnum> {
    return [this.ALTA, this.NORMAL, this.URGENTE];
  }

  public static getById(id: number): PrioridadeEnum | undefined {
    return this.getAll().find((skill) => skill.id === id);
  }
}
