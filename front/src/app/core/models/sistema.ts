import { Usuario } from './usuario';
import { Skill } from './skill';

export class Sistema {
  public id?: number;
  public nome!: string;
  public descricao!: string;
  public responsavel?: Usuario;
  public linkPrototipo?: string;
  public linkDocumentacao?: string;
  public linkGit?: string;
  public linkProducao?: string;
  public dataCadastro?: Date;
  public skills?: Array<Skill>;
  public ativo?: boolean;

  constructor(init?: Partial<Sistema>) {
    Object.assign(this, init);
  }
}
