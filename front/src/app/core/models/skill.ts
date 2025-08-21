import { Usuario } from './usuario';

export class Skill {
  public idSkill?: number;
  public nome!: string;
  public categoria!: string;
  public dataCadastro?: string;
  public dataModificacao?: string;
  public modificadoPor?: Usuario;
  public ativo?: boolean;

  constructor(init?: Partial<Skill>) {
    Object.assign(this, init);
  }
}
