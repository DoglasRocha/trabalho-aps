import { HomeCliente } from "../../cliente/homeCliente/homeCliente";
import { HomePrestador } from "../../prestador/homePrestador/homePrestador";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../../assets/api.ts";
import { getCookie } from "../../../../assets/cookies.ts";
import {
  IUsuario,
  IUsuarioWrapper,
  criarIUsuario,
} from "../../../../assets/models.ts";
import "./homeAdmin.css";

export const HomeAdmin = () => {
  const navegacao = useNavigate();
  const [dadosUsuario, setDadosUsuario] = useState<IUsuario>(criarIUsuario());
  const [selectUsuario, setSelectUsuarios] = useState<IUsuarioWrapper[]>([]);

  useEffect(() => {
    api
      .get("usuarios/all")
      .then((request) => setSelectUsuarios(request.data["dados"]));
  }, []);

  if (!getCookie()) return navegacao("/login");

  function telaUsuario() {
    if (dadosUsuario.tipo === "cliente") {
      return <HomeCliente usuario_id={dadosUsuario.id} />;
    } else {
      return <HomePrestador usuario_id={dadosUsuario.id} />;
    }
  }

  return (
    <>
      <div className="container-fluid fundo-home">
        <div className="fundo-principal">
          <div className="row">
            <div className="col-12 servicos-home">
              <strong>Empresa</strong>
              <select
                className="form-select"
                onChange={(e) =>
                  setDadosUsuario({
                    ...dadosUsuario,
                    id: e.target.value.split(" ")[0],
                    tipo: e.target.value.split(" ")[1],
                  })
                }
                id="exampleFormControlSelect1"
              >
                {selectUsuario.map((usuario) => {
                  return (
                    <option
                      value={`${usuario.usuario.id} ${usuario.usuario.tipo}`}
                    >
                      Nome: {usuario.usuario.nome}, Tipo: {usuario.usuario.tipo}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="row horarios">
            <div className="container">
              {dadosUsuario.tipo === "cliente" ? (
                <HomeCliente usuario_id={dadosUsuario.id} />
              ) : (
                <HomePrestador usuario_id={dadosUsuario.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
