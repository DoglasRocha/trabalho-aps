from models import *
from flask_sqlalchemy import SQLAlchemy
from flask import request


def criar_usuario(dados: dict, database: SQLAlchemy) -> Usuario:
    # cria usuario
    atributos_usuario = Usuario.filtra_atributos_dicionario(dados)
    atributos_usuario["data_nascimento"] = date.fromisoformat(
        atributos_usuario["data_nascimento"]
    )
    novo_usuario = Usuario(**atributos_usuario)

    # salva usuario no banco de dados
    database.session.add(novo_usuario)
    database.session.commit()

    return novo_usuario


def esta_logado() -> bool:
    return bool(request.cookies.get("dadosUsuario"))
