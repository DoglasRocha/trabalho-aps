import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./registro.css";
import { api } from "../../../assets/api";

export const Registro = () => {
  const navegacao = useNavigate();

  return (
    <div className="container-fluid background-registro">
      <div className="d-flex justify-content-center align-content-center h-100">
        <div className="box-login">
          <div className="d-flex">
            <button className="button-voltar" onClick={() => navegacao(-1)}>
              Voltar
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <div className="dainfe-image">DAINFE</div>
          </div>
          <div className="d-flex flex-row mt-4">
            <div className="row">
              <button onClick={() => navegacao("cliente")}>Cliente</button>
              <span>
                Aqui você poderá contratar serviços disponíveis a partir de um
                horário de sua escolha!
              </span>
            </div>
            <div className="row">
              <button onClick={() => navegacao("prestador")}>Prestador</button>
              <span>
                Aqui você poderá publicar seus serviços e ser contratado por
                algum cliente!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
