import { Sistema } from './sistema';
import { Usuario } from './usuario';

export class Atividade {
  public idTarefa?: number;
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
  public registrosAtividades?: string;
  public dataCriacao?: string;
  public ativo: boolean = true;

  constructor(init?: Partial<Atividade>) {
    Object.assign(this, init);
  }
}
