from django.db import models

# Create your models here.
class Usuario(models.Model):
    nome = models.CharField(max_length=200)
    email = models.EmailField()
    senha = models.CharField(max_length=32)
    data_nascimento = models.DateField()
    cpf = models.CharField(max_length=14)
    tipo = models.CharField(max_length=10)
    
    def __str__(self) -> str:
        texto = f'Nome: {self.nome}\n'
        texto += f'Email: {self.email}\n'
        texto += f'Senha: {self.senha}\n'
        texto += f'Data Nascimento: {self.data_nascimento}\n'
        texto += f'CPF: {self.cpf}\n'
        texto += f'Tipo Usuário: {self.tipo}\n'
        
        return texto
    
    def set_nome(self, novo_nome: str):
        self.nome = novo_nome
        self.save()
        return self
    
    @staticmethod
    def filtra_atributos_dicionario(dicionario: dict):
        keys = ['nome', 'email', 'senha', 'data_nascimento', 'cpf', 'tipo']
        return {key: dicionario[key] for key in keys if key in dicionario.keys()}
    
class Cliente(models.Model):
    usuario_id = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    endereco = models.CharField(max_length=200)
    cidade = models.CharField(max_length=50)
    estado = models.CharField(max_length=2)
    
    def __str__(self) -> str:
        texto = f'{Usuario.objects.get(pk=self.usuario_id).__str__()}\n'
        texto += f'Endereço: {self.endereco}\n'
        texto += f'Cidade: {self.cidade}\n'
        texto += f'Estado: {self.estado}\n'
        
        return texto
    
    @staticmethod
    def filtra_atributos_dicionario(dicionario: dict):
        keys = ['endereco', 'cidade', 'estado']
        return {key: dicionario[key] for key in keys if key in dicionario.keys()}

class Empresa(models.Model):
    nome = models.CharField(max_length=200)
    cnpj = models.CharField(max_length=18)
    
    def __str__(self) -> str:
        texto = f'Nome Fantasia: {self.nome}\n'
        texto += f'CNPJ: {self.cnpj}\n'
        
        return texto
    
class Prestador(models.Model):
    usuario_id = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    empresa_id = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    
    def __str__(self) -> str:
        texto = f'{Usuario.objects.get(pk=self.usuario_id).__str__()}\n'
        texto += f'{Empresa.objects.get(pk=self.empresa_id).__str__()}\n'
        
        return texto
    
class Categoria(models.Model):
    nome = models.CharField(max_length=100)
    
    def __str__(self) -> str:
        texto = f'Categoria: {self.nome}\n'
        
        return texto
    
class Servico(models.Model):
    id_prestador = models.ForeignKey(Prestador, on_delete=models.CASCADE)
    id_categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    preco = models.FloatField()
    duracao = models.DurationField()
    
    def __str__(self) -> str:
        texto = f'Nome Prestador: {Usuario.objects.get(pk=Prestador.objects.get(pk=self.id_prestador).usuario_id).nome}\n'
        texto += f'Categoria: {Categoria.objects.get(pk=self.id_categoria).nome}\n'
        texto += f'Preço: {self.preco}'
        texto += f'Duração: {self.duracao}'
        
        return texto
    
class Agendamento(models.Model):
    cliente_id = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    servico_id = models.ForeignKey(Servico, on_delete=models.CASCADE)
    horario_inicio = models.DateTimeField()
    horario_fim = models.DateTimeField()
    observacoes_cliente = models.TextField()
    realizado = models.BooleanField()
    observacoes_prestador = models.TextField()
    
    def __str__(self) -> str:
        texto = f'Nome Cliente: {Usuario.objects.get(pk=Cliente.objects.get(pk=self.cliente_id).usuario_id).nome}\n'
        texto += f'Nome Prestador: {Usuario.objects.get(pk=Cliente.objects.get(pk=self.cliente_id).usuario_id).nome}\n'
        texto += f'Horário Início: {self.horario_inicio}\n'
        texto += f'Horário Fim: {self.horario_fim}\n'
        texto += f'Observações Cliente: {self.observacoes_cliente}\n'
        texto += f'Realizado: {self.realizado}\n'
        texto += f'Observações Prestador: {self.observacoes_prestador}\n'
        
        return texto
