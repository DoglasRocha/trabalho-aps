import {
  IAgendamentoWrapper,
  IClienteWrapper,
} from "../../../../assets/models.ts";
import { getCookie } from "../../../../assets/cookies.ts";
import { useEffect, useState } from "react";
import { api } from "../../../../assets/api.ts";
import "./listaAgendamentos.css";

export const ListaAgendamentos = ({ usuario_id = -1 }) => {
  const [dadosAgendamento, setAgendamento] = useState<IAgendamentoWrapper[]>(
    []
  );
  const [dadosCliente, setDadosCliente] = useState<IClienteWrapper>();
  const [trigger, setTrigger] = useState<number>(0);
  const dadosCookies = getCookie();
  usuario_id = usuario_id == -1 ? dadosCookies.usuario_id : usuario_id;

  useEffect(() => {
    api
      .get(`/clientes/get?usuario_id=${usuario_id}`)
      .then((response) => setDadosCliente(response.data.dados[0]));
  }, [usuario_id]);

  useEffect(() => {
    api
      .get(`/agendamentos/get?cliente_id=${dadosCliente?.cliente.id}`)
      .then((response) => setAgendamento(response.data["dados"]));
  }, [dadosCliente?.cliente.id, trigger]);

  function Agenda() {
    if (!dadosAgendamento) return <></>;

    const lista = dadosAgendamento.map((dados) => (
      <div className="container topicos-agenda" key={dados.agendamento.id}>
        <div className="row">
          <div className="col-9 p-3" style={{ borderRight: "1px solid green" }}>
            <div className="d-flex">
              <strong>{dados.empresa.nome_fantasia}</strong>
              <div className="row ms-auto">
                <span>{dados.usuario.nome}</span>
              </div>
            </div>
          </div>
          <div className="col-3 text-center p-3">
            <div className="input-group">
              <strong>
                {new Date(dados.agendamento.horario_inicio).toLocaleString()}
              </strong>
              <button
                className="button-excluir-agenda ms-auto"
                onClick={() => {
                  api.delete(`/agendamentos/delete/${dados.agendamento.id}`);
                  setTrigger(trigger + 1);
                }}
              >
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
