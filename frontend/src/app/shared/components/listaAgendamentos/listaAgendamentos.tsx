import { IAgendamentoWrapper } from "../../../../assets/models.ts";
import { useEffect, useState } from "react";
import { api } from "../../../../assets/api.ts";
import "./listaAgendamentos.css";

export const listaAgendamentos = () => {
  const [dadosAgendamento, setAgendamento] = useState<IAgendamentoWrapper[]>(
    []
  );

  useEffect(() => {
    api
      //.get(`/agendamentos/get?id=${props}`)
      .get(`/agendamentos/get?cliente_id=1`)
      .then((request) => setAgendamento(request.data["dados"]));
  }, []);

  function Agenda() {
    const lista = dadosAgendamento.map((dadosAgendamento) => (
      <div
        className="container topicos-agenda"
        key={dadosAgendamento.agendamento.id}
      >
        <div className="row">
          <div className="col-9 p-3" style={{ borderRight: "1px solid green" }}>
            <div className="d-flex">
              <strong>{dadosAgendamento.empresa.nome_fantasia}</strong>
              <div className="row ms-auto">
                <span>{dadosAgendamento.prestador.nome}</span>
              </div>
            </div>
          </div>
          <div className="col-3 text-center p-3">
            <div className="input-group">
              <strong>
                {new Date(
                  dadosAgendamento.agendamento.horario_inicio
                ).toString()}
              </strong>
              <button className="button-excluir-agenda ms-auto">
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
    return <>{lista}</>;
  }

  return (
    <>
      <div className="container-agenda">
        <div className="row">
          <div className="col-12 m-2">
            <strong>Agenda de Serviços</strong>
            <i className="fa-regular fa-bell ms-2"></i>
          </div>
        </div>
        <div className="modulo-agenda">
          <div className="row m-2">
            <Agenda />
          </div>
        </div>
      </div>
    </>
  );
};
