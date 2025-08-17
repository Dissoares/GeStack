export class Skills {
  public idSkill?: number;
  public descricao!: string;
  public categoria!: string;
  public tag!: string;
  
  constructor(init?: Partial<Skills>) {
    Object.assign(this, init);
  }
}
