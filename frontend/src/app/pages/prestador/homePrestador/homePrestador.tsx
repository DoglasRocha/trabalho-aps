import { ListaServicosFazer } from "../../../shared/components/listaServicosFazer/listaServicosFazer.tsx";
import { TabelaServicos } from "../../../shared/components/tabelaServicos/tabelaServicos.tsx";
import { useNavigate } from "react-router-dom";
import "./homePrestador.css";
import { useEffect } from "react";
import { getCookie } from "../../../../assets/cookies.ts";

export const HomePrestador = () => {
  const navegacao = useNavigate();

  if (!getCookie()) return navegacao("/login");

  return (
    <>
      <div className="container-fluid fundo-home">
        <div className="fundo-principal">
          <div className="row">
            <div className="col-6 servicos-home">
              <ListaServicosFazer />
            </div>
            <div className="col-6 pb-2">
              <div className="d-flex h-100 w-100 align-items-center justify-content-center">
                <button
                  className="button-agenda"
                  onClick={() => navegacao("servico")}
                >
                  Criar serviços
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
