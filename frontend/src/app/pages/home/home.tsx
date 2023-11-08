import { ListaServicos } from "../../shared/components/listaServicos/listaServicos.tsx";
import { TabelaServicos } from "../../shared/components/tabelaServicos/tabelaServicos.tsx";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import "./home.css";
import { useEffect } from "react";

export const Home = () => {
  const navegacao = useNavigate();
  const cookie = new Cookies();

  useEffect(() => {
    if (!cookie.get("dados cliente")) navegacao("/login");
  }, [cookie]);

  return (
    <>
      <div className="container-fluid fundo-home">
        <div className="fundo-principal">
          <div className="row">
            <div className="col-6 servicos-home">
              <ListaServicos />
            </div>
            <div className="col-6 pb-2">
              <div className="d-flex h-100 w-100 align-items-center justify-content-center">
                <button
                  className="button-agenda"
                  onClick={() => navegacao("/agendar")}
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
