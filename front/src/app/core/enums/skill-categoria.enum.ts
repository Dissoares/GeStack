export class SkillCategoriaEnum {
  public static readonly FRONTEND = new SkillCategoriaEnum(1, 'Frontend');
  public static readonly BACKEND = new SkillCategoriaEnum(2, 'Backend');
  public static readonly BANCO_DADOS = new SkillCategoriaEnum(
    3,
    'Banco de Dados'
  );
  public static readonly DEVOPS = new SkillCategoriaEnum(4, 'Devops');
  public static readonly MOBILE = new SkillCategoriaEnum(5, 'Mobile');

  private constructor(
    public readonly id: number,
    public readonly descricao: string
  ) {}

  public static getAll(): Array<SkillCategoriaEnum> {
    return [
      this.BACKEND,
      this.FRONTEND,
      this.BANCO_DADOS,
      this.DEVOPS,
      this.MOBILE,
    ];
  }

  public static getById(id: number): SkillCategoriaEnum | undefined {
    return this.getAll().find((skill) => skill.id === id);
  }
}
