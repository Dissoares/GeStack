import { Atividade } from './Atividade';
import { Skill } from './skill';
import { Usuario } from './usuario';

export class Sistema {
  public idSistema?: number;
  public nome!: string;
  public descricao!: string;
  public responsavel?: Usuario;
  public linkPrototipo?: string;
  public linkDocumentacao?: string;
  public linkGit?: string;
  public linkProducao?: string;
  public dataCadastro?: Date;
  public atividades?: Array<Atividade>;
  public skills?: Array<Skill>;
  public ativo?: boolean;

  constructor(init?: Partial<Sistema>) {
    Object.assign(this, init);
  }
}
