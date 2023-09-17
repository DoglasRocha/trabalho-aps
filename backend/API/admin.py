from django.contrib import admin

from .models import *

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Cliente)
admin.site.register(Prestador)
admin.site.register(Empresa)
admin.site.register(Servico)
admin.site.register(Categoria)
admin.site.register(Agendamento)