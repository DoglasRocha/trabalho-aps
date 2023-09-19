from django.urls import path

from . import routes

urlpatterns = [
    #path("", routes.index, name="index"),
    path("usuarios/all", routes.get_usuarios, name="get_usuarios"),
    path("clientes/create", routes.create_cliente, name="create_cliente"),
    #path("clientes/get/<int:id>", routes.get_cliente, name="get_cliente"),
    #path("prestadores/create", routes.create_prestador, name="create_prestador"),
    #path("prestadores/get/<int:id>", routes.get_prestador, name="get_prestador")
]