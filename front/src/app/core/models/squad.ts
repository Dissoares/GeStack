import { Usuario } from './usuario';

export class Squad {
  public idSquad?: number;
  public nome!: string;
  public ativo!: boolean;
  public lider!: Usuario;
  public membros?: Array<Usuario>;

  constructor(init?: Partial<Squad>) {
    Object.assign(this, init);
  }
}
