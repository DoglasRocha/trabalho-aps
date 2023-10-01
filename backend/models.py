from db import database
from sqlalchemy.orm import Mapped, mapped_column
from datetime import date, timedelta, datetime

class Usuario(database.Model):
    id : Mapped[int] = mapped_column(database.Integer, primary_key=True)
    nome : Mapped[str] = mapped_column(database.String(100), nullable=False)
    email : Mapped[str] = mapped_column(database.String(50), unique=True,nullable=False)
    senha : Mapped[str] = mapped_column(database.String(64), nullable=False)
    data_nascimento : Mapped[date] = mapped_column(database.Date, nullable=False)
    cpf : Mapped[str] = mapped_column(database.String(14), nullable=False)
    tipo : Mapped[str] = mapped_column(database.String(10), nullable=False)
    
    def __str__(self) -> str:
        texto = f'ID: {self.id}\n'
        texto += f'Nome: {self.nome}\n'
        texto += f'Email: {self.email}\n'
        texto += f'Senha: {self.senha}\n'
        texto += f'Data Nascimento: {self.data_nascimento}\n'
        texto += f'CPF: {self.cpf}\n'
        texto += f'Tipo Usuário: {self.tipo}\n'
        
        return texto
    
    @staticmethod
    def filtra_atributos_dicionario(dicionario: dict) -> dict:
        keys = ['nome', 'email', 'senha', 'data_nascimento', 'cpf', 'tipo']
        return {key: dicionario[key] for key in keys if key in dicionario.keys()}

    def get_dict(self) -> dict:
        return {
            'usuario_id': self.id,
            'nome': self.nome,
            'email': self.email,
            'data_nascimento': self.data_nascimento,
            'cpf': self.cpf,
            'tipo': self.tipo,
        }
    
class Cliente(database.Model):
    id : Mapped[int] = mapped_column(database.Integer, primary_key=True, nullable=False)
    usuario_id : Mapped[int] = mapped_column(database.ForeignKey(Usuario.id), nullable=False)
    endereco : Mapped[str] = mapped_column(database.String(200), nullable=False)
    cidade : Mapped[str] = mapped_column(database.String(50), nullable=False)
    estado : Mapped[str] = mapped_column(database.String(2), nullable=False)
    
    def __str__(self) -> str:
        texto = f'Usuário: {self.usuario_id}\n'
        texto += f'ID: {self.id}\n'
        texto += f'Endereço: {self.endereco}\n'
        texto += f'Cidade: {self.cidade}\n'
        texto += f'Estado: {self.estado}\n'
        
        return texto
    
    @staticmethod
    def filtra_atributos_dicionario(dicionario: dict) -> dict:
        keys = ['endereco', 'cidade', 'estado', 'usuario_id']
        return {key: dicionario[key] for key in keys if key in dicionario.keys()}
    
    def get_dict(self) -> dict:
        return {
            'id': self.id,
            'usuario_id': self.usuario_id,
            'endereco': self.endereco,
            'cidade': self.cidade,
            'estado': self.estado,
        }

class Empresa(database.Model):
    id : Mapped[int] = mapped_column(database.Integer, primary_key=True)
    nome_fantasia : Mapped[str] = mapped_column(database.String(200), nullable=False)
    cnpj : Mapped[str] = mapped_column(database.String(18), unique=True, nullable=False)
    
    def __str__(self) -> str:
        texto = f'Nome Fantasia: {self.nome_fantasia}\n'
        texto += f'CNPJ: {self.cnpj}\n'
        
        return texto
    
    @staticmethod
    def filtra_atributos_dicionario(dicionario: dict) -> dict:
        keys = ['nome_fantasia', 'cnpj',]
        return {key: dicionario[key] for key in keys if key in dicionario.keys()}
    
    def get_dict(self) -> dict:
        return {
            'nome_fantasia': self.nome_fantasia,
            'cnpj': self.cnpj
        }
    
class Prestador(database.Model):
    id : Mapped[int] = mapped_column(database.Integer, primary_key=True)
    usuario_id : Mapped[int] = mapped_column(database.ForeignKey(Usuario.id), nullable=False)
    empresa_id : Mapped[int] = mapped_column(database.ForeignKey(Empresa.id), nullable=False)
    
    def __str__(self) -> str:
        texto = f'Usuário: {self.usuario_id}\n'
        texto += f'Empresa: {self.empresa_id}\n'
        
        return texto
    
    @staticmethod
    def filtra_atributos_dicionario(dicionario: dict) -> dict:
        keys = ['usuario_id', 'empresa_id',]
        return {key: dicionario[key] for key in keys if key in dicionario.keys()}
    
    def get_dict(self) -> dict:
        return {
            'id': self.id,
            'usuario_id': self.usuario_id,
            'empresa_id': self.empresa_id
        }
    
