from django.http import JsonResponse
from .models import Usuario, Cliente

# Create your routes here.
def get_usuarios(request) -> JsonResponse:
    usuarios = Usuario.objects.values()
    resp = [usuario for usuario in usuarios]
    return JsonResponse({'dados': resp})

def create_cliente(request) -> JsonResponse:
    data = request.POST.items()
    
    cliente = Cliente(**data)
    
    
    
    