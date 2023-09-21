from django.http import JsonResponse
from django.core import serializers
from .models import Usuario, Cliente
import json

# Create your routes here.
def get_usuarios(request) -> JsonResponse:
    usuarios = Usuario.objects.values()
    resp = [usuario for usuario in usuarios]
    return JsonResponse({'dados': resp})

def get_usuario(request, id: int) -> JsonResponse:
    usuario = Usuario.objects.get(pk=id)
    return JsonResponse(
        {
            "dados": json.loads(
                serializers.serialize("json", [usuario])
            )
        }
    )

def create_cliente(request) -> JsonResponse:
    dados = request.POST.items()
    
    try:
        # cria usuario
        atributos_usuario = Usuario.filtra_atributos_dicionario(dados)
        novo_usuario = Usuario(**atributos_usuario)
        # salva usuario no banco de dados
        novo_usuario.save()
        
        # cria cliente
        atributos_cliente = Cliente.filtra_atributos_dicionario(dados)
        novo_cliente = Cliente(usuario_id=novo_usuario.pk, **atributos_cliente)
        # salva cliente no banco de dados
        novo_cliente.save()
        
        return {'status': 'success'}
    except Exception as e:
        return {'status': e}
    
def get_cliente(request, id: int) -> JsonResponse:
    cliente = Cliente.objects.get(pk=id)
    usuario = Usuario.objects.get(cliente.usuario_id)
    
    cliente = {vars(usuario), vars(cliente)}
    return JsonResponse(cliente)
    
    
