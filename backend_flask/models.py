from db import database
from sqlalchemy import Integer, String, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime

class Usuario(database.Model):
    id : Mapped[int] = mapped_column(database.Integer, primary_key=True)
    nome : Mapped[str] = mapped_column(database.String, nullable=False)
    email : Mapped[str] = mapped_column(database.String, unique=True,nullable=False)
    senha : Mapped[str] = mapped_column(database.String, nullable=False)
    data_nascimento : Mapped[datetime] = mapped_column(database.DateTime, nullable=False)
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
            'id': self.id,
            'nome': self.nome,
            'email': self.email,
            'data_nascimento': self.data_nascimento,
            'cpf': self.cpf,
            'tipo': self.tipo,
            'senha': self.senha,
        }
    
class Cliente(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    endereco = models.CharField(max_length=200)
    cidade = models.CharField(max_length=50)
    estado = models.CharField(max_length=2)
    
    def __str__(self) -> str:
        texto = f'Usuário: {self.usuario.get_dict()}\n'
        texto += f'ID: {self.id}\n'
        texto += f'Endereço: {self.endereco}\n'
        texto += f'Cidade: {self.cidade}\n'
        texto += f'Estado: {self.estado}\n'
        
        return texto
    
    @staticmethod
    def filtra_atributos_dicionario(dicionario: dict) -> dict:
        keys = ['endereco', 'cidade', 'estado', 'usuario']
        return {key: dicionario[key] for key in keys if key in dicionario.keys()}
    
    def get_dict(self) -> dict:
        return {
            'id': self.id,
            'usuario': self.usuario.get_dict(),
            'endereco': self.endereco,
            'cidade': self.cidade,
            'estado': self.estado,
        }

class Empresa(models.Model):
    nome = models.CharField(max_length=200)
    cnpj = models.CharField(max_length=18)
    
    def __str__(self) -> str:
        texto = f'Nome Fantasia: {self.nome}\n'
        texto += f'CNPJ: {self.cnpj}\n'
        
        return texto
    
    @staticmethod
    def filtra_atributos_dicionario(dicionario: dict) -> dict:
        keys = ['nome', 'cnpj',]
        return {key: dicionario[key] for key in keys if key in dicionario.keys()}
    
    def get_dict(self) -> dict:
        return {
            'nome': self.nome,
            'cnpj': self.cnpj
        }
    
class Prestador(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    
    def __str__(self) -> str:
        texto = f'Usuário: {self.usuario.get_dict()}\n'
        texto += f'Empresa: {self.empresa.get_dict()}\n'
        
        return texto
    
    @staticmethod
    def filtra_atributos_dicionario(dicionario: dict) -> dict:
        keys = ['usuario', 'empresa',]
        return {key: dicionario[key] for key in keys if key in dicionario.keys()}
    
    def get_dict(self) -> dict:
        return {
            'usuario': self.usuario.get_dict(),
            'empresa': self.empresa.get_dict()
        }
    
class Categoria(models.Model):
    nome = models.CharField(max_length=100)
    
    def __str__(self) -> str:
        texto = f'Categoria: {self.nome}\n'
        
        return texto
    
    @staticmethod
    def filtra_atributos_dicionario(dicionario: dict) -> dict:
        keys = ['nome',]
        return {key: dicionario[key] for key in keys if key in dicionario.keys()}
    
    def get_dict(self) -> dict:
        return {
            'nome': self.nome
        }
        
class Servico(models.Model):
    prestador = models.ForeignKey(Prestador, on_delete=models.CASCADE)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    preco = models.FloatField()
    duracao = models.DurationField()
    
    def __str__(self) -> str:
        texto = f'Nome Prestador: {self.prestador.get_dict()}\n'
        texto += f'Categoria: {self.categoria.get_dict()}\n'
        texto += f'Preço: {self.preco}'
        texto += f'Duração: {self.duracao}'
        
        return texto
    
    @staticmethod
    def filtra_atributos_dicionario(dicionario: dict) -> dict:
        keys = ['prestador', 'categoria', 'preco', 'duracao']
        return {key: dicionario[key] for key in keys if key in dicionario.keys()}
    
    def get_dict(self) -> dict:
        return {
            'prestador': self.prestador.get_dict(),
            'categoria': self.categoria.get_dict(),
            'preco': self.preco,
            'durcao': self.duracao
        }
    
class Agendamento(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    servico = models.ForeignKey(Servico, on_delete=models.CASCADE)
    horario_inicio = models.DateTimeField()
    horario_fim = models.DateTimeField()
    observacoes_cliente = models.TextField(default="null")
    realizado = models.BooleanField(default=False)
    observacoes_prestador = models.TextField()
    
    def __str__(self) -> str:
        texto = f'Nome Cliente: {self.cliente.get_dict()["usuario"]["nome"]}\n'
        texto += f'Nome Prestador: {self.servico.get_dict()["prestador"]["usuario"]["nome"]}\n'
        texto += f'Horário Início: {self.horario_inicio}\n'
        texto += f'Horário Fim: {self.horario_fim}\n'
        texto += f'Observações Cliente: {self.observacoes_cliente}\n'
        texto += f'Realizado: {self.realizado}\n'
        texto += f'Observações Prestador: {self.observacoes_prestador}\n'
        
        return texto
    
    @staticmethod
    def filtra_atributos_dicionario(dicionario: dict) -> dict:
        keys = [
            'cliente', 
            'servico', 
            'horario_inicio', 
            'horario_fim', 
            'observacoes_cliente', 
            'realizado', 
            'observacoes_prestador'
        ]
        return {key: dicionario[key] for key in keys if key in dicionario.keys()}
    
    def get_dict(self) -> dict:
        return {
            'cliente': self.cliente.get_dict(),
            'servico': self.servico.get_dict(),
            'horario_inicio': self.horario_inicio,
            'horario_fim': self.horario_fim,
            'observacoes_cliente': self.observacoes_cliente,
            'realizado': self.realizado,
            'observacoes_prestador': self.observacoes_prestador
        }
