import { Usuario } from './usuario';

export class Skill {
  public id?: number;
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
