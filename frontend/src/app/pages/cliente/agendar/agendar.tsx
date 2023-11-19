import { ListaServicos } from "../../../shared/components/listaServicos/listaServicos.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { cookies } from "../../../../assets/cookies.ts";
import { api } from "../../../../assets/api.ts";
import { IAgendamento, criarIAgendamento, IServicoWrapper } from "../../../../assets/models.ts";
import "./agendar.css";

export const Agendar = () => {
  const navegacao = useNavigate();
  const [servicos, setServicos] = useState<IServicoWrapper[]>([]);
  const [novoAgendamento, setNovoAgendamento] = useState<IAgendamento>(criarIAgendamento());
  const [tempoServico, setTempoServico] = useState(1);

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
              onClick={() => navegacao("/cliente/home")}
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
                        onChange={(e) =>
                          setNovoAgendamento({
                            ...novoAgendamento,
                            servico_id: e.target.value,
                          })
                        }
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
                  <div className="col-6 mb-2">
                    <div className="form-group">
                      <label>Horário de Início</label>
                      <input
                        className="form-control"
                        type="datetime-local"
                        max="9999-12-31T23:59"
                        onChange={(e) =>
                          setNovoAgendamento({
                            ...novoAgendamento,
                            horario_inicio: e.target.value,
                            horario_fim: e.target.value + 2,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-6 mb-2">
                    <div className="form-group">
                      <label>Horário do Fim</label>
                      <input
                        className="form-control"
                        type="datetime-local"
                        max="9999-12-31T23:59"
                        value={novoAgendamento.horario_fim}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-12 mb-2">
                    <div className="form-group">
                      <label>Observação</label>
                      <textarea className="form-control" 
                      rows={3}
                      onChange={(e) =>
                        setNovoAgendamento({
                          ...novoAgendamento,
                          observacoes_cliente: e.target.value,
                        })
                      }/>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mt-2">
                    <button
                      className="button-agendar btn"
                      onClick={async () => {
                          let resultAgendamento;

                          resultAgendamento = await api.post("prestadores/create", novoAgendamento);
                        
                          window.location.reload();
                        }
                      }
                    >
                      Agendar Serviço
                    </button>
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
