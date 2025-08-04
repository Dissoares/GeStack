import { PermissaoAcessoEnum } from '../enums';

export class Usuario {
  public id!: number;
  public nome!: string;
  public usuario!: string;
  public senha!: string;
  public confirmarSenha!: string;
  public permissao!: PermissaoAcessoEnum;
  public ativo!: boolean;
}
