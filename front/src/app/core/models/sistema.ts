import { Atividade } from './Atividade';
import { Skills } from './skills';

export class Sistema {
  public idSistema?: number;
  public nome!: string;
  public descricao!: string;
  public areaResponsavel?: string;
  public linkPrototipo?: string;
  public linkDocumentacao?: string;
  public linkGit?: string;
  public linkProducao?: string;
  public dataCadastro?: Date;
  public atividades?: Array<Atividade>;
  public skills?: Array<Skills>;
  public ativo?: boolean;

  constructor(init?: Partial<Sistema>) {
    Object.assign(this, init);
  }
}
