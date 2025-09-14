import { PerfilEnum } from '../enums';
import { Escala } from './escala';

export class Usuario {
  public id?: number;
  public nome!: string;
  public email!: string;
  public cpf?: string;
  public senha!: string;
  public perfil!: PerfilEnum;
  public dataCriacao?: string;
  public escala?: Array<Escala>;
  public ativo?: boolean;

  constructor(init?: Partial<Usuario>) {
    Object.assign(this, init);
  }
}
