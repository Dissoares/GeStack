import { PerfilEnum } from '../enums';
import { Escala } from './escala';
import { Squad } from './squad';

export class Usuario {
  public idUsuario?: number;
  public nome!: string;
  public email!: string;
  public senha!: string;
  public confirmarSenha?: string;
  public perfil!: PerfilEnum;
  public squad?: Squad;
  public ehLider!: boolean;
  public dataCriacao?: Date | string;
  public criadoPor?: Usuario;
  public escala?: Array<Escala>;
  public ativo?: boolean;

  constructor(init?: Partial<Usuario>) {
    Object.assign(this, init);
  }
}
