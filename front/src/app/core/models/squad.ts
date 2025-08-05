import { Usuario } from './usuario';

export class Squad {
  public idSquad?: number;
  public nome!: string;
  public lider!: Usuario;
  public membros?: Array<Usuario>;
  public dataCriacao?: Date;
  public ativo!: boolean;

  constructor(init?: Partial<Squad>) {
    Object.assign(this, init);
  }
}
