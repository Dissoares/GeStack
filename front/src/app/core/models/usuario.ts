import { NivelAcessoEnum } from '../enums';

export class Usuario {
  public idUsuario!: number;
  public nome!: string;
  public usuario!: string;
  public senha!: string;
  public confirmarSenha!: string;
  public nivelAcesso!: NivelAcessoEnum;
  public ativo!: boolean;
}
