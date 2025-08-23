import { TipoEscalaEnum } from '../enums';

export class Escala {
  public idEscala!: number;
  public tipoEscala!: TipoEscalaEnum;
  public descricaoMotivo!: string;
  public dataInicio?: Date;
  public dataFim?: Date;
  public ativo?: boolean;

  constructor(init?: Partial<Escala>) {
    Object.assign(this, init);
  }
}
