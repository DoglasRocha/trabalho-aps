from django.urls import path

from . import routes

urlpatterns = [
    #path("", routes.index, name="index"),
    path("usuarios/all", routes.get_usuarios, name="get_usuarios")
]