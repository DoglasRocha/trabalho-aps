export interface IUsuario {
  id: number;
  nome: string;
  email: string;
  senha?: string;
  data_nascimento: Date | string;
  cpf: string;
  tipo: string;
}

export interface IUsuarioWrapper {
  usuario: IUsuario;
}

export interface ICliente {
  endereco: string;
  cidade: string;
  estado: string;
  id: number;
  usuario_id: number;
  nome?: string;
  email?: string;
  senha?: string;
  data_nascimento?: Date | string;
  cpf?: string;
  tipo?: string;
}

export interface IClienteWrapper {
  cliente: ICliente;
  usuario: IUsuario;
}

export interface IEmpresa {
  nome_fantasia: string;
  cnpj: string;
  id: number;
}

export interface IEmpresaWrapper {
  empresa: IEmpresa;
}

export interface IPrestador {
  empresa_id: number;
  usuario_id: number;
  id: number;
  nome?: string;
  email?: string;
  senha?: string;
  data_nascimento?: Date | string;
  cpf?: string;
  tipo?: string;
}

export interface IPrestadorWrapper {
  prestador: IPrestador;
  empresa: IEmpresa;
  usuario: IUsuario;
}

export interface ICategoria {
  id: number;
  nome: string;
}

export interface ICategoriaWrapper {
  categoria: ICategoria;
}

export interface IServico {
  id: number;
  prestador_id: number;
  categoria_id: number;
  preco: number;
  duracao: number;
}

export interface IServicoWrapper {
  categoria: ICategoria;
  empresa: IEmpresa;
  prestador: IPrestador;
  servico: IServico;
  usuario: IUsuario;
}

export interface IAgendamento {
  horario_fim?: Date;
  horario_inicio: Date;
  observacoes_cliente: string | null;
  observacoes_prestador?: string | null;
  realizado: boolean;
}

export interface IAgendamentoWrapper {
  agendamento: IAgendamento;
  categoria: ICategoria;
  cliente: ICliente;
  empresa: IEmpresa;
  prestador: IPrestador;
  servico: IServico;
  usuario: IUsuario;
}
