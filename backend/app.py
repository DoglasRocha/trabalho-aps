from flask import Flask, request, session, make_response
from flask_cors import CORS
from db import database
from models import *
from datetime import date
from helpers import *

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = b"ricardo_lanches_de_oliveira"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite3"
database.init_app(app)


@app.post("/API/usuarios/create")
def create_usuario() -> dict:
    try:
        dados = request.json
        novo_usuario = criar_usuario(dados, database)

        return {"dados": {"usuario": novo_usuario.get_dict()}}
    except Exception as e:
        return {"msg": str(e)}


@app.get("/API/usuarios/get")
def get_usuario() -> dict:
    params = request.args.to_dict()
    params_safe = Usuario.preenche_dicionario_com_atributos_pesquisaveis_da_classe(
        params
    )

    usuarios = (
        database.session.execute(
            database.select(Usuario).where(
                (Usuario.id == params_safe["id"])
                | (Usuario.nome == params_safe["nome"])
                | (Usuario.email == params_safe["email"])
                | (Usuario.cpf == params_safe["cpf"])
                | (Usuario.tipo == params_safe["tipo"])
            )
        )
        .scalars()
        .all()
    )

    if not usuarios:
        return {"dados": "Usuário não existente"}

    return {"dados": [usuario.get_dict() for usuario in usuarios]}


@app.get("/API/usuarios/all")
def get_usuarios() -> dict:
    usuarios = database.session.execute(database.select(Usuario)).scalars().all()

    return {"dados": [usuario.get_dict() for usuario in usuarios]}


@app.post("/API/clientes/create")
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

        return {"dados": novo_cliente.get_dict()}
    except Exception as e:
        return {"msg": str(e)}


@app.get("/API/clientes/get")
def get_cliente() -> dict:
    params = request.args.to_dict()
    params_safe = Cliente.preenche_dicionario_com_atributos_pesquisaveis_da_classe(
        params
    )

    clientes = (
        database.session.execute(
            database.select(Cliente).where(
                (Cliente.id == params_safe["id"])
                | (Cliente.usuario_id == params_safe["usuario_id"])
                | (Cliente.estado == params_safe["estado"])
                | (Cliente.cidade == params_safe["cidade"])
                | (Cliente.endereco == params_safe["endereco"])
            )
        )
        .scalars()
        .all()
    )

    if not clientes:
        return {"dados": "Cliente não existente"}

    return {"dados": [cliente.get_dict() for cliente in clientes]}


@app.get("/API/clientes/all")
def get_clientes() -> dict:
    clientes = database.session.execute(database.select(Cliente)).scalars().all()

    return {"dados": [cliente.get_dict() for cliente in clientes]}


@app.post("/API/empresas/create")
def create_empresa() -> dict:
    try:
        dados = request.json

        # cria empresa
        atributos_empresa = Empresa.filtra_atributos_dicionario(dados)
        nova_empresa = Empresa(**atributos_empresa)

        # salva empresa no banco de dados
        database.session.add(nova_empresa)
        database.session.commit()

        return {"dados": nova_empresa.get_dict()}

    except Exception as e:
        return {"msg": str(e)}


@app.get("/API/empresas/get")
def get_empresa() -> dict:
    params = request.args.to_dict()
    params_safe = Empresa.preenche_dicionario_com_atributos_pesquisaveis_da_classe(
        params
    )

    empresas = (
        database.session.execute(
            database.select(Empresa).where(
                (Empresa.id == params_safe["id"])
                | (Empresa.nome_fantasia == params_safe["nome_fantasia"])
                | (Empresa.cnpj == params_safe["cnpj"])
            )
        )
        .scalars()
        .all()
    )

    if not empresas:
        return {"dados": "Empresa não existente"}

    return {"dados": {"empresa": [empresa.get_dict() for empresa in empresas]}}


