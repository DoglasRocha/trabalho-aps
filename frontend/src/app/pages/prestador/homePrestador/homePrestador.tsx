import { ListaServicosFazer } from "../../../shared/components/listaServicosFazer/listaServicosFazer.tsx";
import { useNavigate } from "react-router-dom";
import "./homePrestador.css";
import { getCookie } from "../../../../assets/cookies.ts";

export const HomePrestador = ({ usuario_id = -1 }) => {
  const navegacao = useNavigate();

  if (!getCookie()) return navegacao("/login");

  return (
    <>
      <div className="container-fluid fundo-home">
        <div className="fundo-principal">
          <div className="row">
            <div className="col-7 servicos-home">
              <ListaServicosFazer usuario_id={usuario_id} />
            </div>
            <div className="col-5 pb-2">
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
