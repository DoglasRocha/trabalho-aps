import { ListaServicos } from "../../shared/components/listaServicos/listaServicos.tsx";
import { useNavigate } from "react-router-dom";
import "./agendar.css";
import { useEffect, useState } from "react";
import { cookies } from "../../../assets/cookies.ts";
import { api } from "../../../assets/api.ts";
import { IServicoWrapper } from "../../../assets/models.ts";

export const Agendar = () => {
  const navegacao = useNavigate();
  const [servicos, setServicos] = useState<IServicoWrapper[]>([]);

  useEffect(() => {
    if (!cookies.get("dadosUsuario")) navegacao("/login");
  });

  useEffect(() => {
    api
      .get("servicos/all")
      .then((request) => setServicos(request.data["dados"]));
  }, []);

  return (
    <>
      <div className="container-fluid fundo-home">
        <div className="fundo-agenda">
          <div>
            <button
              onClick={() => navegacao("/home")}
              style={{ color: "black" }}
            >
              <i className="fa fa-arrow-left"></i>
              <span className="ms-2">Voltar</span>
            </button>
            <h1 className="titulo-agendamento">Agendamento</h1>
          </div>
          <div className="d-flex flex-row">
            <div className="p-2 lado-agendamento">
              <div className="p-2">
                <ListaServicos />
              </div>
            </div>

            <div className="container-fluid lado-direito-agendamento p-2">
              <div className="box-conteudo-agendamento">
                <div className="row p-3">
                  <div className="mb-2">
                    <i className="fa-regular fa-calendar-plus me-2"></i>
                    <strong>Agendar</strong>
                  </div>
                  <hr />
                  <div className="col-12 mb-2">
                    <div className="form-group">
                      <label>Serviço</label>
                      <select
                        className="form-select"
                        id="exampleFormControlSelect1"
                      >
                        {servicos.map((servico) => {
                          return (
                            <option value={servico.servico.id}>
                              Serviço: {servico.categoria.nome}, Profissional:{" "}
                              {servico.usuario.nome}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Horário de Início</label>
                      <input
                        className="form-control"
                        type="datetime-local"
                        max="9999-12-31T23:59"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Horário do Fim</label>
                      <input
                        className="form-control"
                        type="datetime-local"
                        max="9999-12-31T23:59"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
