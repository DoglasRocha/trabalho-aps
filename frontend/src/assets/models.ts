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

export class Usuario implements IUsuario {
  nome: string;
  email: string;
  senha: string;
  data_nascimento: Date | string;
  cpf: string;
  tipo: string;

  constructor(
    nome: string = "",
    email: string = "",
    senha: string = "",
    data_nascimento: Date = new Date(),
    cpf: string = "",
    tipo: string = ""
  ) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.data_nascimento = data_nascimento;
    this.cpf = cpf;
    this.tipo = tipo;
  }

  geraImpressao(): string {
    let texto: string = `Nome: ${this.nome}\n`;
    texto += `Email: ${this.email}\n`;
    texto += `Senha: ${this.senha}\n`;
    texto += `Data Nascimento: ${this.data_nascimento}\n`;
    texto += `CPF: ${this.cpf}\n`;
    texto += `Tipo Usuário: ${this.tipo}n`;

    return texto;
  }
}

export interface ICliente {
  endereco: string;
  cidade: string;
  estado: string;
  id: number;
  usuario_id: number;
}

export interface IClienteWrapper {
  cliente: ICliente;
  usuario: IUsuario;
}

export class Cliente extends Usuario implements ICliente {
  endereco: string;
  cidade: string;
  estado: string;

  constructor(
    endereco: string = "",
    cidade: string = "",
    estado: string = "",
    ...outros: string[]
  ) {
    super(...outros);
    this.endereco = endereco;
    this.cidade = cidade;
    this.estado = estado;
    this.tipo = "cliente";
  }

  geraImpressao(): string {
    let texto: string = `${super.geraImpressao()}\n`;
    texto += `Endereço: ${this.endereco}\n`;
    texto += `Cidade: ${this.cidade}\n`;
    texto += `Estado: ${this.estado}\n`;

    return texto;
  }
}

export interface IEmpresa {
  nome_fantasia: string;
  cnpj: string;
  id: number;
}

export interface IEmpresaWrapper {
  empresa: IEmpresa;
}

export class Empresa implements IEmpresa {
  nome_fantasia: string;
  cnpj: string;

  constructor(nome: string = "", cnpj: string = "") {
    this.nome_fantasia = nome;
    this.cnpj = cnpj;
  }

  geraImpressao(): string {
    let texto: string = `Nome Fantasia ${this.nome_fantasia}\n`;
    texto += `CNPJ: ${this.cnpj}\n`;

    return texto;
  }
}

export interface IPrestador {
  empresa_id: number;
  usuario_id: number;
  id: number;
}

export interface IPrestadorWrapper {
  prestador: IPrestador;
  empresa: IEmpresa;
  usuario: IUsuario;
}

export class Prestador extends Usuario {
  empresa: Empresa;

  constructor(empresa: Empresa = new Empresa()) {
    super();
    this.empresa = empresa;
  }

  geraImpressao(): string {
    let texto: string = `Usuário: ${super.geraImpressao()}\n`;
    texto += `Empresa: ${this.empresa.geraImpressao()}\n`;

    return texto;
  }
}

export interface ICategoria {
  categoria_id: number;
  nome: string;
}

export interface ICategoriaWrapper {
  categoria: ICategoria;
}

export class Categoria implements ICategoria {
  nome: string;

  constructor(nome: string = "") {
    this.nome = nome;
  }

  geraImpressao(): string {
    const texto: string = `Categoria: ${this.nome}\n`;

    return texto;
  }
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

export class Servico {
  prestador: Prestador;
  categoria: Categoria;
  preco: number;
  duracao: number;

  constructor(
    prestador: Prestador = new Prestador(),
    categoria: Categoria = new Categoria(),
    preco: number = 0,
    duracao: number = 0
  ) {
    this.prestador = prestador;
    this.categoria = categoria;
    this.preco = preco;
    this.duracao = duracao;
  }

  geraImpressao(): string {
    let texto: string = `Prestador: ${this.prestador.geraImpressao()}\n`;
    texto += `Categoria: ${this.categoria.geraImpressao()}\n`;
    texto += `Preço: ${this.preco}\n`;
    texto += `Duração: ${this.duracao}\n`;

    return texto;
  }
}

export interface IAgendamento {
  horario_fim: Date;
  horario_inicio: Date;
  observacoes_cliente: string | null;
  observacoes_prestador: string | null;
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

export class Agendamento {
  cliente: Cliente;
  servico: Servico;
  horario_inicio: Date;
  horario_fim: Date;
  observacoes_cliente: string;
  realizado: boolean;
  observacoes_prestador: string;

  constructor(
    cliente: Cliente = new Cliente(),
    servico: Servico = new Servico(),
    horario_inicio: Date = new Date(),
    horario_fim: Date = new Date(),
    observacoes_cliente: string = "",
    realizado: boolean = false,
    observacoes_prestador: string = ""
  ) {
    this.cliente = cliente;
    this.servico = servico;
    this.horario_inicio = horario_inicio;
    this.horario_fim = horario_fim;
    this.observacoes_cliente = observacoes_cliente;
    this.realizado = realizado;
    this.observacoes_prestador = observacoes_prestador;
  }

  geraImpressao(): string {
    let texto: string = `Cliente: ${this.cliente.geraImpressao()}\n`;
    texto += `Serviço: ${this.servico.geraImpressao()}\n`;
    texto += `Horário Início: ${this.horario_inicio}\n`;
    texto += `Horário Fim: ${this.horario_fim}\n`;
    texto += `Observações Cliente: ${this.observacoes_cliente}\n`;
    texto += `Realizado: ${this.realizado}\n`;
    texto += `Observações Prestador: ${this.observacoes_prestador}\n`;

    return texto;
  }
}
