from django.db import models

# Create your models here.
class Usuario(models.Model):
    nome = models.CharField(max_length=200)
    email = models.EmailField()
    senha = models.CharField(max_length=32)
    data_nascimento = models.DateField()
    cpf = models.CharField(max_length=14)
    tipo = models.CharField(max_length=10)
    
class Cliente(models.Model):
    usuario_id = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    endereco = models.CharField(max_length=200)
    cidade = models.CharField(max_length=50)
    estado = models.CharField(max_length=2)

class Empresa(models.Model):
    nome = models.CharField(max_length=200)
    cnpj = models.CharField(max_length=18)
    
class Prestador(models.Model):
    usuario_id = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    empresa_id = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    
class Categoria(models.Model):
    nome = models.CharField(max_length=100)
    
class Servico(models.Model):
    id_prestador = models.ForeignKey(Prestador, on_delete=models.CASCADE)
    id_categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    preco = models.FloatField()
    duracao = models.DurationField()
    
class Agendamento(models.Model):
    cliente_id = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    servico_id = models.ForeignKey(Servico, on_delete=models.CASCADE)
    horario_inicio = models.DateTimeField()
    horario_fim = models.DateTimeField()
    observacoes = models.TextField()
