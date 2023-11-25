import { ListaAgendamentos } from "../../../shared/components/listaAgendamentos/listaAgendamentos.tsx";
import { useNavigate } from "react-router-dom";
import "./homeCliente.css";
import { getCookie } from "../../../../assets/cookies.ts";

export const HomeCliente = ({ usuario_id = -1 }) => {
  const navegacao = useNavigate();

  if (!getCookie()) return navegacao("/login");

  return (
    <>
      <div className="container-fluid fundo-home">
        <div className="fundo-principal">
          <div className="row">
            <div className="col-6 servicos-home">
              <ListaAgendamentos usuario_id={usuario_id} />
            </div>
            <div className="col-6 pb-2">
              <div className="d-flex h-100 w-100 align-items-center justify-content-center">
                <button
                  className="button-agenda"
                  onClick={() => navegacao("agendar")}
                >
                  Agendar serviço
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
