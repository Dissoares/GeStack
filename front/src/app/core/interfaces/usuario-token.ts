export interface UsuarioToken {
  sub: string;
  roles: Array<string>;
  exp: number;
  email: string;
  idUsuario: number;
  nome: string;
  senha: string;
  confirmarSenha?: string;
  nivelAcesso: number;
  squad?: number;
  dataCadastro?: Date | string;
  ativo?: boolean;
}
