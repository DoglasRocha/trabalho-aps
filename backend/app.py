from flask import Flask, request, session
from db import database
from models import *
from datetime import date
from helpers import *

app = Flask(__name__)
app.secret_key = b'ricardo_lanches_de_oliveira'
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db.sqlite3"
database.init_app(app)

@app.post('/API/usuarios/create')
def create_usuario() -> dict:
    try:
        dados = request.json
        novo_usuario = criar_usuario(dados, database)
        
        return {
            'usuario': novo_usuario.get_dict()
        }
    except Exception as e:
        return {'msg': str(e)}    
        
@app.get('/API/usuarios/get/<int:id>')
def get_usuario(id: int) -> dict:
    usuario = database.session.get(
        Usuario, {"id": id}
    )
    
    if not usuario:
        return {"dados": "Usuário não existente"}
    
    return {
        "dados": usuario.get_dict()
    }
    
@app.get('/API/usuarios/all')
def get_usuarios() -> dict:
    usuarios = database.session.execute(
        database.select(Usuario)
    ).scalars().all()
    
    return {
        "dados": [usuario.get_dict() for usuario in usuarios]
    }

@app.post('/API/clientes/create')
def create_cliente() -> dict:
    try:
        dados = request.json
        
        novo_usuario = criar_usuario(dados, database)
        
        # cria cliente
        atributos_cliente = Cliente.filtra_atributos_dicionario(dados)
        novo_cliente = Cliente(**atributos_cliente)
        novo_cliente.usuario_id = novo_usuario.id

        # salva cliente no banco de dados
        database.session.add(novo_cliente)
        database.session.commit()
        
        return {
            'usuario': novo_usuario.get_dict(),
            'cliente': novo_cliente.get_dict()
        }
    except Exception as e:
        return {'msg': str(e)}

@app.get('/API/clientes/get/<int:id>')
def get_cliente(id: int) -> dict:
    cliente = database.session.get(
        Cliente, {'id': id}
    )
    
    if not cliente:
        return {"dados": "Cliente não existente"}
    
    usuario = database.session.get(
        Usuario, {'id': cliente.usuario_id}
    )
    
    return {
        "dados": {
            "cliente": cliente.get_dict(),
            "usuario": usuario.get_dict()
        }
    }   
    
@app.get('/API/clientes/all')
def get_clientes() -> dict:
    clientes = database.session.execute(
        database.select(Cliente)
    ).scalars().all()
    
    return {
        "dados": [
            {
                "cliente": cliente.get_dict(),
                "usuario": 
                    (database
                     .session
                     .get(
                         Usuario, 
                         {"id": cliente.usuario_id}
                         ).get_dict()
                    )    
            } for cliente in clientes
        ]
    }
    
@app.post('/API/empresas/create')
def create_empresa() -> dict:
    try:
        dados = request.json
        
        # cria empresa
        atributos_empresa = Empresa.filtra_atributos_dicionario(dados)
        nova_empresa = Empresa(**atributos_empresa)
        
        # salva empresa no banco de dados
        database.session.add(nova_empresa)
        database.session.commit()
        
        return {
            "dados": nova_empresa.get_dict()
        }
        
    except Exception as e:
        return {"msg": str(e)}
    
@app.get("/API/empresas/get/<int:id>")
def get_empresa(id: int) -> dict:
    empresa = database.session.get(
        Empresa, {'id': id}
    )
    
    if not empresa:
        return {"dados": "Empresa não existente"}
    
    return {
        "dados": empresa.get_dict()
    } 
    
@app.get("/API/empresas/all")
def get_empresas() -> dict:
    empresas = database.session.execute(
        database.select(Empresa)
    ).scalars().all()
    
    return {
        "dados": [
            empresa.get_dict()
        ] for empresa in empresas
    }

@app.post('/API/prestadores/create')
def create_prestador() -> dict:
    try:
        dados = request.json
        
        novo_usuario = criar_usuario(dados, database)
        
        # checa se empresa está no banco de dados
        empresa = database.session.get(Empresa, {"id": dados["empresa_id"]}),    
        if not empresa:
            return {"msg": "Empresa não cadastrada"}
        
        # cria prestador
        novo_prestador = Prestador(usuario_id=novo_usuario.id, empresa_id=empresa.id)
        
        # salva prestador no banco de dados
        database.session.add(novo_prestador)
        database.session.commit()
        
        return {
            'usuario': novo_usuario.get_dict(),
            'empresa': empresa.get_dict(),
            'prestador': novo_prestador.get_dict()
        }
    except Exception as e:
        return {'msg': str(e)}

@app.get('/API/prestadores/get/<int:id>')
def get_prestador(id: int) -> dict:
    prestador = database.session.get(
        Prestador, {'id': id}
    )
    
    if not prestador:
        return {"dados": "Prestador não existente"}
    
    usuario = database.session.get(
        Usuario, {'id': prestador.usuario_id}
    )
    
    empresa = database.session.get(
        Empresa, {"id": prestador.empresa_id}
    )
    
    return {
        "dados": {
            "prestador": prestador.get_dict(),
            "usuario": usuario.get_dict(),
            "empresa": empresa.get_dict()
        }
    }   
    
@app.get('/API/prestadores/all')
def get_prestadores() -> dict:
    prestadores = database.session.execute(
        database.select(Prestador)
    ).scalars().all()
    
    return {
        "dados": [
            {
                "prestador": prestador.get_dict(),
                "usuario": 
                    (database
                     .session
                     .get(
                         Usuario, 
                         {"id": prestador.usuario_id}
                         ).get_dict()
                    ),
                "empresa":
                    (database
                     .session
                     .get(
                         Empresa, 
                         {"id": prestador.empresa_id}
                         ).get_dict()
                    ),    
            } for prestador in prestadores
        ]
    }