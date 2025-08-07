import { NivelAcessoEnum } from '../enums';
import { Squad } from './squad';

export class Usuario {
  public idUsuario?: number;
  public nome!: string;
  public email!: string;
  public senha!: string;
  public confirmarSenha?: string;
  public nivelAcesso!: NivelAcessoEnum;
  public squad?: Squad;
  public dataCadastro?: Date | string;
  public ativo?: boolean;

  constructor(init?: Partial<Usuario>) {
    Object.assign(this, init);
  }
}
