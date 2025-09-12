import { Sistema } from './sistema';
import { Usuario } from './usuario';

export class Demanda {
  public id?: number;
  public titulo!: string;
  public descricao?: string;
  public status!: string;
  public prazo?: string;
  public responsavel!: Usuario;
  public analistaResponsavel?: Usuario;
  public lider?: Usuario;
  public sprint?: string;
  public sistema!: Sistema;
  public solicitante?: Usuario;
  public demanda?: string;
  public prioridade?: string;
  public pontosEstimados?: number;
  public pontosReais?: number;
  public tempoEstimado?: number;
  public dataConclusao?: string;
  public comentarios?: string;
  public anexos?: string;
  public demandaAtividades?: string;
  public dataCriacao?: string;
  public ativo: boolean = true;

  constructor(init?: Partial<Demanda>) {
    Object.assign(this, init);
  }
}
