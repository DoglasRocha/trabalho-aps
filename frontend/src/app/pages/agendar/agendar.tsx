import { ListaServicos } from "../../shared/components/listaServicos/listaServicos.tsx";
import { useNavigate, Outlet } from "react-router-dom";
import { Cookies } from "react-cookie";
import "./agendar.css";
import { useEffect } from "react";

export const Agendar = () => {
  const navegacao = useNavigate();
  const cookie = new Cookies();

  useEffect(() => {
    if (!cookie.get("dados cliente")) navegacao("/login");
  }, [cookie]);

  return (
    <>
      <div className="container-fluid fundo-home">
        <div className="fundo-agenda">
          <div>
            <button
              onClick={() => navegacao("/home")}
              style={({ textDecoration: "none" }, { color: "black" })}
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

            <div className="p-2 lado-direito-agendamento">
              <div className="box-conteudo-agendamento">aqui</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
