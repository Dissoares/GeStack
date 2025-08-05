import { NivelAcessoEnum } from '../enums';

export class Usuario {
  public idUsuario?: number;
  public nome!: string;
  public email!: string;
  public senha!: string;
  public confirmarSenha?: string;
  public nivelAcesso!: NivelAcessoEnum;
  public ativo?: boolean;

  constructor(init?: Partial<Usuario>) {
    Object.assign(this, init);
  }
}
