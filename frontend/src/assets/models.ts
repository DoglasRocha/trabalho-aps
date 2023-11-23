export interface IUsuario {
  id: number;
  nome: string;
  email: string;
  senha?: string;
  data_nascimento: Date | string;
  cpf: string;
  tipo: string;
}

export function criarIUsuario(): IUsuario {
  return {
    id: -1,
    nome: "",
    email: "",
    data_nascimento: "",
    cpf: "",
    tipo: "",
  };
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

export function criarICliente(): ICliente {
  return {
    endereco: "",
    cidade: "",
    estado: "",
    id: -1,
    usuario_id: -1,
    tipo: "cliente",
  };
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

export function criarIEmpresa(): IEmpresa {
  return {
    nome_fantasia: "",
    cnpj: "",
    id: -1,
  };
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

export function criarIPrestador(): IPrestador {
  return {
    empresa_id: -1,
    usuario_id: -1,
    id: -1,
    tipo: "prestador",
  };
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

export function criarICategoria(): ICategoria {
  return {
    id: -1,
    nome: "",
  };
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

export function criarIServico(): IServico {
  return {
    id: -1,
    prestador_id: -1,
    categoria_id: -1,
    preco: -1,
    duracao: -1,
  };
}

export interface IServicoWrapper {
  categoria: ICategoria;
  empresa: IEmpresa;
  prestador: IPrestador;
  servico: IServico;
  usuario: IUsuario;
}

export interface IAgendamento {
  id?: number;
  cliente_id: number;
  servico_id: number;
  horario_fim?: Date | string;
  horario_inicio: Date | string;
  observacoes_cliente: string | null;
  observacoes_prestador?: string | null;
  realizado: boolean;
}

export function criarIAgendamento(): IAgendamento {
  return {
    cliente_id: -1,
    servico_id: -1,
    horario_inicio: "",
    observacoes_cliente: "",
    realizado: false,
  };
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
