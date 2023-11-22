import { ListaAgendamentos } from "../../../shared/components/listaAgendamentos/listaAgendamentos.tsx";
import { TabelaServicos } from "../../../shared/components/tabelaServicos/tabelaServicos.tsx";
import { useNavigate } from "react-router-dom";
import "./homeCliente.css";
import { useEffect } from "react";
import { getCookie } from "../../../../assets/cookies.ts";

export const HomeCliente = () => {
  const navegacao = useNavigate();

  if (!getCookie()) return navegacao("/login");

  return (
    <>
      <div className="container-fluid fundo-home">
        <div className="fundo-principal">
          <div className="row">
            <div className="col-6 servicos-home">
              <ListaAgendamentos />
            </div>
            <div className="col-6 pb-2">
              <div className="d-flex h-100 w-100 align-items-center justify-content-center">
                <button
                  className="button-agenda"
                  onClick={() => navegacao("agendar")}
                >
                  Agendar/Desmarcar serviço
                </button>
              </div>
            </div>
          </div>
          <div className="row horarios">
            <h2 className="titulo-horarios">Horários</h2>

            <div className="container">
              <TabelaServicos />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
