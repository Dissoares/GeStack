export class RotasEnum {
  static readonly ROOT = '';

  static readonly AUTH = {
    ROOT: 'auth',
    LOGIN: 'login',
    RECUPERAR_SENHA: 'recuperar-senha',
  };

  static readonly CADASTRO = {
    ROOT: 'cadastro',
    CLIENTE: 'cliente',
    ESTABELECIMENTO: 'estabelecimento',
    PRODUTO: 'produto',
  };

  static readonly ESTABELECIMENTO = {
    ROOT: 'estabelecimento',
    CATALOGO: 'catalogo',
    PEDIDOS: 'pedidos',
    PERFIL: 'perfil',
    DASHBOARD: 'dashboard',
  };

  static readonly CLIENTE = {
    ROOT: 'cliente',
    PEDIDOS: 'pedidos',
    PERFIL: 'perfil',
  };
}
