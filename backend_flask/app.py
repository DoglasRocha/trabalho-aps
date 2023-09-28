from flask import Flask, request, session
from db import database
from models import *
from datetime import date

app = Flask(__name__)
app.secret_key = b'ricardo_lanches_de_oliveira'
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db.sqlite3"
database.init_app(app)

@app.get('/API/usuarios/all')
def get_usuarios() -> dict:
    usuarios = database.session.execute(
        database.select(Usuario)
    ).scalars().all()
    
    return {"dados": [
        usuario.get_dict() for usuario in usuarios
    ]}

@app.post('/API/clientes/create')
def create_cliente() -> dict:
    
    try:
        dados = request.json
        
        # cria usuario
        atributos_usuario = Usuario.filtra_atributos_dicionario(dados)
        atributos_usuario['data_nascimento'] = date.fromisoformat(atributos_usuario['data_nascimento'])
        novo_usuario = Usuario(**atributos_usuario)
        # salva usuario no banco de dados
        database.session.add(novo_usuario)
        database.session.commit()
        
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
            } #JsonResponse(novo_cliente.get_dict())
    except Exception as e:
        return {}

