import { ListaServicos } from "../../../shared/components/listaServicos/listaServicos.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCookie } from "../../../../assets/cookies.ts";
import { api } from "../../../../assets/api.ts";
import {
  ICategoriaWrapper,
  criarIServico,
  IServicoWrapper,
  IServico,
} from "../../../../assets/models.ts";
import "./servico.css";

export const Servico = () => {
  const navegacao = useNavigate();
  const [categoria, setCategorias] = useState<ICategoriaWrapper[]>([]);
  const [servicos, setServicos] = useState<IServicoWrapper[]>([]);
  const [novoServico, setNovoServico] = useState<IServico>(criarIServico());

  useEffect(() => {
    api
      .get("categorias/all")
      .then((request) => setCategorias(request.data["dados"]));
  }, []);

  if (!getCookie()) return navegacao("/login");
  return (
    <>
      <div className="container-fluid fundo-home">
        <div className="fundo-agenda">
          <div>
            <button
              onClick={() => navegacao("/prestador/home")}
              style={{ color: "black" }}
            >
              <i className="fa fa-arrow-left"></i>
              <span className="ms-2">Voltar</span>
            </button>
            <h1 className="titulo-agendamento">Serviço</h1>
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
                    <strong>Criar/Editar Serviço</strong>
                  </div>
                  <hr />
                  <div className="col-12 mb-2">
                    <div className="form-group">
                      <label>Categoria</label>
                      <select
                        className="form-select"
                        onChange={(e) =>
                          setNovoServico({
                            ...novoServico,
                            categoria_id: e.target.value,
                          })
                        }
                      >
                        {categoria.map((categoria) => {
                          return (
                            <option value={categoria.categoria.id}>
                              {categoria.categoria.nome}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-6 mb-2">
                    <div className="form-group">
                      <label>Preço</label>
                      <input
                        className="form-control"
                        type="number"
                        step="0.01"
                        onChange={(e) =>
                          setNovoServico({
                            ...novoServico,
                            preco: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-6 mb-2">
                    <div className="form-group">
                      <label>Duração</label>
                      <input
                        className="form-control"
                        type="number"
                        min="1"
                        max="8"
                        onChange={(e) =>
                          setNovoServico({
                            ...novoServico,
                            duracao: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mt-2">
                    <button
                      className="button-agendar btn"
                      onClick={async () => {
                        let resultServico;

                        resultServico = await api.post(
                          "servicos/create",
                          novoServico
                        );

                        window.location.reload();
                      }}
                    >
                      Criar Serviço
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
