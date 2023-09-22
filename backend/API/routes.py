from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError
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
            "dados": usuario.get_dict()
        }
    )

def create_cliente(request) -> JsonResponse:
    if request.method != 'POST':
        return HttpResponseBadRequest()
    
    try:
        dados = json.loads(request.body)
        print(dados)
        # cria usuario
        atributos_usuario = Usuario.filtra_atributos_dicionario(dados)
        novo_usuario = Usuario(**atributos_usuario)
        # salva usuario no banco de dados
        novo_usuario.save()
        
        # cria cliente
        atributos_cliente = Cliente.filtra_atributos_dicionario(dados)
        novo_cliente = Cliente(**atributos_cliente)
        novo_cliente.usuario = novo_usuario
        # salva cliente no banco de dados
        print(novo_cliente)
        novo_cliente.save()
        
        return JsonResponse(novo_cliente.get_dict())
    except Exception as e:
        print(e)
        return HttpResponseServerError(content="algo deu errado")
    
def get_cliente(request, id: int) -> JsonResponse:
    cliente = Cliente.objects.get(pk=id)
    
    return JsonResponse(cliente.get_dict())
    
    