class Categoria(database.Model):
    id : Mapped[int] = mapped_column(database.Integer, primary_key=True)
    nome : Mapped[str] = mapped_column(database.String(100), nullable=False, unique=True)
    
    def __str__(self) -> str:
        texto = f'Categoria: {self.nome}\n'
        return texto
    
    @staticmethod
    def filtra_atributos_dicionario(dicionario: dict) -> dict:
        keys = ['nome',]
        return {key: dicionario[key] for key in keys if key in dicionario.keys()}
    
    def get_dict(self) -> dict:
        return {
            'nome': self.nome,
            'categoria_id': self.id
        }
        
class Servico(database.Model):
    id : Mapped[int] = mapped_column(database.Integer, primary_key=True)
    prestador_id : Mapped[int] = mapped_column(database.ForeignKey(Prestador.id), nullable=False)
    categoria_id : Mapped[int] = mapped_column(database.ForeignKey(Categoria.id), nullable=False)
    preco : Mapped[float] = mapped_column(database.Float, nullable=False)
    duracao : Mapped[timedelta] = mapped_column(database.Time, nullable=False)
    
    def __str__(self) -> str:
        texto = f'ID Prestador: {self.prestador_id}\n'
        texto += f'ID Categoria: {self.categoria_id}\n'
        texto += f'Preço: {self.preco}'
        texto += f'Duração: {self.duracao}'
        
        return texto
    
    @staticmethod
    def filtra_atributos_dicionario(dicionario: dict) -> dict:
        keys = ['prestador', 'categoria', 'preco', 'duracao']
        return {key: dicionario[key] for key in keys if key in dicionario.keys()}
    
    def get_dict(self) -> dict:
        return {
            'id': self.id,
            'prestador_id': self.prestador_id,
            'categoria_id': self.categoria_id,
            'preco': self.preco,
            'durcao': self.duracao
        }
    
class Agendamento(database.Model):
    id : Mapped[int] = mapped_column(database.Integer, primary_key=True)
    cliente_id : Mapped[int] = mapped_column(database.ForeignKey(Cliente.id), nullable=False)
    servico_id : Mapped[int] = mapped_column(database.ForeignKey(Servico.id), nullable=False)
    horario_inicio : Mapped[datetime] = mapped_column(database.DateTime, nullable=False)
    horario_fim : Mapped[datetime] = mapped_column(database.DateTime, nullable=False)
    observacoes_cliente : Mapped[str] = mapped_column(database.String, nullable=True)
    realizado : Mapped[bool] = mapped_column(database.Boolean, default=False)
    observacoes_prestador : Mapped[str] = mapped_column(database.String, nullable=True)
    
    def __str__(self) -> str:
        texto = f'ID Cliente: {self.cliente_id}\n'
        texto += f'ID Serviço: {self.servico_id}\n'
        texto += f'Horário Início: {self.horario_inicio}\n'
        texto += f'Horário Fim: {self.horario_fim}\n'
        texto += f'Observações Cliente: {self.observacoes_cliente}\n'
        texto += f'Realizado: {self.realizado}\n'
        texto += f'Observações Prestador: {self.observacoes_prestador}\n'
        
        return texto
    
    @staticmethod
    def filtra_atributos_dicionario(dicionario: dict) -> dict:
        keys = [
            'cliente_id', 
            'servico_id', 
            'horario_inicio', 
            'horario_fim', 
            'observacoes_cliente', 
            'realizado', 
            'observacoes_prestador'
        ]
        return {key: dicionario[key] for key in keys if key in dicionario.keys()}
    
    def get_dict(self) -> dict:
        return {
            'cliente_id': self.cliente_id,
            'servico_id': self.servico_id,
            'horario_inicio': self.horario_inicio,
            'horario_fim': self.horario_fim,
            'observacoes_cliente': self.observacoes_cliente,
            'realizado': self.realizado,
            'observacoes_prestador': self.observacoes_prestador
        }