@app.get("/API/empresas/all")
def get_empresas() -> dict:
    empresas = database.session.execute(database.select(Empresa)).scalars().all()

    return {"dados": {"empresas": [empresa.get_dict() for empresa in empresas]}}


@app.post("/API/prestadores/create")
def create_prestador() -> dict:
    try:
        dados = request.json

        novo_usuario = criar_usuario(dados, database)

        # checa se empresa está no banco de dados
        empresa = database.session.get(Empresa, {"id": dados["empresa_id"]})
        if not empresa:
            return {"msg": "Empresa não cadastrada"}

        # cria prestador
        novo_prestador = Prestador(usuario_id=novo_usuario.id, empresa_id=empresa.id)

        # salva prestador no banco de dados
        database.session.add(novo_prestador)
        database.session.commit()

        return {"dados": novo_prestador.get_dict()}
    except Exception as e:
        return {"msg": str(e)}


@app.get("/API/prestadores/get")
def get_prestador() -> dict:
    params = request.args.to_dict()
    params_safe = Prestador.preenche_dicionario_com_atributos_pesquisaveis_da_classe(
        params
    )

    prestadores = (
        database.session.execute(
            database.select(Prestador).where(
                (Prestador.id == params_safe["id"])
                | (Prestador.usuario_id == params_safe["usuario_id"])
                | (Prestador.empresa_id == params_safe["empresa_id"])
            )
        )
        .scalars()
        .all()
    )

    if not prestadores:
        return {"dados": "Prestador não existente"}

    return {
        "dados": [prestador.get_dict() for prestador in prestadores],
    }


@app.get("/API/prestadores/all")
def get_prestadores() -> dict:
    prestadores = database.session.execute(database.select(Prestador)).scalars().all()

    return {
        "dados": {"prestadores": [prestador.get_dict() for prestador in prestadores]}
    }


@app.post("/API/categorias/create")
def create_categoria() -> dict:
    try:
        dados = request.json

        # cria categoria
        atributos_categoria = Categoria.filtra_atributos_dicionario(dados)
        nova_categoria = Categoria(**atributos_categoria)

        # salva categoria no banco de dados
        database.session.add(nova_categoria)
        database.session.commit()

        return {"dados": nova_categoria.get_dict()}
    except Exception as e:
        return {"msg": str(e)}


@app.get("/API/categorias/get")
def get_categoria() -> dict:
    params = request.args.to_dict()
    params_safe = Categoria.preenche_dicionario_com_atributos_pesquisaveis_da_classe(
        params
    )

    categorias = (
        database.session.execute(
            database.select(Categoria).where(
                (Categoria.id == params_safe["id"])
                | (Categoria.nome == params_safe["nome"])
            )
        )
        .scalars()
        .all()
    )

    if not categorias:
        return {"dados": "Categoria não existente"}

    return {"dados": [categoria.get_dict() for categoria in categorias]}


@app.get("/API/categorias/all")
def get_categorias() -> dict:
    categorias = database.session.execute(database.select(Categoria)).scalars().all()

    return {"dados": [categoria.get_dict() for categoria in categorias]}


@app.post("/API/servicos/create")
def create_servico() -> dict:
    try:
        dados = request.json

        # checa se prestador existe
        prestador = database.session.get(Prestador, {"id": dados["prestador_id"]})
        if not prestador:
            return {"dados": "Prestador não existente"}

        # checa se categoria existe
        categoria = database.session.get(Categoria, {"id": dados["categoria_id"]})
        if not categoria:
            return {"dados": "Categoria não existente"}

        # cria servico
        atributos_servico = Servico.filtra_atributos_dicionario(dados)
        atributos_servico["duracao"] = timedelta(hours=atributos_servico["duracao"])
        novo_servico = Servico(**atributos_servico)

        # salva servico no banco de dados
        database.session.add(novo_servico)
        database.session.commit()

        return {
            "dados": novo_servico.get_dict(),
        }
    except Exception as e:
        return {"msg": str(e)}


