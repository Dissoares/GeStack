export class Skill {
  public idSkill?: number;
  public descricao!: string;
  public categoria!: string;
  public tag!: string;
  
  constructor(init?: Partial<Skill>) {
    Object.assign(this, init);
  }
}