@app.get("/API/servicos/get")
def get_servico() -> dict:
    params = request.args.to_dict()
    params_safe = Servico.preenche_dicionario_com_atributos_pesquisaveis_da_classe(
        params
    )

    servicos = (
        database.session.execute(
            database.select(Servico).where(
                (Servico.id == params_safe["id"])
                | (Servico.categoria_id == params_safe["categoria_id"])
                | (Servico.prestador_id == params_safe["prestador_id"])
                | (Servico.preco == params_safe["preco"])
                | (Servico.duracao == params_safe["duracao"])
            )
        )
        .scalars()
        .all()
    )

    if not servicos:
        return {"dados": "Serviço não existente"}

    return {"dados": [servico.get_dict() for servico in servicos]}


@app.get("/API/servicos/all")
def get_servicos() -> dict:
    servicos = database.session.execute(database.select(Servico)).scalars().all()

    return {"dados": [servico.get_dict() for servico in servicos]}


@app.post("/API/agendamentos/create")
def create_agendamento() -> dict:
    try:
        dados = request.json

        # checa se cliente existe
        cliente = database.session.get(Cliente, {"id": dados["cliente_id"]})
        if not cliente:
            return {"dados": "Cliente não existente"}

        # checa se servico existe
        servico = database.session.get(Servico, {"id": dados["servico_id"]})
        if not servico:
            return {"dados": "Servico não existente"}

        # cria agendamento
        atributos_agendamento = Agendamento.filtra_atributos_dicionario(dados)
        atributos_agendamento["horario_inicio"] = datetime.fromisoformat(
            atributos_agendamento["horario_inicio"]
        )
        atributos_agendamento["horario_fim"] = (
            servico.duracao + atributos_agendamento["horario_inicio"]
        )
        novo_agendamento = Agendamento(**atributos_agendamento)

        if novo_agendamento.ha_conflito():
            return {"msg": "Conflito de horários!!"}

        # salva agendamento no banco de dados
        database.session.add(novo_agendamento)
        database.session.commit()

        return {
            "dados": novo_agendamento.get_dict(),
        }
    except Exception as e:
        return {"msg": str(e)}


@app.get("/API/agendamentos/get")
def get_agendamento() -> dict:
    params = request.args.to_dict()
    params_safe = Agendamento.preenche_dicionario_com_atributos_pesquisaveis_da_classe(
        params
    )

    agendamentos = (
        database.session.execute(
            database.select(Agendamento).where(
                (Agendamento.id == params_safe["id"])
                | (Agendamento.cliente_id == params_safe["cliente_id"])
                | (Agendamento.servico_id == params_safe["servico_id"])
                | (Agendamento.realizado == params_safe["realizado"])
            )
        )
        .scalars()
        .all()
    )

    if not agendamentos:
        return {"dados": "Agendamento não existente"}

    return {"dados": [agendamento.get_dict() for agendamento in agendamentos]}


@app.get("/API/agendamentos/all")
def get_agendamentos() -> dict:
    agendamentos = (
        database.session.execute(database.select(Agendamento)).scalars().all()
    )

    return {"dados": [agendamento.get_dict() for agendamento in agendamentos]}


@app.post("/API/login")
def login() -> dict:
    dados = request.json

    if not dados["email"] and not dados["senha"]:
        return {"msg": "erro"}

    usuario = (
        database.session.execute(
            database.select(Usuario).where(Usuario.email == dados["email"])
        )
        .scalars()
        .one()
    )
    if usuario.senha != dados["senha"]:
        return {"msg": "senha incorreta"}

    response = make_response({"dados": "ok"})
    response.set_cookie(
        "dadosUsuario",
        str({"email": dados["email"], "tipo": usuario.tipo, "usuario_id": usuario.id}),
        max_age=60 * 60,
        domain="localhost",
    )
    return response
